type Env = {
  STORAGE_PROVIDER?: string;
  WEB3_STORAGE_TOKEN?: string;
  STORACHA_KEY?: string;
  STORACHA_PROOF?: string;
  STORACHA_GATEWAY?: string; // e.g. https://storacha.link/ipfs or storacha.link/ipfs or storacha.link
  APP_URL?: string; // e.g. https://example.com
  UPLOADS_PREFIX?: string; // optional key prefix for uploads
  // Pump.fun Portal integration
  PUMPFUN_MODE?: 'portal' | 'sdk' | 'mock';
  PUMPFUN_PORTAL_URL?: string;
  PUMPFUN_PORTAL_API_KEY?: string;
  PUMPFUN_PRIORITY_FEE_SOL?: number;
  PUMPFUN_IPFS_URL?: string;
};

function required(name: keyof Env, optional = false): string | undefined {
  const v = process.env[name as string];
  if (!v && !optional) return undefined;
  return v;
}

export const env: Env = {
  STORAGE_PROVIDER: process.env.STORAGE_PROVIDER,
  WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN,
  STORACHA_KEY: process.env.STORACHA_KEY,
  STORACHA_PROOF: process.env.STORACHA_PROOF,
  STORACHA_GATEWAY: process.env.STORACHA_GATEWAY || 'https://storacha.link/ipfs',
  APP_URL: process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  UPLOADS_PREFIX: process.env.UPLOADS_PREFIX || 'uploads',
  PUMPFUN_MODE: (process.env.PUMPFUN_MODE as any) || 'portal',
  PUMPFUN_PORTAL_URL: process.env.PUMPFUN_PORTAL_URL,
  PUMPFUN_PORTAL_API_KEY: process.env.PUMPFUN_PORTAL_API_KEY,
  PUMPFUN_PRIORITY_FEE_SOL: process.env.PUMPFUN_PRIORITY_FEE_SOL ? Number(process.env.PUMPFUN_PRIORITY_FEE_SOL) : undefined,
  PUMPFUN_IPFS_URL: process.env.PUMPFUN_IPFS_URL,
};


