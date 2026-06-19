# Product Builders Hackademy

> [!WARNING]
> Prototype / reference implementation / proof-of-concept. Not audited. Use at your own risk.

An interactive, deployable tutorial for building Polkadot product apps — from zero to deployed in 15 minutes, or a full deep-dive through the complete stack. Built with the Polkadot Product SDK and deployed as a moddable app on playground.dot.

> **Live at Web3 Summit, Berlin, June 2026.**

---

## What is this?

This app teaches developers how to build **Polkadot product apps** — sandboxed single-page apps that run inside Polkadot hosts (Desktop, Mobile, Web) and connect to decentralised infrastructure without traditional servers.

A Rock Paper Scissors game is the running lab example, progressively extended across four levels:

| Level | What you build | Tech |
| ----- | -------------- | ---- |
| 1 — Mod | Customise design and game logic | CSS variables, TypeScript |
| 2 — Storage | Save game results permanently | Bulletin Chain, `CloudStorageClient` |
| 3 — Contracts | Deploy a shared leaderboard | ink!, Polkadot Hub, `ContractManager` |
| 4 — Multiplayer | Peer-to-peer gameplay, no server | Statement Store, commit-reveal |

At the end of every level, you deploy live to a `.dot` address you own.

---

## Two learning tracks

**⚡ Fast track (~15–30 min):** Mod the app, save to the network, deploy live. Your first deploy earns 100 XP on the playground leaderboard.

**🔬 Deep dive (~60–90 min):** The full Polkadot product stack — accounts, storage, contracts, multiplayer — with philosophy, web3 stakes, and AI-assisted learning prompts at every step.

---

## AI-assisted learning

Every lesson includes structured **AI prompts** designed to be used with Claude, ChatGPT, or any LLM as a tutor — not a code generator.

| Type | Purpose |
| ---- | ------- |
| 💡 Understand | Grasp the concept before touching code |
| 🔭 Explore | Examine trade-offs and the broader landscape |
| 🔨 Build | Pair-program while understanding every line |
| 🐛 Debug | Diagnose specific failure modes |

**Not vibe coding.** Ask AI to explain concepts first, then build together with full understanding.

---

## Epistemon — your evolving builder NFT

Completing lessons evolves your **Epistemon** — a generative on-chain creature that grows as you learn. Named after *episteme* (Greek: knowledge).

| Stage | Threshold | Form |
| ----- | --------- | ---- |
| 🥚 Dormant Seed | 0 lessons | Inert egg with a faint inner glow |
| ✨ Curious Spark | 1–3 lessons | Hatched creature with wide eyes |
| 🔧 Explorer | 4–8 lessons | Shaped body, floating tools |
| 🏛️ Architect | 9–14 lessons | Complex form, pattern, aura rings |
| 💎 Enlightened | 15+ or 2nd run | Crown, rainbow border, sparkles |

Each Epistemon is **unique**: traits (colour palette, body shape, eye type, accessory) are derived from a deterministic hash of your address and generation number. Repeating the full tutorial mints a new generation with different traits, building a collection.

Epistemon visuals and progression work from local state immediately. True on-chain ownership (tradeable NFT) unlocks when you deploy the `contract/epistemon.rs` ink! contract via `pg deploy`.

---

## Community layer

Every lesson has a **community discussion thread**. Share tips, ask questions, add resources, flag corrections — all stored permanently on Bulletin Chain.

- **Post**: Comment content is uploaded as JSON to Bulletin Chain (permanent, content-addressed). The CID is indexed locally.
- **Upvote**: Highlight the most useful contributions.
- **Types**: question · tip · resource · correction · experience

Permanent shared indexing activates when you deploy `contract/community.rs` via `pg deploy`. Until then, comments are stored per-device via Bulletin + localStorage.

---

## Tech stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React 19 + TypeScript + Vite |
| Accounts | `@parity/product-sdk-signer` (SignerManager, HostProvider) |
| Storage | `@parity/product-sdk-cloud-storage` (Bulletin Chain) |
| Contracts | `@parity/product-sdk-contracts` (ink! / PVM on Polkadot Hub) |
| Deployment | playground CLI (`pg deploy`) |
| Network | Paseo Next v2 / Summit event network |

---

## Getting started

### Prerequisites

- [Polkadot Desktop](https://polkadot.com/download) — for account signing and Bulletin reads
- playground CLI — `pg login` to sign in
- Node.js 20+ or [Bun](https://bun.sh)

### Run locally

```bash
bun install     # or: npm install
bun run dev     # opens at localhost:5173
```

Without Polkadot Desktop, the app uses dev accounts (Alice, Bob…) via `DevProvider`. For full functionality — Bulletin reads, signed transactions, Epistemon saves — open inside Polkadot Desktop.

### Deploy the app

```bash
pg deploy
# Domain: 9+ characters, ending in exactly 2 digits
# e.g.: mybuilder01
```

Your first deploy earns **100 XP** on the playground leaderboard.

### Deploy the contracts (optional — unlocks on-chain Epistemon + shared community index)

```bash
pg deploy
# The CLI reads cdm.json and deploys all three contracts:
#   contract/epistemon.rs  → on-chain NFT ownership
#   contract/community.rs  → permanent shared comment index
#   contract/leaderboard.rs → RPS leaderboard (Level 3 lab)
```

---

## Project structure

```
src/
  tutorial/
    curriculum.tsx     — all 17 lessons (modules, AI tips, resources, diagrams)
    progress.ts        — save/load tutorial progress to Bulletin Chain
    epistemon.ts       — trait derivation, stage calculation, name generation
    community.ts       — post/load lesson comments (Bulletin + local index)
    types.ts           — all types: Lesson, TutorialProgress, EpistemonData,
                         CommentEntry, AiTip, Resource…
  components/
    TutorialShell.tsx  — layout: sidebar + lesson pane + progress toolbar + evolution modal
    Sidebar.tsx        — module/lesson navigation tree with completion state
    LessonView.tsx     — concept, diagram, code, lab, deep dive, AI tips, resources, community
    EpistemonSVG.tsx   — generative SVG creature renderer (5 stages × 5 traits)
    EpistemonWidget.tsx— 48px sidebar widget with stage name and progress to next evolution
    EvolutionModal.tsx — full-screen level-up overlay with CSS confetti
    CommunitySection.tsx — collapsible per-lesson comment thread
    CommentCard.tsx    — single comment with type badge and upvote
    CommentForm.tsx    — post form: type selector, text, optional resource URL
    CodeBlock.tsx      — syntax-highlighted code with copy button
    LabCard.tsx        — hands-on exercise with steps, verify, and mark-complete
    AiTipsCard.tsx     — collapsible AI prompt suggestions
    ResourceLinks.tsx  — typed external reading links
    diagrams/          — inline SVG architecture diagrams
  pages/
    Landing.tsx        — track selection page with feature overview
    Collection.tsx     — Epistemon collection gallery
    SoloGame.tsx       — Rock Paper Scissors game (the lab demo)
    MyProfile.tsx      — player profile and game history
  utils.ts             — SignerManager, CloudStorageClient singleton, game helpers
  App.tsx              — routing: landing → lesson → solo demo → collection
  App.css              — all styles (CSS variables, dark theme, tutorial, Epistemon, community)
contract/
  epistemon.rs         — ink! NFT contract: mint, evolve, get_collection
  community.rs         — ink! index contract: post, upvote, getComments, getContributions
  leaderboard.rs       — ink! leaderboard: update (cid + points), get
cdm.json               — contract deployment manifest for pg deploy
```

---

## Tutorial progress

Progress is saved to **Bulletin Chain** using the same `CloudStorageClient` taught in Level 2. A CID pointer lives in `localStorage` per account (`tutorial-progress:<address>`). This is self-demonstrating: the mechanism that saves your progress is the one you're learning to build.

The progress object also stores your Epistemon's **trait seed** — so your Epistemon's appearance is deterministic and survives across devices as long as progress is saved to Bulletin.

Progress falls back to local state when no account is connected.

---

## Epistemon traits

Traits are derived from `djb2(address + ":" + generation)` — a deterministic hash:

| Trait | Values | Effect |
| ----- | ------ | ------ |
| `colorPalette` | Flame / Bloom / Wave / Storm / Shadow / Dawn | Overall colour scheme |
| `bodyType` | round / hexagonal / star / diamond / cloud | Body silhouette (stage 2+) |
| `eyeType` | dots / stars / circles / diamonds / crescents / spirals | Eye appearance (stage 1+) |
| `accessory` | none / wrench / code brackets / badge / book / circuit / lightning / infinity | Floating accessory (stage 2+) |
| `pattern` | plain / spotted / striped / inner circle | Body texture (stage 2+) |

---

## Adding lessons

Each lesson is a TypeScript object in `src/tutorial/curriculum.tsx`:

```ts
{
  id: "unique-lesson-id",
  title: "Lesson Title",
  duration: "~10 min",
  track: "both",            // "fast" | "deep" | "both"
  concept: <JSX />,         // plain-English explanation (2–3 paragraphs)
  deepDive: <JSX />,        // philosophy, web3 stakes, deeper theory
  diagram: <Component />,   // optional SVG from src/components/diagrams/
  code: { snippet, filename, language },
  lab: { title, file, steps, checkpoint, demo? },
  aiTips: [
    { type: "understand" | "explore" | "build" | "debug",
      title, rationale, prompt }
  ],
  resources: [
    { title, url, type: "docs" | "spec" | "article" | "repo" | "video",
      description }
  ],
}
```

---

## Modding this app

This tutorial is itself a moddable playground app. Fork it, add modules, translate it, replace RPS with a different example, or extend the Epistemon trait system with new evolution stages. When you deploy as moddable, you earn XP every time someone mods your version.

---

## Network reference

| Resource | Value |
| -------- | ----- |
| Bulletin Next RPC | `wss://paseo-bulletin-next-rpc.polkadot.io` |
| Asset Hub Next RPC | `wss://paseo-asset-hub-next-rpc.polkadot.io` |
| IPFS gateway | `https://paseo-bulletin-next-ipfs.polkadot.io/ipfs/<cid>` |
| CDM registry | `0xf62c2ece29cd8df2e10040ecfa5a894a5c5d9cb0` |
| CloudStorage env | `"paseo"` (dev) / `"summit"` (event) |

---

## Event note

The Summit network switches off at the closing ceremony. Push your code to GitHub before then — your code persists, the network data doesn't.

---

## License

GPL-3.0-only — see [LICENSE](LICENSE).

Built with the [Polkadot Product SDK](https://docs.polkadot.com/apps/) at Web3 Summit 2026.
