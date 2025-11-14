# Spyra Privacy Launcher

<div align="center">

**Launch Pump.fun tokens anonymously with privacy-first architecture**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-purple)](https://solana.com/)

</div>

---

## Overview

**Spyra Privacy Launcher** is a sophisticated, privacy-preserving token launch platform built for the Solana ecosystem. It enables users to launch tokens on Pump.fun while maintaining complete anonymity through a multi-layered privacy architecture that combines PrivacyCash protocol integration, dedicated launch wallets, and encrypted storage.

### Core Philosophy

Spyra is designed with privacy as a first-class citizen. Unlike traditional launch platforms that expose user identities and funding sources, Spyra creates an abstraction layer that:

- **Decouples identity from launches** - Each launch uses a unique, server-generated wallet
- **Obfuscates funding sources** - Funds flow through PrivacyCash protocol for anonymity
- **Minimizes on-chain footprint** - Smart routing reduces traceable transactions
- **Preserves user control** - Non-custodial architecture ensures users maintain key ownership

---

## Features

### 🔒 Privacy-First Architecture

- **Anonymous Launch Wallets**: Each token launch receives a unique, server-generated wallet that cannot be traced back to the user's platform wallet
- **PrivacyCash Integration**: Funds are routed through PrivacyCash protocol, breaking the on-chain link between source and destination
- **Encrypted Key Storage**: All sensitive keys are encrypted at rest using JWT-based encryption
- **Zero-Knowledge Operations**: Server-side operations maintain privacy while executing complex transactions

### ⚡ One-Click Launch Flow

- **Streamlined UX**: Launch tokens with minimal friction - no need to navigate multiple platforms or manage complex wallet operations
- **Automated Funding**: Platform wallet automatically funds launch wallets through privacy-preserving channels
- **Background Job Processing**: Heavy operations run asynchronously, providing instant feedback
- **Real-time Status Updates**: Live polling keeps users informed of launch progress

### 💰 Privacy-Preserving Rewards

- **Anonymous Reward Claims**: Creator fees are claimed and routed through PrivacyCash before reaching your platform wallet
- **Automatic Withdrawal**: Rewards flow seamlessly from launch wallet → PrivacyCash → platform wallet
- **Token Selling**: Built-in tools for selling launch wallet tokens with privacy maintained

### 🛡️ Security & Reliability

- **Non-Custodial Design**: Users maintain control of their keys and funds
- **Rate Limiting**: API endpoints are protected against abuse
- **Transaction Simulation**: All transactions are simulated before submission
- **Error Recovery**: Robust error handling with automatic retries and graceful degradation

### 📊 Dashboard & Management

- **Launch Tracking**: Monitor all your launches from a centralized dashboard
- **Balance Monitoring**: Real-time SOL and token balance tracking
- **Transaction History**: View all launch-related transactions with links to Solscan
- **Status Indicators**: Clear visual feedback for each stage of the launch process

---

## Architecture

### System Overview

```
┌─────────────────┐
│   User Wallet   │ (Phantom, etc.)
└────────┬────────┘
         │ Signs message for auth
         ▼
┌─────────────────┐
│  Platform Wallet │ (User's main wallet)
└────────┬────────┘
         │ Funds via PrivacyCash
         ▼
┌─────────────────┐
│  Launch Wallet   │ (Unique per launch)
└────────┬────────┘
         │ Creates token on Pump.fun
         ▼
┌─────────────────┐
│   Pump.fun       │
└─────────────────┘
```

### Key Components

#### 1. **Frontend (Next.js App Router)**
- React-based UI with Tailwind CSS
- Solana Wallet Adapter integration
- Real-time status polling
- File upload to Storacha (IPFS)

#### 2. **Backend API Routes**
- `/api/launch` - Launch creation and management
- `/api/jobs/*` - Background job processing
- `/api/auth/*` - Authentication and session management
- `/api/user/*` - User wallet management

#### 3. **Privacy Layer**
- **PrivacyCash Integration**: Routes funds through privacy protocol
- **Encrypted Storage**: JWT-encrypted keys stored in Redis
- **Launch Wallet Isolation**: Each launch uses a unique wallet

#### 4. **Storage & Infrastructure**
- **Upstash Redis**: Session and launch data storage
- **Storacha**: Decentralized IPFS storage for images/metadata
- **Pump.fun Portal API**: Token creation and trading

### Data Flow

#### Launch Creation Flow

1. **User submits launch form** → Frontend validates and uploads images
2. **POST /api/launch** → Creates launch record, generates launch wallet
3. **Background job triggered** → `/api/jobs/launch` processes funding
4. **PrivacyCash deposit** → Funds move from platform wallet to PrivacyCash
5. **PrivacyCash withdrawal** → Funds move from PrivacyCash to launch wallet
6. **Token creation** → `/api/jobs/pump-create` creates token on Pump.fun
7. **Status updates** → Frontend polls for completion

#### Reward Claim Flow

1. **User clicks "Claim & Return"** → `/api/jobs/rewards` endpoint
2. **Claim creator fee** → Pump Portal API creates transaction
3. **PrivacyCash deposit** → Funds from launch wallet to PrivacyCash
4. **PrivacyCash withdrawal** → Funds from PrivacyCash to platform wallet
5. **Status update** → Launch record updated with new status

---

## Tech Stack

### Core Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain**: [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)

### Key Dependencies

#### Solana Ecosystem
- `@solana/web3.js` - Solana blockchain interaction
- `@solana/wallet-adapter-react` - Wallet connection management
- `@solana/spl-token` - SPL token operations
- `@coral-xyz/anchor` - Anchor framework integration

#### Privacy & Storage
- `privacycash` - PrivacyCash protocol client
- `@storacha/client` - Decentralized storage (IPFS)
- `pump-anchor-idl` - Pump.fun program IDL

#### Infrastructure
- `@upstash/redis` - Serverless Redis client
- `@upstash/qstash` - Message queue (if needed)
- `jose` - JWT signing and verification
- `tweetnacl` - Ed25519 signature verification

### Development Tools

- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Build**: Next.js production build
- **Deployment**: AWS Amplify (configurable)

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **Solana CLI** (optional, for local development)
- **Redis instance** (Upstash recommended for production)
- **Solana wallet** with test funds (for development)

### Required Accounts & Services

1. **Upstash Redis** - Database for launch records and sessions
2. **Storacha** - IPFS storage for images/metadata (or alternative)
3. **Pump.fun Portal API** - Token creation and trading (API key required)
4. **PrivacyCash** - Privacy protocol (owner private key required)
5. **Solana RPC** - Mainnet RPC endpoint (Helius, QuickNode, etc.)

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PrivacyLauncher
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Application
APP_JWT_SECRET=your-super-secret-jwt-key-min-32-chars
APP_URL=http://localhost:3000
APP_INTERNAL_JOB_SECRET=optional-internal-job-secret

# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_CLUSTER=mainnet-beta

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# PrivacyCash
PRIVACY_CASH_OWNER_PRIVATE_KEY=your-privacycash-owner-private-key-base58

# Pump.fun Integration
PUMPFUN_MODE=portal
PUMPFUN_PORTAL_URL=https://pumpportal.fun/api
PUMPFUN_PORTAL_API_KEY=your-pump-portal-api-key
PUMPFUN_IPFS_URL=https://pump.fun/ipfs-upload-endpoint
PUMPFUN_PRIORITY_FEE_SOL=0.00001
PUMP_PROGRAM_ID=optional-pump-program-id

# Storage (Storacha)
STORAGE_PROVIDER=storacha
STORACHA_KEY=your-storacha-principal-key
STORACHA_PROOF=your-storacha-proof-credential
STORACHA_GATEWAY=https://storacha.link/ipfs

# Optional: Web3.Storage
WEB3_STORAGE_TOKEN=optional-web3-storage-token

# Rate Limiting (optional)
RATE_LIMIT_MAX=60
RATE_LIMIT_WINDOW_MS=60000
```

### 4. Build the Application

```bash
npm run build
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Configuration

### Environment Variables Reference

#### Application Security

- **`APP_JWT_SECRET`** (required): Secret key for JWT signing. Must be at least 32 characters. Used for session tokens and key encryption.
- **`APP_URL`**: Base URL of your application. Used for internal job callbacks.
- **`APP_INTERNAL_JOB_SECRET`**: Optional secret for securing internal job endpoints.

#### Solana Configuration

- **`SOLANA_RPC_URL`**: Server-side Solana RPC endpoint. Use a reliable provider (Helius, QuickNode, etc.).
- **`NEXT_PUBLIC_SOLANA_RPC_URL`**: Client-side RPC endpoint (can be same as above).
- **`NEXT_PUBLIC_SOLANA_CLUSTER`**: Solana cluster (`mainnet-beta`, `devnet`, `testnet`).

#### PrivacyCash Setup

1. Generate a PrivacyCash owner keypair
2. Export the private key in base58 format
3. Set `PRIVACY_CASH_OWNER_PRIVATE_KEY` with this value
4. Ensure the owner wallet has sufficient SOL for deposits

#### Pump.fun Integration

- **`PUMPFUN_MODE`**: Integration mode (`portal`, `sdk`, or `mock`)
- **`PUMPFUN_PORTAL_URL`**: Base URL for Pump Portal API
- **`PUMPFUN_PORTAL_API_KEY`**: API key from Pump Portal (if required)
- **`PUMPFUN_IPFS_URL`**: Endpoint for metadata/IPFS uploads
- **`PUMPFUN_PRIORITY_FEE_SOL`**: Priority fee in SOL for transactions
- **`PUMP_PROGRAM_ID`**: Optional Pump.fun program ID (usually auto-detected from IDL)

#### Storage Configuration

**Storacha (Recommended)**
- Obtain Storacha principal key and proof credential
- Set `STORACHA_KEY` and `STORACHA_PROOF`
- Configure `STORACHA_GATEWAY` (default: `https://storacha.link/ipfs`)

**Alternative: Web3.Storage**
- Set `WEB3_STORAGE_TOKEN` if using Web3.Storage instead

#### Rate Limiting

- **`RATE_LIMIT_MAX`**: Maximum requests per window (default: 60)
- **`RATE_LIMIT_WINDOW_MS`**: Time window in milliseconds (default: 60000)

---

## Usage

### For End Users

#### 1. Connect Wallet

- Click "Enter App" on the homepage
- Connect your Solana wallet (Phantom, etc.)
- Sign the authentication message

#### 2. Create a Launch

1. Navigate to "Launch" page
2. Fill in token details:
   - **Name**: Token name (max 32 chars)
   - **Ticker**: Token symbol (2-6 chars, uppercase)
   - **Description**: Token description (max 280 chars)
   - **Logo**: Upload token logo image
   - **Banner**: Upload token banner image
   - **Social Links**: Twitter, Telegram, Website (optional)
   - **Target SOL**: Minimum 0.05 SOL
3. Click "Launch"
4. Monitor progress on the launch detail page

#### 3. Manage Launches

- **Dashboard**: View all your launches and platform wallet balance
- **Launch Detail**: Monitor status, claim rewards, sell tokens
- **Withdraw**: Move funds from launch wallet back to platform wallet

### For Developers

#### API Endpoints

##### Authentication

```typescript
POST /api/auth/nonce
// Get nonce for wallet signing

POST /api/auth/verify
// Verify signed message and create session
```

##### Launch Management

```typescript
GET /api/launch
// List user's launches

POST /api/launch
// Create new launch
Body: {
  amountLamports: number,
  meta: {
    name: string,
    symbol: string,
    desc: string,
    imageUrl: string,
    bannerUrl: string,
    twitter?: string,
    telegram?: string,
    website?: string,
    initialBuyAmount?: number
  }
}

GET /api/launch/[id]/status
// Get launch status

GET /api/launch/[id]/pump-scan
// Scan for created token on Pump.fun
```

##### Background Jobs

```typescript
POST /api/jobs/launch
// Process launch funding (background job)

POST /api/jobs/withdraw
// Withdraw funds to launch wallet

POST /api/jobs/pump-create
// Create token on Pump.fun

POST /api/jobs/rewards
// Claim and return creator fees

POST /api/jobs/sell
// Sell tokens from launch wallet
Body: {
  id: string,
  percent: number,
  mint?: string
}

POST /api/jobs/reverse-privacy
// Withdraw directly to platform wallet (bypass privacy)
```

##### User Management

```typescript
GET /api/user/wallets
// Get user's platform wallet address

POST /api/user/wallets/reveal
// Reveal platform wallet private key (encrypted)
```

#### Code Examples

##### Creating a Launch Programmatically

```typescript
const response = await fetch('/api/launch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `session-token=${sessionToken}`
  },
  body: JSON.stringify({
    amountLamports: 50000000, // 0.05 SOL
    meta: {
      name: 'My Token',
      symbol: 'TOKEN',
      desc: 'A great token',
      imageUrl: 'https://...',
      bannerUrl: 'https://...',
      initialBuyAmount: 0.01
    }
  })
});

const { id, launchWallet } = await response.json();
```

##### Monitoring Launch Status

```typescript
async function pollLaunchStatus(launchId: string) {
  const response = await fetch(`/api/launch/${launchId}/status`);
  const data = await response.json();
  
  console.log('Status:', data.status);
  console.log('Launch Wallet:', data.launchWallet);
  console.log('Mint:', data.pump?.mint);
  
  return data;
}
```

---

## Security Considerations

### Key Management

- **Encryption**: All private keys are encrypted using JWT secrets before storage
- **Non-Custodial**: Users maintain control of their platform wallet keys
- **Launch Wallet Isolation**: Each launch uses a unique wallet, limiting exposure

### Privacy Guarantees

- **PrivacyCash Protocol**: Funds routed through privacy protocol break on-chain links
- **No Identity Leakage**: Launch wallets cannot be traced to platform wallets
- **Encrypted Storage**: Sensitive data encrypted at rest

### Best Practices

1. **Environment Variables**: Never commit `.env.local` to version control
2. **JWT Secret**: Use a strong, randomly generated secret (min 32 chars)
3. **RPC Endpoints**: Use reliable, rate-limited RPC providers
4. **Rate Limiting**: Configure appropriate limits for your use case
5. **Monitoring**: Monitor for suspicious activity and failed transactions

### Known Limitations

- **PrivacyCash UTXO Requirements**: Withdrawals require available UTXOs in PrivacyCash
- **RPC Rate Limits**: High-frequency operations may hit RPC rate limits
- **Transaction Fees**: Each operation incurs Solana network fees
- **Pump.fun Dependencies**: Token creation depends on Pump.fun API availability

---

## Deployment

### AWS Amplify

The project includes `amplify.yml` for AWS Amplify deployment:

```yaml
version: 1
applications:
  - appRoot: .
    frontend:
      phases:
        preBuild:
          commands:
            - nvm install 20
            - nvm use 20
            - npm ci
        build:
          commands:
            - npm run build
```

### Vercel

For Vercel deployment:

1. Connect your repository
2. Set environment variables in Vercel dashboard
3. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables in Production

Ensure all required environment variables are set in your deployment platform:

- AWS Amplify: Environment variables in console
- Vercel: Environment variables in project settings
- Docker: Pass via `-e` flags or `.env` file

---

## Development

### Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── (app)/             # Protected app routes
│   │   ├── dashboard/    # User dashboard
│   │   ├── launch/        # Launch creation page
│   │   └── launches/      # Launch detail pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── jobs/          # Background job endpoints
│   │   ├── launch/        # Launch management
│   │   └── user/          # User management
│   └── page.tsx           # Homepage
├── lib/                    # Shared libraries
│   ├── auth.ts            # Authentication utilities
│   ├── crypto.ts          # Encryption utilities
│   ├── db.ts              # Database (Redis) client
│   ├── env.ts             # Environment configuration
│   ├── pump.ts            # Pump.fun integration
│   ├── privacy-cash.ts    # PrivacyCash client
│   └── storage.ts         # Storage (Storacha) client
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── package.json           # Dependencies
```

### Running Tests

```bash
npm run lint
npm run type-check
```

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier (if configured)

---

## Troubleshooting

### Common Issues

#### "PRIVACY_CASH_OWNER_PRIVATE_KEY is required"

**Solution**: Ensure the environment variable is set and the key is in base58 format.

#### "PUMPFUN_PORTAL_URL not configured"

**Solution**: Set `PUMPFUN_PORTAL_URL` environment variable or ensure default URL is accessible.

#### "Need at least 1 unspent UTXO"

**Solution**: PrivacyCash requires available UTXOs. Wait for indexer to catch up or ensure sufficient balance.

#### "Rate limit exceeded"

**Solution**: Adjust `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS` or implement IP-based rate limiting.

#### Transaction simulation failures

**Solution**: 
- Check RPC endpoint is responsive
- Verify sufficient balance for fees
- Ensure transaction parameters are valid

### Debug Mode

Enable verbose logging by setting:

```env
NODE_ENV=development
```

---

## Contributing

Spyra Privacy Launcher is part of the Spyra ecosystem. Contributions are welcome!

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards

- Follow TypeScript best practices
- Maintain privacy-first architecture
- Add tests for new features
- Update documentation

---

## License

[Specify your license here]

---

## Support & Resources

### Documentation

- [External References](./EXTERNAL_REFERENCES.md) - Complete list of external dependencies
- [Solana Documentation](https://docs.solana.com/)
- [Next.js Documentation](https://nextjs.org/docs)

### Community

- [Spyra Discord](link) - Community support
- [GitHub Issues](link) - Bug reports and feature requests

---

## Acknowledgments

Built with privacy in mind by the **Spyra** team.

**Spyra Privacy Launcher** - Launch tokens anonymously, maintain your privacy.

---

<div align="center">

**Made with ❤️ by Spyra**

</div>

