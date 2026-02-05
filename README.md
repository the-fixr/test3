# test3

A Farcaster mini app created with [Shipyard](https://shipyard.fixr.nexus).

## Features

- **Token**: Token-gated access control (see `lib/token-gate.ts`)

## Quick Start

```bash
npm install
npm run dev
```

## Configuration

Your app config is in `lib/config.ts`:

```typescript
export const config = {
  primaryColor: '#06B6D4',
  features: ["token"],
};
```


## Token Gating

Use the token gate utility in `lib/token-gate.ts`:

```typescript
import { checkTokenBalance } from '@/lib/token-gate';

const { hasAccess, balance } = await checkTokenBalance(
  '0xYourTokenAddress',
  userWalletAddress,
  100 // minimum balance required
);
```


## Deploy

Deploy to Vercel:

```bash
vercel
```

Then update the URLs in `public/manifest.json` with your deployed URL.

---

Built with 💜 by [Fixr](https://fixr.nexus)
