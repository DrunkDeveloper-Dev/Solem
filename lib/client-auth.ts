"use client";
import type { PublicKey } from '@solana/web3.js';

export async function ensureLogin(publicKey: PublicKey, signMessage: (message: Uint8Array) => Promise<Uint8Array>) {
  const nonceRes = await fetch('/api/auth/nonce');
  const { nonce } = await nonceRes.json();
  const message = new TextEncoder().encode(`Sign in to Pump Launcher: ${nonce}`);
  const signature = await signMessage(message);
  const sigB64 = Buffer.from(signature).toString('base64');
  const addr = publicKey.toBase58();
  const verify = await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: addr, signature: sigB64, nonce })
  });
  if (!verify.ok) throw new Error('Sign-in failed');
}


