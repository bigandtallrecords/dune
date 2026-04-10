# 🏜️ dune

> Dune-inspired AU & VST amplifier plugins by [gardenofthemind.io](https://gardenofthemind.io)

## What It Is

**dune** is a subscription-based plugin suite for gardenofthemind.io — a collection of neural amp modeler (NAM) plugins themed after Frank Herbert's Dune universe. The VST/AU plugin is a node-network signal chain where users drag amplifier modules from a scrollable rack on the right onto the signal path on the left (in → out → in → out).

**Live:** [dune.gardenofthemind.io](https://dune.gardenofthemind.io)

## Amplifiers (12 presets)

| Plugin | Format |
|--------|--------|
| It's a Maker | AU / VST3 |
| It's a Maker II | AU / VST3 |
| Geidi Prime | AU / VST3 |
| Lisan al Gaib | AU / VST3 |
| Lisan al Gaib II | AU / VST3 |
| Lisan al Gaib III | AU / VST3 |
| Lisan al Gaib IV | AU / VST3 |
| Sihaya | AU / VST3 |
| Bene Gesserit | AU / VST3 |
| Bene Gesserit II | AU / VST3 |
| House Courrino | AU / VST3 |
| The Voice | AU / VST3 |

## Architecture

**Frontend** — Next.js (App Router), Tailwind CSS
**Hosting** — AWS Amplify (`dav9abu7ok7y7`)
**Domain** — `dune.gardenofthemind.io`
**Auth** — Shared with gardenofthemind.io (garden-goers DB)
**Billing** — Stripe ($20/mo all-access)

## VST/AU Plugin Design

- **NAM loader** with pre-trained amp models (already built)
- **Node network UI** — simple signal chain: drag modules from the amp rack (right) onto the path (left)
- **In → Out → In → Out** routing
- **Billing check** — plugin calls home to verify active dune subscription before unlocking presets
- Installer packages ~6 months out

## Subscription

Single tier: **$20/month** — unlocks all 12 amplifier presets in the plugin and on the web panel. Eventually will offer per-unit pricing.

## Auth

Uses gardenofthemind.io credentials (garden-goers DB). Users sign in with their existing account. The `/panel` page shows their amplifier collection and subscription status. Dune subscription badges will eventually appear on the artist page right sidebar on gardenofthemind.io.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Amplifier catalog (public) |
| `/panel` | User's amplifiers + subscription management (auth required) |

## Lock Screen

Optional password gate via `NEXT_PUBLIC_DUNE_LOCK_PASSWORD`. Same tilt-logo UX as gardenofthemind.io.

## Getting Started

```bash
npm install
npm run dev
```

## Deploy

```bash
git push origin main
# Amplify auto-deploys
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_DUNE_LOCK_PASSWORD` | Optional site-wide password gate |
| `NEXT_PUBLIC_GARDEN_API_URL` | Garden API base URL (default: `https://gardenofthemind.io`) |
| `STRIPE_SECRET_KEY` | Stripe secret key for checkout |
| `STRIPE_PRICE_DUNE` | Stripe price ID for the $20/mo dune plan |

---

🏜️
