# 🏜️ dune

> Dune-inspired AU & VST amplifier plugins by [gardenofthemind.io](https://gardenofthemind.io)

## What It Is

**dune** is the plugin storefront for gardenofthemind.io — a catalog of neural amp modeler plugins themed after Frank Herbert's Dune universe. Currently a landing page / bookmark for the product line; installer packages and subscription billing are ~6 months out.

**Live:** [dune.gardenofthemind.io](https://dune.gardenofthemind.io)

## Amplifiers

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
**Domain** — `dune.gardenofthemind.io` (subdomain of gardenofthemind.io, managed by Amplify)

## Auth (planned)

Shared credentials with gardenofthemind.io — users sign up via the garden-goers DB. Dune subscription status will eventually surface as badges on the artist page right sidebar.

## Lock Screen

Optional password gate via `NEXT_PUBLIC_DUNE_LOCK_PASSWORD` env var. Same UX as the gardenofthemind.io lock screen — tilt logo, click, glass overlay, password input. Uses the It's a Maker logo.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Hosted on **AWS Amplify** with automatic builds from `main`.

```bash
git push origin main
# Amplify auto-deploys
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_DUNE_LOCK_PASSWORD` | Optional site-wide password gate |

---

🏜️
