import PolkadotTriangle from "../components/diagrams/PolkadotTriangle.tsx";
import ContentAddressed from "../components/diagrams/ContentAddressed.tsx";
import SignerFlow from "../components/diagrams/SignerFlow.tsx";
import CommitReveal from "../components/diagrams/CommitReveal.tsx";
import type { TutorialModule } from "./types.ts";

export const modules: TutorialModule[] = [

    // ═══════════════════════════════════════════════════════════
    // MODULE 0: Welcome to Playground
    // ═══════════════════════════════════════════════════════════
    {
        id: "welcome",
        title: "Welcome to Playground",
        icon: "🚀",
        lessons: [
            {
                id: "what-is-playground",
                title: "What is playground.dot?",
                duration: "~5 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            <strong>playground.dot</strong> is a developer platform for Polkadot — browse, mod,
                            and deploy apps directly from your browser or terminal. Every app in the registry is
                            a live, moddable starting point.
                        </p>
                        <p>
                            You're not building from scratch. You start from a working app (this one), change
                            what you want, and deploy your version to a permanent <code>.dot</code> address that
                            you own. Nobody can take it down — not Parity, not anyone.
                        </p>
                        <p>
                            This tutorial walks you through the full Polkadot Product Builder stack: mods,
                            decentralised storage, smart contracts, and peer-to-peer multiplayer. You deploy at
                            the end of every level.
                        </p>
                    </>
                ),
                diagram: <PolkadotTriangle />,
                deepDive: (
                    <>
                        <h3>The ownership model shift</h3>
                        <p>
                            Traditional software has an invisible power structure: the company that runs the
                            servers controls the product. They can change the algorithm, delete your account,
                            deprecate the API, or shut down the service entirely. You're a user, not an owner —
                            even when you've paid for the product.
                        </p>
                        <p>
                            Polkadot's "moddable app" model challenges this at its root. When a developer
                            deploys an app as moddable, they're creating a <em>living, forkable artifact</em> on
                            a permissionless network. Anyone can take it, change it, and deploy their version —
                            which is just as "real" as the original. No central authority decides which version
                            is canonical. No approval process. No gatekeeping.
                        </p>
                        <p>
                            This is philosophically closer to open-source culture than to app stores — but it
                            goes further. The original developer still earns XP when someone mods their work,
                            creating an incentive for open contribution even without a business model. Code
                            becomes infrastructure.
                        </p>
                        <h3>The Polkadot Triangle</h3>
                        <p>
                            Your app is a sandboxed single-page app that runs <em>inside</em> a host — Polkadot
                            Desktop (on a laptop), Polkadot Mobile (on a phone), or Polkadot Web (at{" "}
                            <code>dot.li</code> in a browser). The host manages your accounts, gates network
                            access, and provides signing — your app never touches private keys. This is the
                            "Polkadot Triangle": three host environments, one app codebase.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand the host model",
                        rationale: "Before writing code, understand why apps run 'inside' a host rather than directly in a browser. This shapes every architectural decision.",
                        prompt: `Explain Polkadot's "product app" model to me. What does it mean for an app to run "inside a host" like Polkadot Desktop? How is this different from a regular web app or a traditional dApp that connects a wallet? What are the security and UX benefits of this approach?`,
                    },
                    {
                        type: "explore",
                        title: "Explore the permissionless publishing stake",
                        rationale: "Understanding why censorship-resistant publishing matters will motivate the technical choices you'll make throughout this tutorial.",
                        prompt: `What are the philosophical differences between publishing an app on the App Store/Google Play vs deploying to a permissionless network like Polkadot? What problems does permissionless publishing solve that app stores don't? Who benefits most from this model?`,
                    },
                ],
                resources: [
                    {
                        title: "Polkadot Apps — official docs",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "Full reference for building Polkadot product apps",
                    },
                    {
                        title: "Product SDK overview",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "The SDK packages that power this tutorial",
                    },
                ],
            },

            {
                id: "first-deploy",
                title: "Your first deploy",
                duration: "~5 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            Deploying puts your app on a content-addressed network — no hosting fees, no
                            servers to maintain, no platform that can pull the plug. Your <code>.dot</code>{" "}
                            domain is yours permanently.
                        </p>
                        <p>
                            Deploying also earns <strong>100 XP</strong> — the biggest single award in the
                            system, earned on your very first deploy. The leaderboard runs on screens throughout
                            the venue. This is how you get on it.
                        </p>
                    </>
                ),
                code: {
                    filename: "terminal",
                    language: "bash",
                    snippet: `# From your project folder:
pg deploy

# Domain name rules:
# - At least 9 characters
# - Must end in exactly 2 digits
# - Examples: rockpaper01, mybuilder01, polkadev99`,
                },
                deepDive: (
                    <>
                        <h3>What does "permanent" actually mean?</h3>
                        <p>
                            "Permanent" is a word most tech companies abuse. In Web2, "permanent links" break
                            constantly — the Internet Archive estimates that 25% of links are dead within a
                            year. The reason: permanence is expensive, and whoever pays the hosting bill
                            controls the switch.
                        </p>
                        <p>
                            Content-addressed hosting changes this economics. When you deploy to Bulletin Chain,
                            your app's bytes are identified by their <em>hash</em>, not by a URL on someone's
                            server. Any node that has the content can serve it. If Parity were to disappear
                            tomorrow, your <code>.dot</code> app would still be accessible from any node that
                            has cached it.
                        </p>
                        <h3>DotNS: owning vs renting a domain</h3>
                        <p>
                            Traditional domains (like <code>.com</code>) are rented from ICANN-accredited
                            registrars who can revoke them — for non-payment, legal pressure, or policy
                            reasons. DotNS (<code>.dot</code>) works differently: it maps a human-readable name
                            to a CID in an on-chain registry. Owning a <code>.dot</code> domain means owning
                            an entry in a public ledger — not renting a slot from a registrar.
                        </p>
                    </>
                ),
                lab: {
                    title: "Deploy the app",
                    file: "terminal",
                    steps: [
                        <>Run <code>pg deploy</code> from your project folder.</>,
                        <>Pick a domain — at least 9 characters ending in exactly 2 digits (e.g. <code>myappname01</code>).</>,
                        <>The CLI builds, uploads to Bulletin, and registers your <code>.dot</code> domain.</>,
                        <>Copy the live URL it prints and open it in a browser.</>,
                    ],
                    checkpoint: "Your app is live at your .dot address. Come back and tell me it's deployed — that's where Level 2 begins.",
                },
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand content-addressed hosting",
                        rationale: "The pg deploy command hides a lot of complexity. Understanding what happens under the hood will help you debug deployments and reason about permanence.",
                        prompt: `Walk me through what happens when I run "pg deploy" on a Polkadot playground app. What gets built? Where does the content go? How does a .dot domain resolve to my app? What makes this different from deploying to Vercel or Netlify?`,
                    },
                    {
                        type: "explore",
                        title: "Compare hosting models",
                        rationale: "Comparing Web2 and Web3 hosting makes the trade-offs concrete — not everything about decentralised hosting is better, and you should know the real costs.",
                        prompt: `Compare these hosting options for a web app: Vercel (Web2), IPFS/Filecoin (Web3), and Polkadot Bulletin Chain (Web3). What are the actual trade-offs in terms of performance, cost, censorship-resistance, and developer experience? Be honest about the weaknesses of each.`,
                    },
                ],
                resources: [
                    {
                        title: "playground CLI reference (pg deploy)",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "All pg CLI commands and options",
                    },
                    {
                        title: "DotNS — Polkadot's naming system",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "How .dot domains work under the hood",
                    },
                    {
                        title: "Content addressing explained — IPFS docs",
                        url: "https://docs.ipfs.tech/concepts/content-addressing/",
                        type: "article",
                        description: "The concept behind CIDs and why location-independent addressing matters",
                    },
                ],
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════
    // MODULE 1: Mod the app
    // ═══════════════════════════════════════════════════════════
    {
        id: "mod",
        title: "Mod the app",
        icon: "🎨",
        lessons: [
            {
                id: "mod-with-pg",
                title: "Start from a live app",
                duration: "~3 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            <code>pg mod</code> turns a live, moddable <code>.dot</code> app into a local
                            project you can edit. It reads the app's published source repo, downloads the
                            code, installs what it needs, and gives you a working starting point.
                        </p>
                        <p>
                            That is the core playground loop: find an app that already works, mod it, then
                            deploy your version back to your own <code>.dot</code> address.
                        </p>
                    </>
                ),
                code: {
                    filename: "terminal",
                    language: "bash",
                    snippet: `# Pick a moddable app from playground.dot, then run:
pg mod playground-tutorial.dot

# Open the generated folder:
cd playground-tutorial-*

# Make changes locally, then deploy your version:
pg deploy`,
                },
                lab: {
                    title: "Understand the mod workflow",
                    file: "terminal",
                    steps: [
                        <>Find any app in playground.dot with a Moddable badge.</>,
                        <>Run <code>pg mod &lt;app-name&gt;.dot</code> to create a local copy.</>,
                        <>Open the generated folder in your editor.</>,
                        <>Make a small change, then use <code>pg deploy</code> when you are ready to publish your version.</>,
                    ],
                    checkpoint: "You can explain the loop: pg mod brings a live app local, and pg deploy publishes your mod.",
                },
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand moddable app source",
                        rationale: "Before editing, understand how a live app points back to source code and why that makes it reusable.",
                        prompt: `Explain how a moddable playground.dot app can be turned into a local project with "pg mod". What source information must the deployed app publish? What happens locally after I run the command? How is this different from cloning a random GitHub repository?`,
                    },
                ],
                resources: [
                    {
                        title: "playground CLI reference (pg mod)",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "The CLI command for starting from an existing moddable app",
                    },
                ],
            },

            {
                id: "mod-design",
                title: "Change the design",
                duration: "~5 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            All colours, spacing, and visual style live in a single CSS file —{" "}
                            <code>src/App.css</code>. The entire dark theme is controlled by a handful of CSS
                            custom properties at the top of the file. Change them, save, watch the hot-reload.
                        </p>
                        <p>
                            This is the fastest way to make an app feel like yours. Design systems built on CSS
                            variables let any fork inherit the structure while completely changing the aesthetic.
                        </p>
                    </>
                ),
                code: {
                    filename: "src/App.css",
                    language: "css",
                    snippet: `:root {
  --bg: #080814;       /* page background */
  --accent: #7c3aed;   /* purple highlight — swap for any hex */
  --success: #22c55e;  /* win colour */
  --danger: #ef4444;   /* lose colour */
  --warning: #fbbf24;  /* draw / timer colour */
}

/* Colour inspiration:
   Red:   --accent: #e11d48
   Teal:  --accent: #0d9488
   Amber: --accent: #d97706
   Blue:  --accent: #2563eb  */`,
                },
                deepDive: (
                    <>
                        <h3>Why CSS variables matter for moddable apps</h3>
                        <p>
                            CSS custom properties (variables) were introduced specifically to solve the "how do
                            you theme a component library?" problem. But in a moddable-app world, they serve a
                            bigger role: they're the documented <em>skin contract</em> of an app.
                        </p>
                        <p>
                            When an app is designed with a small set of semantic variables (
                            <code>--accent</code>, <code>--bg</code>, <code>--success</code>), any modifier can
                            change the entire aesthetic by overriding just those values — without touching the
                            component code. It separates <em>structure</em> (what the UI does) from{" "}
                            <em>presentation</em> (how it looks). This is the CSS equivalent of a well-designed
                            API: a stable interface that allows creative freedom underneath.
                        </p>
                        <h3>Design as contribution</h3>
                        <p>
                            Open source traditionally treats design as an afterthought — "we take PRs!" — but
                            most contributors are developers, not designers. Moddable apps democratise visual
                            contribution: a designer who can't write TypeScript can still fork the app, change
                            the colours and typography, and deploy a meaningfully different version. The XP
                            system rewards this equally with code contributions.
                        </p>
                    </>
                ),
                lab: {
                    title: "Make it yours",
                    file: "src/App.css",
                    steps: [
                        <>Open <code>src/App.css</code> and find the <code>:root</code> block at the top.</>,
                        <>Change <code>--accent</code> to a colour you like. Any valid hex code works.</>,
                        <>Change <code>--bg</code> for a different background — try <code>#0a0a0a</code> for near-black.</>,
                        <>Save the file. The dev server hot-reloads instantly. No refresh needed.</>,
                    ],
                    checkpoint: "Your app's accent colour is visibly different and the design feels like yours.",
                },
                aiTips: [
                    {
                        type: "understand",
                        title: "Learn CSS design tokens",
                        rationale: "CSS custom properties are more powerful than they look. Understanding them deeply helps you design systems that scale.",
                        prompt: `Explain CSS custom properties (variables) as a design system concept. What's the difference between using hardcoded hex values in CSS vs a variable system like --accent? Show me how a single variable change can cascade through an entire UI, using a concrete example.`,
                    },
                    {
                        type: "build",
                        title: "Co-design with AI",
                        rationale: "AI is a great design partner — ask it to suggest a palette before you commit to one.",
                        prompt: `I'm building a dark-mode web app for a blockchain developer conference. Suggest 3 different colour palette options (background, accent, success, danger, warning) that each have a distinct personality — one professional, one playful, one cyberpunk. Give me the hex values I can drop into CSS variables.`,
                    },
                ],
                resources: [
                    {
                        title: "MDN: CSS custom properties",
                        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
                        type: "docs",
                        description: "Complete reference for CSS variables and their cascade behaviour",
                    },
                    {
                        title: "Radix UI colour system",
                        url: "https://www.radix-ui.com/colors",
                        type: "article",
                        description: "A perceptually-balanced colour palette system — great for dark UIs",
                    },
                ],
            },

            {
                id: "mod-logic",
                title: "Mod the game logic",
                duration: "~10 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            The opponent's move is generated by <code>randomMove()</code> in{" "}
                            <code>src/utils.ts</code> — a perfectly uniform random pick. It doesn't have to
                            be. You could make the computer predictable, biased, or adaptive.
                        </p>
                        <p>
                            This is what modding game logic means: not just reskinning, but changing the
                            <em> rules of the system</em>. Making the opponent always pick rock turns it into a
                            trivial puzzle. Making it counter your last move makes it feel intelligent.
                        </p>
                    </>
                ),
                code: {
                    filename: "src/utils.ts",
                    language: "ts",
                    snippet: `// Current: uniform random
const MOVES: Move[] = ["rock", "paper", "scissors"];
export function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * 3)];
}

// Mod idea 1: biased toward rock (60% of the time)
export function randomMove(): Move {
  const r = Math.random();
  if (r < 0.6) return "rock";
  if (r < 0.8) return "paper";
  return "scissors";
}

// Mod idea 2: adaptive — counters the player's last move
// (wire lastPlayerMove in from game state)
export function adaptiveMove(lastPlayerMove: Move | null): Move {
  if (!lastPlayerMove) return randomMove();
  if (lastPlayerMove === "rock")     return "paper";
  if (lastPlayerMove === "paper")    return "scissors";
  return "rock"; // counters scissors
}`,
                },
                deepDive: (
                    <>
                        <h3>Game theory and mechanism design</h3>
                        <p>
                            Rock Paper Scissors is a <em>zero-sum game</em> with a Nash equilibrium at uniform
                            randomness. If both players play randomly, neither has an advantage. But real
                            humans aren't random — they have patterns, biases, and tendencies. Professional RPS
                            players study these and exploit them.
                        </p>
                        <p>
                            When you mod the opponent's strategy, you're doing a form of{" "}
                            <em>mechanism design</em>: changing the rules to create a different experience. A
                            biased opponent makes the game easier but rewards knowing the bias. An adaptive
                            opponent creates a meta-game: you have to be unpredictable to win. These choices
                            shape the entire player experience.
                        </p>
                        <h3>Off-chain vs on-chain logic</h3>
                        <p>
                            Right now, the opponent's move is generated in the browser — purely off-chain. In
                            Level 3, game results go on-chain (the leaderboard contract). The philosophical
                            question: should the game logic itself be on-chain? On-chain logic is verifiable
                            and trustless, but it's also deterministic and observable. A truly random opponent
                            requires a verifiable random function (VRF) — a non-trivial cryptographic
                            primitive. Understanding when to put logic on-chain vs off-chain is one of the core
                            skills of a product builder.
                        </p>
                    </>
                ),
                lab: {
                    title: "Change the opponent's behaviour",
                    file: "src/utils.ts",
                    demo: "rps-game",
                    steps: [
                        <>Open <code>src/utils.ts</code> and find the <code>randomMove()</code> function.</>,
                        <>Replace it with a biased or adaptive version — use the examples above or invent your own.</>,
                        <>Open the game demo below and play a few rounds. Does the opponent feel different?</>,
                        <>Try making it <em>too</em> predictable — what happens to the fun?</>,
                    ],
                    checkpoint: "The opponent's behaviour visibly matches your change. Paper always beats a rock-only opponent.",
                },
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand the code before changing it",
                        rationale: "Don't modify code you don't understand — ask AI to walk you through it first.",
                        prompt: `I'm looking at this TypeScript function in a Rock Paper Scissors game:

const MOVES: Move[] = ["rock", "paper", "scissors"];
export function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * 3)];
}

Explain every part of this — what type Move is likely to be, why Math.floor is used, what the distribution of results looks like, and what edge cases could occur. Then suggest 3 different ways I could modify this function to create different opponent personalities.`,
                    },
                    {
                        type: "build",
                        title: "Design an AI opponent together",
                        rationale: "Design the logic before writing it — describe what you want in English, let AI translate it to code, then verify you understand every line.",
                        prompt: `I want to build an adaptive Rock Paper Scissors opponent in TypeScript that:
1. Tracks what the player picks most often over the last 5 rounds
2. 70% of the time, plays the move that beats the player's most common choice
3. 30% of the time, plays randomly (to stay unpredictable)

Walk me through the logic step by step, then write the TypeScript function. After showing the code, explain each line so I understand it fully before I use it.`,
                    },
                ],
                resources: [
                    {
                        title: "Nash equilibrium — Wikipedia",
                        url: "https://en.wikipedia.org/wiki/Nash_equilibrium",
                        type: "article",
                        description: "The game theory concept behind optimal RPS strategy",
                    },
                    {
                        title: "On-chain randomness — Polkadot docs",
                        url: "https://docs.polkadot.com/",
                        type: "docs",
                        description: "How Polkadot's BABE VRF provides verifiable randomness on-chain",
                    },
                ],
            },

            {
                id: "accounts",
                title: "Accounts without wallets",
                duration: "~7 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            Traditional web3 apps ask you to "Connect Wallet." Polkadot product apps don't —
                            the host (Polkadot Desktop, or the web host at <code>dot.li</code>) manages your
                            account. Your app requests a signing account through the SDK; it never handles
                            private keys directly.
                        </p>
                        <p>
                            This is the <strong>SignerManager</strong> pattern. Set it up once in{" "}
                            <code>src/utils.ts</code>, and every component that needs the current account reads
                            from it. Outside a host, <code>DevProvider</code> supplies standard dev accounts
                            (Alice, Bob…) so you can work locally without needing a real wallet.
                        </p>
                    </>
                ),
                diagram: <SignerFlow />,
                code: {
                    filename: "src/utils.ts",
                    language: "ts",
                    snippet: `const PRODUCT_ID = "playground-tutorial.dot"; // ← your .dot address

export const signerManager = new SignerManager({
  dappName: "playground-tutorial",
  createProvider: (type) =>
    type === "host"
      ? new HostProvider({
          productAccount: {
            dotNsIdentifier: PRODUCT_ID, // scopes the product account
            derivationIndex: 0,
          },
        })
      : new DevProvider(), // Alice, Bob… for local dev
});

// Read signer state reactively in components:
export function useSignerState(): SignerState {
  return useSyncExternalStore(
    (cb) => signerManager.subscribe(cb),
    () => signerManager.getState(),
  );
}`,
                },
                deepDive: (
                    <>
                        <h3>The "connect wallet" UX problem</h3>
                        <p>
                            "Connect Wallet" is the web3 equivalent of "Please install Java to continue." It's
                            a friction-generating security prompt that most users don't understand and that
                            experienced users have learned to distrust. It signals a fundamental architectural
                            gap: the app and the identity system are separate, and the user has to manually
                            bridge them.
                        </p>
                        <p>
                            The host model eliminates this gap. Your account is already available when the app
                            starts — the host authenticated you. This is closer to how native apps work: you
                            log into your phone once, and all apps use that identity without asking you to "connect" again.
                        </p>
                        <h3>Key custody models</h3>
                        <p>
                            There are three ways a web3 app can handle keys: <em>custodial</em> (the app holds
                            your keys — never do this), <em>non-custodial with user management</em> (MetaMask /
                            hardware wallet — user manages keys, app never sees them), and{" "}
                            <em>host-delegated</em> (the host manages keys, your app gets signed accounts — the
                            Polkadot product model). Host-delegated gives the best UX while maintaining
                            non-custodial security. The host is a trusted piece of software on the user's
                            device, not a server — this is a critical distinction.
                        </p>
                        <h3>Product accounts and PRODUCT_ID</h3>
                        <p>
                            Your <code>PRODUCT_ID</code> — the <code>.dot</code> domain — scopes the product
                            account. Each app gets a derived account specific to that product, not a generic
                            "user wallet." This means your app can only access funds and signatures scoped to
                            its own product account. When you deploy to your own domain, update
                            <code>PRODUCT_ID</code> to match — this is what ties the account to your specific
                            deployment.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand key custody models",
                        rationale: "Signing and key management are the most security-critical part of any web3 app. Understand the model before writing any signing code.",
                        prompt: `Explain the different key custody models in web3 apps:
1. Custodial (server holds keys)
2. Non-custodial with browser extension (MetaMask model)
3. Host-delegated (Polkadot product model)

For each one: What are the security guarantees? Who can steal the user's funds? What's the UX like? When would you choose each? I'm building a Polkadot product app — why does the host-delegated model matter for my app?`,
                    },
                    {
                        type: "explore",
                        title: "Explore the account derivation system",
                        rationale: "Product accounts are derived deterministically — understanding this helps you reason about account isolation and what your app can and can't access.",
                        prompt: `Explain how hierarchical deterministic (HD) wallets and account derivation work. What does "derivation index 0" mean in the context of a product account? How does scoping an account to a product ID (like "my-app.dot") prevent one app from accessing another app's funds? What cryptographic primitives make this possible?`,
                    },
                ],
                resources: [
                    {
                        title: "Polkadot accounts — wiki",
                        url: "https://wiki.polkadot.network/docs/learn-accounts",
                        type: "docs",
                        description: "How Polkadot accounts, keys, and derivation work",
                    },
                    {
                        title: "product-sdk-signer — GitHub",
                        url: "https://github.com/paritytech/polkadot-sdk",
                        type: "repo",
                        description: "Source code for SignerManager, HostProvider, DevProvider",
                    },
                    {
                        title: "HD wallets — BIP-32 spec",
                        url: "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki",
                        type: "spec",
                        description: "The original hierarchical deterministic wallet specification",
                    },
                ],
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════
    // MODULE 2: Decentralised storage
    // ═══════════════════════════════════════════════════════════
    {
        id: "storage",
        title: "Decentralised storage",
        icon: "🗄️",
        lessons: [
            {
                id: "storage-concept",
                title: "Data that can't be deleted",
                duration: "~5 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            Right now, game results live in your browser's localStorage. Clear the browser —
                            they're gone. <strong>Decentralised storage</strong> means your data lives on a
                            network of independent nodes. Nobody controls it — not you, not us, not anyone.
                        </p>
                        <p>
                            In Level 2, game results will live permanently on this network. Play a game, close
                            the browser, come back a week later — your history is still there. The underlying
                            network is called <strong>Bulletin Chain</strong>. The SDK handles all the
                            complexity.
                        </p>
                    </>
                ),
                diagram: <ContentAddressed />,
                deepDive: (
                    <>
                        <h3>The data ownership problem</h3>
                        <p>
                            When your Instagram gets deleted or your Spotify playlist disappears because a
                            licensing deal expired, you experience the fundamental problem of Web2 data: you
                            don't own it. The platform owns your data, and you rent access to it. This isn't a
                            bug — it's the business model. Your data is the product.
                        </p>
                        <p>
                            Decentralised storage inverts this model. Data is addressed by its content (a
                            cryptographic hash), not by where it's stored (a server URL). Any node that has the
                            bytes can serve them. No single party controls access. The data exists as long as
                            at least one node has it — and content-addressed networks are designed so that
                            popular content is widely cached.
                        </p>
                        <h3>The "right to be forgotten" tension</h3>
                        <p>
                            Permanence is a double-edged sword. GDPR's "right to be forgotten" requires that
                            personal data can be deleted on request — but permanent decentralised storage
                            makes this architecturally impossible. This is a genuine tension, not a solved
                            problem. The current approach in most decentralised apps: store personal data
                            encrypted, "delete" by destroying the decryption key. The data remains on the
                            network, but becomes permanently unreadable. Is that deletion? Legally: unclear.
                            Practically: arguably yes.
                        </p>
                        <p>
                            For this tutorial's game results, we're storing public gameplay data — no PII,
                            just moves and scores. But as you build real products, this tension will matter.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand decentralised storage fundamentals",
                        rationale: "Knowing why data lives where it does shapes every product decision about what to store, how long, and with what privacy guarantees.",
                        prompt: `Explain the difference between centralised storage (AWS S3, Google Cloud), decentralised content-addressed storage (IPFS, Bulletin Chain), and decentralised location-addressed storage (BitTorrent). What guarantees does each give about availability, permanence, and censorship resistance? When would you choose each for a web3 app?`,
                    },
                    {
                        type: "explore",
                        title: "Explore the GDPR tension",
                        rationale: "Building on permanent storage raises real legal questions. Understanding the tension prepares you to make informed design decisions.",
                        prompt: `What is the "right to be forgotten" under GDPR, and how does it conflict with permanent decentralised storage like IPFS or blockchain? What architectural patterns do web3 apps use to handle this tension? Explain the "encrypt then destroy the key" approach and its limitations. Should I be worried about this when building a Polkadot product app that stores game results?`,
                    },
                ],
                resources: [
                    {
                        title: "IPFS — how content addressing works",
                        url: "https://docs.ipfs.tech/concepts/content-addressing/",
                        type: "docs",
                        description: "The conceptual foundation for Bulletin Chain's storage model",
                    },
                    {
                        title: "Bulletin Chain — Polkadot wiki",
                        url: "https://wiki.polkadot.network/",
                        type: "docs",
                        description: "How Bulletin Chain provides decentralised storage on Polkadot",
                    },
                ],
            },

            {
                id: "cloud-storage-client",
                title: "The CloudStorageClient",
                duration: "~8 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            <code>CloudStorageClient</code> wraps Bulletin Chain — Polkadot's content-addressed
                            storage layer. Give it bytes, get back a CID. Anyone with the CID can read the
                            data back.
                        </p>
                        <p>
                            The <strong>lazy signer</strong> pattern means the client is created once but
                            doesn't ask for account permission until the first actual upload. No premature
                            prompts before the user is ready — a UX principle as much as a technical one.
                        </p>
                    </>
                ),
                code: {
                    filename: "src/utils.ts",
                    language: "ts",
                    snippet: `import { CloudStorageClient, createLazySigner }
  from "@parity/product-sdk-cloud-storage";

// Lazy singleton — created once, signs on first use
let _client: CloudStorageClient | null = null;
export async function getStorageClient() {
  if (!_client) {
    _client = await CloudStorageClient.create({
      environment: "paseo",  // "summit" for the event network
      signer: createLazySigner(() => signerManager.getSigner()),
    });
  }
  return _client;
}

// Upload bytes → CID
const result = await client.store(bytes).send();
const cid = result.cid.toString(); // "bafy..."

// Read back (inside a Polkadot host)
const bytes = await client.fetchBytes(cid);`,
                },
                deepDive: (
                    <>
                        <h3>The lazy initialisation pattern</h3>
                        <p>
                            The <code>createLazySigner</code> pattern is a specific application of lazy
                            evaluation: delay expensive or permission-requiring operations until they're
                            actually needed. Creating the <code>CloudStorageClient</code> doesn't request
                            signing permission — only the first <code>.send()</code> does. This means you can
                            initialise the client early (on mount) without triggering a wallet prompt.
                        </p>
                        <p>
                            This is a general principle worth internalising: <em>initialise eagerly, act
                            lazily</em>. Set up your infrastructure at startup; defer anything that requires
                            user action or network I/O until the moment it's actually needed.
                        </p>
                        <h3>Reads vs writes on Bulletin</h3>
                        <p>
                            Writes to Bulletin (uploading data) require a signed transaction and a fee.
                            Reads (fetching by CID) are free and can be done by anyone. Inside a Polkadot
                            host, reads route through the host's preimage subscription — a WebSocket channel
                            the host maintains. Outside a host (plain browser), reads must go through a public
                            IPFS gateway. This asymmetry matters: it means your deployed app can always read
                            data, but a user testing in a plain browser tab won't see reads work. Test in the
                            host.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand the lazy signer pattern",
                        rationale: "Lazy initialisation is a recurring pattern in the product SDK — once you understand it here, you'll recognise it everywhere.",
                        prompt: `Explain the "lazy signer" pattern used in this Polkadot SDK code:

const client = await CloudStorageClient.create({
  signer: createLazySigner(() => signerManager.getSigner()),
});

Why is the signer wrapped in a function that returns another function? What does "lazy" mean here — what's being deferred, and why? How does this improve the user experience compared to requesting signing permission immediately on page load?`,
                    },
                    {
                        type: "debug",
                        title: "Debug upload failures",
                        rationale: "Uploads silently fail in several common scenarios. Know them before you hit them.",
                        prompt: `My CloudStorageClient.store(bytes).send() call fails silently in a Polkadot product app. What are the most common reasons this happens? Walk me through a debugging checklist — what should I check first, second, third? Specifically: does the account need a Bulletin allowance? What happens if I run this outside a Polkadot host? How do I tell if the failure is a signing issue vs a network issue?`,
                    },
                ],
                resources: [
                    {
                        title: "product-sdk-cloud-storage — docs",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "Full API reference for CloudStorageClient",
                    },
                    {
                        title: "Bulletin Chain — transaction storage pallet",
                        url: "https://wiki.polkadot.network/",
                        type: "docs",
                        description: "How the underlying pallet works",
                    },
                ],
            },

            {
                id: "cids",
                title: "CIDs — the address of your data",
                duration: "~5 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            A <strong>CID</strong> (Content Identifier) is a cryptographic hash of your data.
                            The same bytes always produce the same CID — it's not a random ID, it's a
                            fingerprint. Two uploads of identical content return the same CID automatically.
                        </p>
                        <p>
                            This means storage is deduplicated for free. It also means you can verify
                            integrity: if the bytes you receive don't hash to the CID you expected, they've
                            been tampered with. The network won't serve corrupt data.
                        </p>
                    </>
                ),
                deepDive: (
                    <>
                        <h3>From "where" to "what"</h3>
                        <p>
                            Traditional URLs are <em>location-based</em> addresses: they tell you where to
                            find something (<code>https://server.com/file</code>). If the server moves, the
                            URL breaks. If the file is replaced with different content, you'd never know —
                            the URL looks the same. This is the root cause of link rot and data substitution
                            attacks.
                        </p>
                        <p>
                            CIDs are <em>content-based</em> addresses: they tell you what something is (a
                            hash of the bytes). If the content changes, the CID changes. If you have the CID,
                            you can verify any copy of the data against it. This is a more honest addressing
                            system — the address is a verifiable commitment to the content.
                        </p>
                        <h3>Merkle DAGs and the tree structure of CIDs</h3>
                        <p>
                            For large data, CIDs work through a Merkle DAG (Directed Acyclic Graph): the data
                            is split into chunks, each chunk gets a CID, and a root CID covers all the chunk
                            CIDs. This allows efficient partial reads and verifiable streaming — you can
                            verify each chunk independently without downloading the whole file. The SDK handles
                            all of this automatically via its chunking logic.
                        </p>
                    </>
                ),
                lab: {
                    title: "Inspect your CID on the network",
                    steps: [
                        <>After completing the "Wiring it up" lab, open your browser's DevTools console (F12).</>,
                        <>Run: <code>localStorage.getItem('rps-game-cid:&lt;your-address&gt;')</code></>,
                        <>Copy the CID (starts with <code>bafy</code>).</>,
                        <>Paste it into: <code>https://paseo-bulletin-next-ipfs.polkadot.io/ipfs/&lt;cid&gt;</code></>,
                    ],
                    checkpoint: "You see your game history as raw JSON in the browser — served directly from the Bulletin network, not from any server.",
                },
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand CIDs from first principles",
                        rationale: "CIDs look like magic strings until you understand the hash function underneath — then they become obvious and trustworthy.",
                        prompt: `Explain CIDs (Content Identifiers) from first principles. What is a cryptographic hash function, and what properties make it useful for addressing content? Why is blake2b used instead of SHA-256 in IPFS? What is the structure of a CID — what does each part encode (codec, hash function, hash digest)? Why is "bafy..." the prefix for most CIDv1s?`,
                    },
                    {
                        type: "explore",
                        title: "Explore Merkle trees",
                        rationale: "Merkle trees are foundational to both blockchains and content-addressed storage — understanding them deepens your mental model of the whole Polkadot stack.",
                        prompt: `Explain Merkle trees and Merkle DAGs. How are they used in Bitcoin/Ethereum (for transaction verification) vs in IPFS/Bulletin Chain (for content addressing)? What does it mean that you can verify a single piece of a large file without downloading the whole file? Draw me an ASCII diagram of a simple Merkle tree.`,
                    },
                ],
                resources: [
                    {
                        title: "CID Inspector — cid.ipfs.tech",
                        url: "https://cid.ipfs.tech/",
                        type: "docs",
                        description: "Paste any CID and see its decoded components",
                    },
                    {
                        title: "Multiformats — CID specification",
                        url: "https://github.com/multiformats/cid",
                        type: "spec",
                        description: "The technical spec behind CID encoding",
                    },
                    {
                        title: "Merkle trees — Wikipedia",
                        url: "https://en.wikipedia.org/wiki/Merkle_tree",
                        type: "article",
                        description: "The data structure underlying content-addressed storage",
                    },
                ],
            },

            {
                id: "storage-wiring",
                title: "Wiring it up",
                duration: "~15 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            The full Level 2 change: replace <code>localStorage.setItem</code> with a Bulletin
                            upload, and keep only a CID pointer in localStorage per account. On reload, the
                            app reads the CID and fetches the real data from the network.
                        </p>
                        <p>
                            The key consequence: <code>appendGame</code> becomes <code>async</code>. Saving to
                            a network is slower than writing to memory — the UI should reflect this with a
                            "saving…" state rather than assuming instant success.
                        </p>
                    </>
                ),
                code: {
                    filename: "src/utils.ts",
                    language: "ts",
                    snippet: `const CID_KEY = (addr: string) => \`rps-game-cid:\${addr}\`;

export async function savePlayerData(data: PlayerData): Promise<void> {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  const client = await getStorageClient();
  const result = await client.store(bytes).send();
  if (!result.cid) throw new Error("upload returned no CID");
  // Only the CID (tiny) lives in localStorage
  localStorage.setItem(CID_KEY(data.player), result.cid.toString());
}

export async function loadPlayerData(address: string): Promise<PlayerData> {
  try {
    const cid = localStorage.getItem(CID_KEY(address));
    if (cid) {
      const bytes = await (await getStorageClient()).fetchBytes(cid);
      return JSON.parse(new TextDecoder().decode(bytes));
    }
  } catch { /* fall through to default */ }
  return { player: address, totalGames: 0,
           wins: 0, losses: 0, draws: 0, points: 0, games: [] };
}`,
                },
                deepDive: (
                    <>
                        <h3>The CID pointer pattern</h3>
                        <p>
                            Keeping a CID pointer in localStorage is a specific application of a general
                            pattern: <em>cache a pointer to the canonical source of truth</em>. localStorage
                            is fast and always available; Bulletin is authoritative and permanent. Using
                            localStorage as a cache means the app loads instantly (it knows where to look),
                            then fetches the actual data from the network.
                        </p>
                        <p>
                            This is architecturally similar to a URL in a database that points to a file in
                            S3 — except the "URL" (CID) is a verifiable content commitment, and "S3"
                            (Bulletin) is a decentralised network. If the localStorage CID is lost (cleared
                            browser), the data is still on the network — you just lose the pointer. In Level
                            3, the pointer moves to the smart contract, which is shared and permanent.
                        </p>
                        <h3>Making async the user experience</h3>
                        <p>
                            When <code>appendGame</code> became async, the UI had to handle a new state:
                            "upload in progress." The current code shows "Saved to network" after the promise
                            resolves. But what if the upload fails? A production app needs error handling,
                            retry logic, and potentially offline support (queue the upload, retry when back
                            online). This tutorial skips these for brevity, but they matter for real products.
                        </p>
                    </>
                ),
                lab: {
                    title: "Move game results to the network",
                    file: "src/utils.ts",
                    demo: "rps-game",
                    steps: [
                        <>Install: <code>bun add @parity/product-sdk-cloud-storage</code></>,
                        <>Add the <code>CloudStorageClient</code> import and <code>getStorageClient()</code> singleton to <code>src/utils.ts</code>.</>,
                        <>Replace <code>savePlayerData</code> and <code>loadPlayerData</code> with the async versions shown above.</>,
                        <>In <code>src/pages/SoloGame.tsx</code>, make the <code>setTimeout</code> callback <code>async</code> and add <code>await</code> before <code>appendGame()</code>.</>,
                        <>In <code>src/pages/MyProfile.tsx</code>, update the <code>useEffect</code> to <code>loadPlayerData(...).then(setData).catch(console.error)</code>.</>,
                    ],
                    checkpoint: "Play a game. See \"Saved to network\" appear. Refresh the page. Your score is still there.",
                },
                aiTips: [
                    {
                        type: "build",
                        title: "Step-by-step with AI guidance",
                        rationale: "This lab involves changes across 3 files and introduces async patterns. Use AI to walk through each file change and understand what you're doing before applying it.",
                        prompt: `I'm migrating a React app's game result storage from localStorage to Polkadot's Bulletin Chain using CloudStorageClient. I need to:
1. Make savePlayerData async (upload to Bulletin, store CID in localStorage)
2. Make loadPlayerData async (read CID from localStorage, fetch from Bulletin)
3. Update a setTimeout callback in SoloGame.tsx to await the async appendGame()
4. Update a useEffect in MyProfile.tsx to handle the async load

Walk me through each change one at a time. For each change, explain WHY it's needed before showing the code. I want to understand, not just copy-paste.`,
                    },
                    {
                        type: "debug",
                        title: "Debug the async migration",
                        rationale: "Migrating sync code to async is one of the most common sources of subtle bugs. Know the failure modes.",
                        prompt: `I migrated localStorage storage to Bulletin Chain in my React app and now:
- The profile sometimes doesn't load on refresh
- The "Saved to network" text sometimes never appears
- I get "Cannot read properties of undefined" in MyProfile

What are the most likely causes of each of these bugs in an async migration? Specifically: what happens if you forget to await an async function in a setTimeout? What happens if a useEffect doesn't handle a Promise rejection? How should I add proper error boundaries for async storage operations?`,
                    },
                ],
                resources: [
                    {
                        title: "product-sdk-cloud-storage — API reference",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "Full CloudStorageClient API with examples",
                    },
                    {
                        title: "JavaScript Promises — MDN",
                        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
                        type: "docs",
                        description: "Reference for async/await and Promise patterns used in this lab",
                    },
                ],
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════
    // MODULE 3: Smart contracts (deep only)
    // ═══════════════════════════════════════════════════════════
    {
        id: "contracts",
        title: "Smart contracts",
        icon: "📜",
        lessons: [
            {
                id: "contracts-concept",
                title: "Code that runs itself",
                duration: "~5 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            A <strong>smart contract</strong> is a program deployed to a shared computer — it
                            keeps running even when you close your laptop, and nobody can change it after
                            deployment. Not even you.
                        </p>
                        <p>
                            For the leaderboard, this is essential. If scores lived in your browser, only you'd
                            see them. A contract on <strong>Polkadot Hub</strong> means every player reads the
                            same leaderboard — the scores are final, verifiable, and shared.
                        </p>
                    </>
                ),
                deepDive: (
                    <>
                        <h3>Nick Szabo's original vision</h3>
                        <p>
                            Nick Szabo coined the term "smart contract" in 1994 — seventeen years before
                            Bitcoin, twenty years before Ethereum. His original definition: "a set of promises,
                            specified in digital form, including protocols within which the parties perform on
                            these promises." His canonical example was a vending machine: it enforces a
                            contract (pay X, receive Y) automatically, without needing a lawyer, a court, or
                            even a human arbiter.
                        </p>
                        <p>
                            The blockchain implementation goes further: the vending machine's code is public,
                            deployed to a network where nobody can tamper with it, and executes deterministically
                            for every input. It's a vending machine that can't be rigged, can't be shut down,
                            and whose internals are visible to anyone.
                        </p>
                        <h3>"Code is law" — and its limits</h3>
                        <p>
                            The "code is law" philosophy — that smart contracts are self-enforcing and
                            immutable — met its most famous stress test with the 2016 Ethereum DAO hack.
                            A vulnerability in the DAO contract was exploited to drain ~$60M in ETH. The
                            Ethereum community faced a dilemma: respect the code (and let the attacker keep
                            the funds) or hard-fork the chain to reverse the transactions (violating
                            immutability). They chose the fork. This split Ethereum into ETH and ETC.
                        </p>
                        <p>
                            Polkadot takes a different approach: on-chain governance. The network can upgrade
                            itself through a democratic process — no hard fork required. This accepts that
                            "code is law" must be balanced against human governance, and builds that balance
                            into the protocol itself.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand smart contracts from first principles",
                        rationale: "Smart contracts are often explained in terms of blockchain mechanics. Understanding them from the contract theory angle gives you a better mental model.",
                        prompt: `Explain smart contracts from first principles, starting from Nick Szabo's original 1994 concept. What problem was he trying to solve? How did the blockchain implementation change or extend his vision? What can a smart contract actually guarantee (execution, state, outcomes) and what can't it guarantee (oracle data, real-world events)? When is a smart contract the right tool vs a regular backend API?`,
                    },
                    {
                        type: "explore",
                        title: "Explore the governance question",
                        rationale: "The tension between immutability and governance is ongoing in web3. Understanding both sides helps you design better contracts.",
                        prompt: `The Ethereum DAO hack of 2016 exposed a fundamental tension in "code is law" philosophy. Explain what happened, what decision the community faced, and why they chose a hard fork. Then contrast this with Polkadot's on-chain governance model — how does Polkadot handle the need to fix bugs or upgrade contracts without a contentious hard fork? Which approach do you think is more sound, and why?`,
                    },
                ],
                resources: [
                    {
                        title: "Nick Szabo — Smart Contracts (1994)",
                        url: "https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html",
                        type: "article",
                        description: "The original paper that coined the term 'smart contract'",
                    },
                    {
                        title: "The DAO hack explained",
                        url: "https://en.wikipedia.org/wiki/The_DAO_(organization)",
                        type: "article",
                        description: "What happened in 2016 and why it matters",
                    },
                    {
                        title: "Polkadot governance — OpenGov",
                        url: "https://wiki.polkadot.network/docs/learn-polkadot-opengov",
                        type: "docs",
                        description: "How Polkadot handles protocol upgrades without hard forks",
                    },
                ],
            },

            {
                id: "contracts-writing",
                title: "Writing a contract",
                duration: "~10 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            Polkadot contracts use the <strong>ink!</strong> framework — Rust with macros that
                            map to smart contract patterns. If you know Solidity, the concepts are the same;
                            the language is Rust. If you're new to both: think of it as a struct with methods
                            where every state change is a signed transaction.
                        </p>
                        <p>
                            The leaderboard contract is intentionally simple: it stores{" "}
                            <code>(cid, points)</code> per player address. Players update their own entry;
                            anyone can read any entry. All heavy data (game history) stays on Bulletin —
                            the contract stores only the pointer and the score.
                        </p>
                    </>
                ),
                code: {
                    filename: "contract/leaderboard.rs",
                    language: "rust",
                    snippet: `#[ink::contract]
mod leaderboard {
    #[ink(storage)]
    pub struct Leaderboard {
        // Maps player address → (bulletin CID, total points)
        entries: ink::storage::Mapping<AccountId, (String, i32)>,
    }

    impl Leaderboard {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { entries: Default::default() }
        }

        /// Update caller's entry — only the player can update their own score
        #[ink(message)]
        pub fn update(&mut self, cid: String, points: i32) {
            self.entries.insert(self.env().caller(), &(cid, points));
        }

        /// Read any player's entry
        #[ink(message)]
        pub fn get(&self, account: AccountId) -> Option<(String, i32)> {
            self.entries.get(account)
        }
    }
}`,
                },
                deepDive: (
                    <>
                        <h3>Why Rust for contracts?</h3>
                        <p>
                            Smart contracts have unique requirements that make language choice critical: they
                            run in a deterministic VM, must execute identically on thousands of nodes, and
                            can't be patched after deployment. Memory safety bugs — buffer overflows,
                            use-after-free, integer overflows — become catastrophic when they drain user funds
                            rather than just crashing a server.
                        </p>
                        <p>
                            Rust's ownership model eliminates entire classes of memory safety bugs at compile
                            time, without a garbage collector. Solidity (EVM) has a long history of
                            reentrancy attacks and integer overflow exploits that stem from exactly the memory
                            safety issues Rust prevents. This isn't a theoretical advantage — it's why ink!
                            exists.
                        </p>
                        <h3>The ink! macro system</h3>
                        <p>
                            The <code>#[ink::contract]</code>, <code>#[ink(storage)]</code>, and{" "}
                            <code>#[ink(message)]</code> macros are procedural macros that transform regular
                            Rust code into contract bytecode. <code>#[ink(storage)]</code> generates the
                            serialisation/deserialisation needed to persist the struct to the chain.{" "}
                            <code>#[ink(message)]</code> marks functions callable as transactions or queries —
                            mutable messages require a transaction, immutable queries don't.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Learn ink! with AI as your Rust tutor",
                        rationale: "ink! mixes Rust syntax with contract-specific macros. Use AI to understand each piece before writing your own contract.",
                        prompt: `I'm reading an ink! smart contract for the first time. Walk me through this code line by line:

#[ink::contract]
mod leaderboard {
    #[ink(storage)]
    pub struct Leaderboard {
        entries: ink::storage::Mapping<AccountId, (String, i32)>,
    }
    impl Leaderboard {
        #[ink(constructor)]
        pub fn new() -> Self { Self { entries: Default::default() } }

        #[ink(message)]
        pub fn update(&mut self, cid: String, points: i32) {
            self.entries.insert(self.env().caller(), &(cid, points));
        }
    }
}

For each line: what does it mean? What's the macro doing? Why is &mut self used here? What is self.env().caller()? What happens if I call update() from an account that already has an entry — does it overwrite or append?`,
                    },
                    {
                        type: "build",
                        title: "Extend the contract together",
                        rationale: "Design contract extensions with AI, then understand every line before deploying — you can't patch a deployed contract.",
                        prompt: `I want to extend my leaderboard contract with two features:
1. A top-10 leaderboard query (return the top 10 accounts by points)
2. A minimum points threshold to appear on the leaderboard

Before writing any code: what are the storage and gas cost implications of storing a sorted leaderboard on-chain vs computing it off-chain? Which approach would you recommend for a small event leaderboard (~300 players) and why? Then write the ink! code for your recommended approach, explaining each decision.`,
                    },
                ],
                resources: [
                    {
                        title: "ink! documentation — use.ink",
                        url: "https://use.ink/",
                        type: "docs",
                        description: "Official ink! smart contract framework docs",
                    },
                    {
                        title: "The Rust Programming Language — book",
                        url: "https://doc.rust-lang.org/book/",
                        type: "docs",
                        description: "Free online book to learn Rust from scratch",
                    },
                    {
                        title: "pallet-revive — Polkadot contracts",
                        url: "https://docs.polkadot.com/",
                        type: "docs",
                        description: "The Polkadot runtime pallet that executes PVM contracts",
                    },
                ],
            },

            {
                id: "cdm-manifests",
                title: "CDM manifests",
                duration: "~5 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            A <strong>CDM</strong> (Contract Deployment Manifest) tells the playground CLI how
                            to build and deploy your contract. It's a JSON file at the project root that maps
                            your Rust source to a named contract on the network.
                        </p>
                        <p>
                            When you run <code>pg deploy</code>, the CLI reads <code>cdm.json</code>, compiles
                            your Rust, deploys to Paseo Hub, and publishes the ABI to Bulletin — so your
                            frontend resolves the contract address live, without hardcoding it.
                        </p>
                    </>
                ),
                code: {
                    filename: "cdm.json",
                    language: "json",
                    snippet: `{
  "registry": "0xf62c2ece29cd8df2e10040ecfa5a894a5c5d9cb0",
  "dependencies": {
    "@rps/leaderboard": "latest"
  },
  "contracts": {
    "@rps/leaderboard": {
      "address": "",
      "source": "contract/leaderboard.rs",
      "constructor": "new"
    }
  }
}`,
                },
                deepDive: (
                    <>
                        <h3>Infrastructure as code</h3>
                        <p>
                            The CDM manifest is an example of the "infrastructure as code" philosophy: your
                            deployment configuration lives in a version-controlled file alongside your code,
                            not in a manual sequence of CLI steps. This makes deployments reproducible and
                            auditable — anyone can see what was deployed, when, and with what parameters.
                        </p>
                        <p>
                            Compare this to Docker Compose or Kubernetes manifests: you describe the desired
                            state, and the tool figures out how to achieve it. The CDM does the same for
                            contract deployments: you declare what you want deployed and what it depends on;
                            <code>pg deploy</code> handles the compilation, deployment, and registration.
                        </p>
                        <h3>Live registry resolution</h3>
                        <p>
                            The <code>registry</code> field points to an on-chain contract registry. When your
                            frontend uses <code>ContractManager.fromLiveClient()</code>, it looks up your
                            contract's current address and ABI from this registry — at runtime, not at build
                            time. This means you can redeploy the contract (to fix a bug or add a feature) and
                            the frontend automatically picks up the new address. No frontend redeploy needed.
                            This is a key architectural advantage over hardcoding contract addresses.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand the registry resolution pattern",
                        rationale: "Live registry resolution is a powerful pattern that decouples your frontend from your contract address — but it has security implications worth understanding.",
                        prompt: `In a Polkadot product app, contract addresses are resolved at runtime from an on-chain registry rather than hardcoded in the frontend. Explain how this works: what is the registry contract? What does ContractManager.fromLiveClient() actually do? What are the security implications — could an attacker change the registry to point to a malicious contract? What protections exist against this?`,
                    },
                    {
                        type: "debug",
                        title: "Debug CDM deployment issues",
                        rationale: "CDM deployments can fail at compile time (Rust errors), deploy time (gas/account issues), or registration time (registry issues). Know the failure points.",
                        prompt: `I'm deploying a Polkadot contract using "pg deploy" with a cdm.json file and getting errors. Walk me through the deployment pipeline step by step: what does pg deploy do first, second, third? What are the most common failure points at each stage? Specifically: what does "AccountUnmapped" mean? What happens if my constructor fails? How do I know if the ABI was successfully published to Bulletin?`,
                    },
                ],
                resources: [
                    {
                        title: "CDM specification — Polkadot docs",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "Full CDM schema and deployment options",
                    },
                    {
                        title: "Infrastructure as Code — Wikipedia",
                        url: "https://en.wikipedia.org/wiki/Infrastructure_as_code",
                        type: "article",
                        description: "The general philosophy behind declarative deployment configurations",
                    },
                ],
            },

            {
                id: "deploy-leaderboard",
                title: "Deploy the leaderboard",
                duration: "~20 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            Once your contract is written and your CDM is configured, <code>pg deploy</code>{" "}
                            handles the rest: compiles Rust to PVM bytecode, deploys to Paseo Hub, and
                            publishes the ABI to Bulletin so your frontend can resolve it live.
                        </p>
                        <p>
                            In the frontend, <code>ContractManager</code> resolves your contract from the
                            registry by name — no hardcoded addresses. Redeploy the contract and the frontend
                            picks up the new address automatically on the next load.
                        </p>
                    </>
                ),
                code: {
                    filename: "src/utils.ts",
                    language: "ts",
                    snippet: `import { ContractManager } from "@parity/product-sdk-contracts";
import { createChainClient } from "@parity/product-sdk-chain-client";

const CDM_REGISTRY = "0xf62c2ece29cd8df2e10040ecfa5a894a5c5d9cb0";
const HUB_WS = "wss://paseo-asset-hub-next-rpc.polkadot.io";

// Connect to Asset Hub and resolve the leaderboard from the registry
const chainClient = await createChainClient({ endpoint: HUB_WS });
const contractManager = await ContractManager.fromLiveClient(
  chainClient,
  CDM_REGISTRY,
  signerManager.getSigner(),
);

const lb = contractManager.getContract("@rps/leaderboard");

// Write: update this player's CID + points (requires signing)
await lb.send.update(playerCid, playerPoints);

// Read: get any player's entry (free, no signing)
const entry = await lb.query.get(playerAddress);
// entry is: [cid: string, points: number] | undefined`,
                },
                lab: {
                    title: "Deploy and wire the leaderboard",
                    file: "contract/leaderboard.rs",
                    steps: [
                        <>Create a <code>contract/</code> directory and add <code>leaderboard.rs</code> (the contract from the previous lesson).</>,
                        <>Create <code>cdm.json</code> at the project root (from the CDM lesson above).</>,
                        <>Run <code>pg deploy</code> — it compiles your Rust, deploys to Paseo Hub, registers the ABI.</>,
                        <>Install: <code>bun add @parity/product-sdk-contracts @parity/product-sdk-chain-client</code></>,
                        <>Add <code>ContractManager</code> to <code>src/utils.ts</code> and call <code>lb.send.update(cid, points)</code> after each game.</>,
                        <>Add a leaderboard page that reads all entries using <code>lb.query.get(address)</code>.</>,
                    ],
                    checkpoint: "Play a game. Open the leaderboard page. Your address appears with your score. Other players' scores are visible too.",
                },
                aiTips: [
                    {
                        type: "build",
                        title: "Build the leaderboard UI together",
                        rationale: "Querying a contract is straightforward once the contract is deployed. Use AI to scaffold the leaderboard page while understanding the data flow.",
                        prompt: `I've deployed an ink! leaderboard contract to Polkadot Asset Hub. The contract has two functions:
- update(cid: string, points: i32) — writes the caller's entry
- get(account: AccountId) → Option<(String, i32)> — reads any account's entry

I want to build a React leaderboard page that:
1. Loads on the home screen
2. Shows a sorted list of top players with their addresses and points
3. Refreshes after the current player completes a game

The challenge: there's no "list all entries" query on the contract. Walk me through how to solve this (hint: the game history CIDs on Bulletin contain the addresses). Design the architecture first, then write the React component.`,
                    },
                    {
                        type: "debug",
                        title: "Debug the AccountUnmapped error",
                        rationale: "AccountUnmapped is the most common contract error in Polkadot apps. Know exactly why it happens and how to fix it.",
                        prompt: `I'm calling a Polkadot contract and getting "Revive::AccountUnmapped". Explain exactly what this error means: what is the Revive pallet? Why does an SS58 account need to be "mapped" before it can interact with contracts? How do I check if an account is already mapped? How do I map it using ensureContractAccountMapped from the SDK? Can this mapping fail, and under what conditions?`,
                    },
                ],
                resources: [
                    {
                        title: "product-sdk-contracts — API reference",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "ContractManager, createContractRuntimeFromClient, and related APIs",
                    },
                    {
                        title: "ink! — storage and data types",
                        url: "https://use.ink/datastructures/mapping",
                        type: "docs",
                        description: "How Mapping and other storage types work in ink!",
                    },
                ],
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════
    // MODULE 4: Peer-to-peer (deep only)
    // ═══════════════════════════════════════════════════════════
    {
        id: "multiplayer",
        title: "Peer-to-peer",
        icon: "🔗",
        lessons: [
            {
                id: "statement-store",
                title: "Messages without a server",
                duration: "~5 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            <strong>Statement Store</strong> is Polkadot's pub/sub messaging layer. Two
                            accounts exchange signed messages via a shared topic — no server coordinating them,
                            no accounts to register, no API keys.
                        </p>
                        <p>
                            For multiplayer RPS: Player A creates a room (a topic), shares a code, and waits.
                            Player B connects to the same topic. Both can read and write signed messages. The
                            room exists only in the network — nobody "owns" it.
                        </p>
                    </>
                ),
                deepDive: (
                    <>
                        <h3>The server as a point of control</h3>
                        <p>
                            Every Discord server, every Slack workspace, every Twitter DM thread is mediated
                            by a platform that can — and does — exercise control. Servers are deplatformed,
                            messages are deleted, accounts are suspended. The platform is the referee, the
                            landlord, and the censor rolled into one.
                        </p>
                        <p>
                            Statement Store is a different model: messages are signed by accounts, routed
                            through a decentralised network of nodes, and can't be censored by any single
                            party. There's no "Statement Store Inc." that can shut down your channel. The
                            tradeoff: messages are ephemeral (not permanently archived like Bulletin data),
                            and the network has throughput limits.
                        </p>
                        <h3>Signed messages as identity</h3>
                        <p>
                            Every message on Statement Store is cryptographically signed by the sender's
                            account. This gives you something centralised messaging doesn't: provable
                            authorship. You can verify, mathematically, that a message came from a specific
                            account — without trusting any platform's authentication system. This is the
                            foundation of the multiplayer game's anti-cheat: both players' moves are signed
                            commitments that can't be forged or repudiated.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand P2P messaging fundamentals",
                        rationale: "Statement Store is one of several P2P messaging approaches. Understanding the trade-offs in the broader landscape helps you choose the right tool.",
                        prompt: `Compare these P2P messaging approaches: Matrix (federated), Nostr (decentralised, signed events), libp2p pubsub, and Polkadot Statement Store. For each: what are the persistence guarantees? Who can censor messages? What's required to participate? How does identity work? Which would you choose for a real-time multiplayer game and why?`,
                    },
                    {
                        type: "explore",
                        title: "Explore signed messages as identity",
                        rationale: "Cryptographic signatures are the foundation of trustless identity — understanding them deeply helps you design better P2P protocols.",
                        prompt: `Explain how cryptographic signatures work in the context of P2P messaging. When I send a signed message on Statement Store, what exactly is signed, with what key, and how does the recipient verify it? What attacks does this prevent (forgery, replay, man-in-the-middle)? What attacks does it NOT prevent that a central server would? Give concrete examples from a multiplayer game context.`,
                    },
                ],
                resources: [
                    {
                        title: "Statement Store — Polkadot docs",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "API reference for StatementStoreClient and ChannelStore",
                    },
                    {
                        title: "Nostr protocol — decentralised social",
                        url: "https://nostr.com/",
                        type: "article",
                        description: "A simple decentralised messaging protocol using cryptographic keys",
                    },
                    {
                        title: "libp2p — P2P networking library",
                        url: "https://libp2p.io/",
                        type: "docs",
                        description: "The networking stack underlying IPFS and many Web3 systems",
                    },
                ],
            },

            {
                id: "commit-reveal",
                title: "Commit-reveal anti-cheat",
                duration: "~8 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            If both players just sent their moves, the second player could always win by reading
                            the first. <strong>Commit-reveal</strong> prevents this: first both players send a
                            hash of their move + a secret salt. Then both reveal. The hash proves the original
                            choice — you can't change your move after committing.
                        </p>
                        <p>
                            This pattern appears in blind auctions, voting systems, and zero-knowledge proofs.
                            It's one of the most useful primitives in cryptographic protocol design.
                        </p>
                    </>
                ),
                diagram: <CommitReveal />,
                code: {
                    filename: "src/pages/MultiplayerGame.tsx",
                    language: "ts",
                    snippet: `// Helper: SHA-256 hash as hex string
async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0")).join("");
}

// Commit phase — send hash(move + salt), keep salt secret
const salt = crypto.randomUUID();
const myCommit = await sha256(\`\${move}:\${salt}\`);
await channel.send({ type: "commit", commit: myCommit });

// Wait for opponent's commit, then reveal both
await channel.send({ type: "reveal", move, salt });

// Verify: opponent's revealed move must match their commit
const expected = await sha256(\`\${opponentMove}:\${opponentSalt}\`);
if (expected !== opponentCommit) throw new Error("Commit mismatch — cheating detected");`,
                },
                deepDive: (
                    <>
                        <h3>Cryptographic commitments — a foundational primitive</h3>
                        <p>
                            A commitment scheme has two phases: <em>commit</em> (bind to a value without
                            revealing it) and <em>reveal</em> (open the commitment). A valid scheme must be{" "}
                            <em>hiding</em> (you can't learn the value from the commitment alone) and{" "}
                            <em>binding</em> (you can't change the value after committing). Hash functions
                            provide both: the hash hides the input, and the collision resistance of SHA-256
                            makes it computationally impossible to find two different inputs that produce the
                            same hash.
                        </p>
                        <p>
                            The <em>salt</em> is crucial. Without it, an attacker could brute-force the
                            commitment: there are only 3 possible moves in RPS, so they'd compute
                            <code>sha256("rock")</code>, <code>sha256("paper")</code>,{" "}
                            <code>sha256("scissors")</code> and match the commit in milliseconds. The salt adds
                            entropy that makes preimage attacks infeasible.
                        </p>
                        <h3>From RPS to ZK proofs</h3>
                        <p>
                            The commit-reveal pattern is a simple special case of zero-knowledge proofs. In a
                            ZK proof, you can prove that you know something (e.g. a valid move) without
                            revealing what it is — and the proof is verifiable by anyone. Commit-reveal
                            requires both parties to eventually reveal; ZK proofs can keep the underlying
                            value permanently secret while still proving its validity. zk-SNARKs and
                            zk-STARKs are the cryptographic primitives behind this, and they're increasingly
                            used in Polkadot's ecosystem.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "understand",
                        title: "Understand commitment schemes",
                        rationale: "Commit-reveal is your introduction to a broader family of cryptographic protocols. Understanding the theory makes the implementation obvious.",
                        prompt: `Explain cryptographic commitment schemes from first principles. What are the two security properties a commitment scheme must have (hiding and binding)? Why is a simple hash like sha256(move) insecure for a two-player game? Why does adding a random salt fix this, and how large does the salt need to be? What's the relationship between commit-reveal schemes and zero-knowledge proofs?`,
                    },
                    {
                        type: "build",
                        title: "Implement the commit-reveal state machine",
                        rationale: "The commit-reveal protocol is a state machine — map out all states and transitions before writing the React code.",
                        prompt: `I'm implementing a commit-reveal multiplayer Rock Paper Scissors game in React. The game has these phases: waiting for opponent → both commit → both reveal → verify → result.

Before writing any code, help me design the state machine:
1. What are all the possible states?
2. What events trigger transitions between states?
3. What data needs to be stored at each state?
4. What can go wrong at each transition (opponent disconnects, timeout, invalid reveal)?

Then write the TypeScript types for the state machine. I want the code to make the state transitions explicit.`,
                    },
                ],
                resources: [
                    {
                        title: "Commitment scheme — Wikipedia",
                        url: "https://en.wikipedia.org/wiki/Commitment_scheme",
                        type: "article",
                        description: "The formal definition and properties of commitment schemes",
                    },
                    {
                        title: "Web Crypto API — MDN",
                        url: "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest",
                        type: "docs",
                        description: "Browser-native SHA-256 via crypto.subtle.digest",
                    },
                    {
                        title: "ZK proofs intro — zk-learning.org",
                        url: "https://zk-learning.org/",
                        type: "video",
                        description: "Free course on zero-knowledge proofs — the more powerful cousin of commit-reveal",
                    },
                ],
            },

            {
                id: "multiplayer-rps",
                title: "Multiplayer RPS",
                duration: "~20 min",
                track: "deep",
                concept: (
                    <>
                        <p>
                            The full multiplayer flow: two accounts, a shared room code (Statement Store topic),
                            commit phase, reveal phase, winner determination. Each player's result is
                            independently saved to their Bulletin profile and the leaderboard contract.
                        </p>
                        <p>
                            The most common multiplayer bug: <strong>stale closures</strong>. React event
                            handlers close over state values at the time they're created — by the time a
                            Statement Store message arrives, that state may have changed. Use{" "}
                            <code>useRef</code> for values that need to be current at message-receive time.
                        </p>
                    </>
                ),
                code: {
                    filename: "src/pages/MultiplayerGame.tsx",
                    language: "ts",
                    snippet: `import { StatementStoreClient, ChannelStore }
  from "@parity/product-sdk-statement-store";

const storeClient = await StatementStoreClient.create({
  signer: signerManager.getSigner(),
  productId: PRODUCT_ID,
});

const channel = new ChannelStore(storeClient, {
  topic1: "rps-multiplayer",
  topic2: roomCode,  // shared between both players
});

// stale closure fix: use ref for values read in subscribe callback
const gameStateRef = useRef(gameState);
useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

channel.subscribe((msg) => {
  const current = gameStateRef.current; // always fresh
  if (msg.type === "commit") handleOpponentCommit(msg, current);
  if (msg.type === "reveal") handleOpponentReveal(msg, current);
});`,
                },
                deepDive: (
                    <>
                        <h3>The two generals problem</h3>
                        <p>
                            When you remove the server, you also remove the arbiter. The "two generals
                            problem" (1975) shows that two parties communicating over an unreliable channel
                            can never be <em>certain</em> the other has received a message. Commit-reveal
                            doesn't solve this — it assumes both players successfully exchange both phases.
                        </p>
                        <p>
                            Real multiplayer games handle this with timeouts: if an opponent doesn't reveal
                            within N seconds after both commits are received, they're considered to have forfeited.
                            The timeout must be enforced locally by both clients — since there's no server
                            referee, both players apply the same rules and (if honest) reach the same
                            conclusion.
                        </p>
                        <h3>Stale closures — a deeper look</h3>
                        <p>
                            React's closure model captures state values at the time a function is created.
                            When you write <code>channel.subscribe((msg) =&gt; {"{"} console.log(gameState) {"}"})</code>,
                            the <code>gameState</code> in the callback is the one from the render cycle when
                            subscribe was called — not the current state when the message arrives. This is the
                            correct behaviour for most React code (predictable, functional), but it creates a
                            subtle bug in long-lived subscriptions. The <code>useRef</code> pattern — keep a
                            ref that mirrors the state, read the ref in callbacks — is the standard fix.
                        </p>
                    </>
                ),
                lab: {
                    title: "Build multiplayer RPS",
                    file: "src/pages/MultiplayerGame.tsx",
                    steps: [
                        <>Install: <code>bun add @parity/product-sdk-statement-store</code></>,
                        <>Create <code>src/pages/MultiplayerGame.tsx</code> with <code>StatementStoreClient</code> and the room code UI.</>,
                        <>Implement the commit-reveal state machine: commit on move pick, reveal after both commits received, verify before resolving.</>,
                        <>Add timeouts: if opponent doesn't reveal within 30 seconds, declare them forfeit.</>,
                        <>Wire the game result to <code>appendGame()</code> and the leaderboard contract update.</>,
                    ],
                    checkpoint: "Two browser tabs with two dev accounts. Play a full game. Both sides see the result. The score appears in the leaderboard.",
                },
                aiTips: [
                    {
                        type: "debug",
                        title: "Fix stale closure bugs in your multiplayer code",
                        rationale: "Stale closures are the #1 bug in React code that uses external subscriptions. Internalise the pattern before it bites you.",
                        prompt: `I'm building a multiplayer game in React that subscribes to real-time messages from Polkadot's Statement Store. I'm seeing stale data in my message handler — when a message arrives, the handler reads old state values even after state has updated.

Explain what a stale closure is in React and why it happens. What's the difference between state and refs in React, and why does using useRef fix the stale closure problem? Show me the pattern using a simple example first (a counter that subscribes to external events), then show how to apply it to my Statement Store subscription. Why is this solution correct and what does it trade off?`,
                    },
                    {
                        type: "build",
                        title: "Design the full multiplayer architecture",
                        rationale: "Multiplayer games are the hardest type of distributed system to get right. Design before you code.",
                        prompt: `I'm building a peer-to-peer multiplayer Rock Paper Scissors game using Polkadot's Statement Store (a pub/sub messaging layer). There's no server — both players communicate directly via a shared channel.

Design the full protocol:
1. How do players find each other? (room codes, QR codes, links?)
2. What messages are exchanged and in what order?
3. How does commit-reveal work in this context?
4. What happens if a player disconnects mid-game?
5. What happens if a player tries to cheat by sending invalid messages?
6. How do both players independently verify the outcome?

Give me a protocol specification (message types, state machine, error handling) before writing any React code.`,
                    },
                ],
                resources: [
                    {
                        title: "product-sdk-statement-store — docs",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "StatementStoreClient and ChannelStore API reference",
                    },
                    {
                        title: "Two Generals Problem — Wikipedia",
                        url: "https://en.wikipedia.org/wiki/Two_generals%27_problem",
                        type: "article",
                        description: "The fundamental impossibility result for distributed consensus",
                    },
                    {
                        title: "React useRef — MDN / React docs",
                        url: "https://react.dev/reference/react/useRef",
                        type: "docs",
                        description: "How useRef prevents stale closure bugs in subscriptions",
                    },
                ],
            },
        ],
    },

    // ═══════════════════════════════════════════════════════════
    // MODULE 5: Ship it
    // ═══════════════════════════════════════════════════════════
    {
        id: "ship",
        title: "Ship it",
        icon: "🌐",
        lessons: [
            {
                id: "deploy-app",
                title: "Deploy your app",
                duration: "~5 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            <code>pg deploy</code> bundles your app and uploads it to the network. Your{" "}
                            <code>.dot</code> domain now points to the new build. Every redeploy to the same
                            domain is instant — no hosting bill, no CDN, no ops.
                        </p>
                        <p>
                            Redeploying to the same domain doesn't earn additional XP — the 100 XP was for
                            your first deploy. But every level you complete makes your app more powerful.
                        </p>
                    </>
                ),
                lab: {
                    title: "Redeploy with your latest changes",
                    file: "terminal",
                    steps: [
                        <>Run <code>pg deploy</code> from your project folder.</>,
                        <>Use the same domain you deployed to before.</>,
                        <>The CLI confirms with a live URL. Your latest features are now live.</>,
                    ],
                    checkpoint: "Open your domain in a browser. Your latest changes — storage, leaderboard, or multiplayer — are live.",
                },
                aiTips: [
                    {
                        type: "build",
                        title: "Optimise your bundle before deploying",
                        rationale: "Smaller bundles load faster, especially on mobile connections. Understand where the bytes are before shipping.",
                        prompt: `I'm about to deploy a React + Vite app to a decentralised network where content is served from nodes that may have variable latency. What bundle optimisations should I consider before deploying? Specifically: how do I analyse what's making my bundle large? What are the most effective optimisations for a Polkadot SDK app (which includes large chain metadata files)? What's an acceptable bundle size for a blockchain app?`,
                    },
                ],
                resources: [
                    {
                        title: "playground CLI — pg deploy flags",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "All deploy options including environment selection",
                    },
                    {
                        title: "Vite build optimisation",
                        url: "https://vite.dev/guide/build",
                        type: "docs",
                        description: "Rollup chunking and build configuration for production",
                    },
                ],
            },

            {
                id: "moddable",
                title: "Make it moddable",
                duration: "~3 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            After deploying, connect a GitHub repo and mark your app as moddable. Anyone can
                            then start from your app — exactly as you started from this one.
                        </p>
                        <p>
                            Every time someone mods your app, you earn <strong>50 XP</strong>. Every star
                            earns you XP too. Open source at a new level: apps people can actually run and
                            build on, not just read.
                        </p>
                    </>
                ),
                deepDive: (
                    <>
                        <h3>The forking social contract</h3>
                        <p>
                            Open source licensing says: here's the code, you can use it under these terms. It's
                            a legal construct that enables copying but doesn't create a community. Moddable
                            apps go further: here's a live, running system you can fork, and the original
                            author benefits materially when you do (XP, visibility, community).
                        </p>
                        <p>
                            This is a new kind of open collaboration. It's closer to how modding communities
                            work in gaming — mods for Skyrim, Minecraft, Stardew Valley have produced work
                            that rivals the original. The difference: those communities are tolerated by
                            companies that could shut them down. The playground registry is a permissionless
                            infrastructure that no company controls.
                        </p>
                    </>
                ),
                lab: {
                    title: "Open your app to the community",
                    steps: [
                        <>After deploying, open playground.dot in a browser.</>,
                        <>Find your app in the registry.</>,
                        <>Click "Make moddable" and connect your GitHub repo.</>,
                    ],
                    checkpoint: "Your app shows a \"Moddable\" badge. Someone else can now mod it and you'll earn XP when they do.",
                },
                aiTips: [
                    {
                        type: "explore",
                        title: "Explore the open-source economics",
                        rationale: "Moddable apps create a new incentive structure for open source. Understanding the economics helps you think about building sustainable projects.",
                        prompt: `Compare these open collaboration models: traditional open source (MIT/GPL licensing), open source with commercial support (HashiCorp, Elastic model), open source with tokenomics (contributor tokens, protocol fees), and Polkadot's moddable app model (XP from mods and stars). What are the incentive structures in each? Which creates the best alignment between creators and contributors? What are the failure modes of each?`,
                    },
                ],
                resources: [
                    {
                        title: "playground.dot — app registry",
                        url: "https://playground.dot/",
                        type: "docs",
                        description: "Browse moddable apps and the live leaderboard",
                    },
                ],
            },

            {
                id: "registry",
                title: "The playground registry",
                duration: "~3 min",
                track: "both",
                concept: (
                    <>
                        <p>
                            The <strong>registry</strong> is the store of all deployed playground apps. Other
                            developers can find your app, star it, and mod it. The leaderboard at the event
                            shows the top builders by XP — it runs on screens throughout the venue.
                        </p>
                        <p>
                            Your first three <em>different</em> deployed apps each earn XP. Stars and mods
                            add more. Check your profile in playground.dot.
                        </p>
                        <p>
                            One last thing: the Summit runs on a special network that gets switched off at the
                            closing ceremony. <strong>Push your code to GitHub before then.</strong> The code
                            is yours to keep even when the network goes dark.
                        </p>
                    </>
                ),
                deepDive: (
                    <>
                        <h3>On-chain reputation</h3>
                        <p>
                            XP, stars, and mods form a reputation system. The interesting question: what does
                            it mean to have on-chain reputation? Traditional reputation systems (GitHub stars,
                            Stack Overflow points, Twitter followers) are centralised — the platform controls
                            the score and can reset, suspend, or manipulate it. An on-chain reputation that
                            lives in a smart contract is controlled by no one: it's a verifiable, portable
                            record that the developer owns.
                        </p>
                        <p>
                            The playground XP system is simple (integer points), but the concept scales.
                            Soulbound tokens, verifiable credentials, and zero-knowledge proofs of reputation
                            are emerging patterns that extend this idea: prove what you've done without
                            revealing who you are, or carry your developer reputation across projects and
                            platforms without a company intermediating it.
                        </p>
                    </>
                ),
                aiTips: [
                    {
                        type: "explore",
                        title: "Explore on-chain reputation systems",
                        rationale: "The playground's XP system is a simple example of a broader design space in web3 identity and reputation.",
                        prompt: `What are "soulbound tokens" in the context of web3 identity? How do they differ from regular NFTs? What problems do they solve (portable reputation, verifiable credentials, sybil resistance)? What's the relationship to zero-knowledge proofs of reputation — can you prove you have certain credentials without revealing which ones? Give me a concrete example of how a developer's Polkadot playground reputation could be used in a future context.`,
                    },
                ],
                resources: [
                    {
                        title: "Polkadot — Proof of Personhood",
                        url: "https://docs.polkadot.com/apps/",
                        type: "docs",
                        description: "Sybil resistance and identity on Polkadot",
                    },
                    {
                        title: "Soulbound tokens — Weyl, Ohlhaver, Buterin (2022)",
                        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763",
                        type: "spec",
                        description: "The original paper proposing soulbound tokens for decentralised identity",
                    },
                ],
            },
        ],
    },
];

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

export function flatLessons(track: "fast" | "deep") {
    return modules.flatMap(m =>
        m.lessons
            .filter(l => track === "deep" || l.track !== "deep")
            .map(l => ({ moduleId: m.id, lessonId: l.id, lesson: l, module: m }))
    );
}

export function findLesson(moduleId: string, lessonId: string) {
    const mod = modules.find(m => m.id === moduleId);
    return mod?.lessons.find(l => l.id === lessonId) ?? null;
}

export function adjacentLessons(moduleId: string, lessonId: string, track: "fast" | "deep") {
    const flat = flatLessons(track);
    const idx = flat.findIndex(e => e.moduleId === moduleId && e.lessonId === lessonId);
    return {
        prev: idx > 0 ? flat[idx - 1] : null,
        next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
    };
}
