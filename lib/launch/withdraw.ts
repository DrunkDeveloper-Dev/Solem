import { getLaunch, updateLaunch, redis } from "@/lib/db";
import { getDepositStatus, withdrawForOwner } from "@/lib/privacy-cash";
import { decryptSecret } from "@/lib/crypto";
import { PublicKey } from "@solana/web3.js";

type WithdrawResult = { ok?: boolean; result?: any; status?: string };

export async function withdrawToLaunchWallet({
  userSub,
  launchId,
}: {
  userSub: string;
  launchId: string;
}): Promise<WithdrawResult> {
  const rec = await getLaunch(launchId);
  if (!rec || rec.userSub !== userSub) {
    const err: any = new Error("Not found");
    err.status = 404;
    throw err;
  }
  if (!rec.launchWallet) {
    const err: any = new Error("No launchWallet set");
    err.status = 400;
    throw err;
  }
  // Idempotency: if already launched, don't attempt again; if marked funded, allow client to retry sell/launch
  if (rec.status === "launched") {
    return { ok: true, status: "launched" };
  }

  await updateLaunch(rec.id, {
    status: "withdrawing",
    privacyCash: { ...rec.privacyCash, status: "withdrawing" },
  });
  let result: any;
  try {
    const encKey = await redis.get<string>(`user:${userSub}:platformWalletEnc`);
    if (!encKey) {
      throw new Error("Platform wallet not initialized");
    }
    // Validate recipient address to avoid library defaulting to owner
    new PublicKey(rec.launchWallet);
    const ownerSecretB58 = await decryptSecret(
      encKey,
      process.env.APP_JWT_SECRET!
    );
    result = await withdrawForOwner({
      ownerSecretB58,
      lamports: rec.amountLamports,
      toAddress: rec.launchWallet,
    });
  } catch (e: any) {
    const msg: string = e?.message || "withdraw_failed";
    // If no UTXO yet (indexer not caught up), keep pending to allow retry later
    if (/Need at least 1 unspent UTXO/i.test(msg) || /no balance/i.test(msg)) {
      await updateLaunch(rec.id, {
        status: "deposit_pending",
        privacyCash: { ...rec.privacyCash, status: "deposit_pending" },
      });
      return { status: "deposit_pending" };
    }
    await updateLaunch(rec.id, {
      status: "withdraw_error",
      privacyCash: { ...rec.privacyCash, status: "withdraw_error" },
    });
    const err: any = new Error(msg);
    err.status = 400;
    throw err;
  }
  // Success: mark as funded and persist withdraw tx if provided
  const withdrawTx =
    result && typeof result.tx === "string" ? result.tx : undefined;
  await updateLaunch(rec.id, {
    status: "funded",
    privacyCash: {
      ...rec.privacyCash,
      status: "withdrawn",
      ...(withdrawTx ? { withdrawTx } : {}),
    },
  });
  return { ok: true, result, status: "funded" };
}
