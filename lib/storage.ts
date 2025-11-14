import { env } from '@/lib/env';
import * as Client from '@storacha/client';
import { StoreMemory } from '@storacha/client/stores/memory';
import * as Proof from '@storacha/client/proof';
import { Signer } from '@storacha/client/principal/ed25519';

export type UploadResult = { cid: string; publicUrl: string };
type StorachaClient = Awaited<ReturnType<typeof Client.create>>;

let storachaClientPromise: Promise<StorachaClient> | null = null;

async function getStorachaClient(): Promise<StorachaClient> {
  if (storachaClientPromise) return storachaClientPromise;
  if (!env.STORACHA_KEY || !env.STORACHA_PROOF) {
    throw new Error('STORACHA_KEY and STORACHA_PROOF must be configured');
    }
  storachaClientPromise = (async () => {
    const principal = Signer.parse(env.STORACHA_KEY as string);
    const store = new StoreMemory();
    const client = await Client.create({ principal, store });
    const proof = await Proof.parse(env.STORACHA_PROOF as string);
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());
    return client;
  })();
  return storachaClientPromise;
}

export async function uploadToStoracha(bytes: Uint8Array, filename: string, contentType: string): Promise<UploadResult> {
  const client = await getStorachaClient();
  const arrayBuffer = bytes.slice().buffer as ArrayBuffer;
  const file: Blob | File = (typeof File !== 'undefined')
    ? new File([arrayBuffer], filename || 'file', { type: contentType || 'application/octet-stream' })
    : new Blob([arrayBuffer], { type: contentType || 'application/octet-stream' });
  const cidLink = await client.uploadFile(file as any);
  const cid = typeof cidLink === 'string' ? cidLink : (cidLink as any).toString();
  const gateway = (env.STORACHA_GATEWAY || 'https://storacha.link/ipfs').replace(/\/$/, '');
  const publicUrl = `${gateway}/${cid}`;
  return { cid, publicUrl };
}


