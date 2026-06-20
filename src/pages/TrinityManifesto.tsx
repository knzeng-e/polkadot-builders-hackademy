import "./TrinityManifesto.css";

const GOALS = [
    "No logins",
    "No install to start using",
    "Comfortable, familiar interfaces",
    "Coherence across devices",
    "No crypto identifiers",
    "No exposure to multiple selves",
    "Mathematically guaranteed privacy and security",
] as const;

const SUPERPOWERS = [
    {
        name: "Celerity",
        label: "private interactions",
        promise: "Peer-to-peer calls, presence, notifications, and coordination without a signaling server sitting between people.",
    },
    {
        name: "Levity",
        label: "censorship-resistant storage",
        promise: "Content-addressed data that can be retrieved without asking a central server to remember you.",
    },
    {
        name: "Humanity",
        label: "verified human presence",
        promise: "One person, one account, with privacy-preserving proof instead of invasive biometrics or platform identity.",
    },
] as const;

const BUILD_PATH = [
    "Start with a product people already understand.",
    "Remove the login before adding another feature.",
    "Move the state out of your private server and into verifiable infrastructure.",
    "Give users continuity across app, web, and desktop without exposing their private keys.",
    "Ask whether each component increases agency or quietly rebuilds the old cage.",
] as const;

export default function TrinityManifesto({
    onStartFast,
    onStartDeep,
}: {
    onStartFast: () => void;
    onStartDeep: () => void;
}) {
    return (
        <main className="trinity-page">
            <section className="trinity-hero">
                <div className="trinity-eyebrow">Under the hood · Polkadot Trinity</div>
                <h1>
                    Wake up, <span>Neo.</span>
                </h1>
                <p className="trinity-lede">
                    You were told Web3 begins with wallets, addresses, seed phrases, RPC endpoints,
                    backend glue, and long explanations. That was not Web3. That was the scaffolding
                    still visible around an unfinished cathedral.
                </p>
                <p>
                    Trinity is the attempt to make that scaffolding disappear: one interface for every
                    product surface, connecting applications to chain, storage, signing, messaging, and
                    verified humanity without forcing users to become infrastructure engineers before
                    they can act.
                </p>
                <div className="trinity-cta-row">
                    <button className="btn btn-primary" onClick={onStartFast}>Build first ⚡</button>
                    <button className="btn btn-ghost" onClick={onStartDeep}>Study the stack 🔬</button>
                </div>
            </section>

            <section className="trinity-grid trinity-grid--diagram" aria-label="Trinity architecture diagram">
                <div className="trinity-card trinity-card--wide">
                    <div className="trinity-card-kicker">Mental model</div>
                    <h2>One interface — every product, every surface.</h2>
                    <p>
                        Polkadot App, Polkadot Web, and Polkadot Desktop should feel like different
                        doors into the same house. Trinity is the hallway: the API layer that lets product
                        developers call one surface while the hard work of chain access, storage, and
                        signing happens beneath their feet.
                    </p>
                    <div className="trinity-map">
                        <div className="trinity-map-col">
                            <span>Polkadot App</span>
                            <span>Polkadot Web</span>
                            <span>Polkadot Desktop</span>
                        </div>
                        <div className="trinity-map-center">Trinity</div>
                        <div className="trinity-map-col">
                            <span>chain</span>
                            <span>storage</span>
                            <span>signing</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="trinity-section">
                <div className="trinity-eyebrow">The real problem</div>
                <h2>Web2 solved scale by centralising agency.</h2>
                <p>
                    Web2 became comfortable because the server did everything. It remembered your account,
                    carried your messages, stored your files, ranked your relationships, and decided what
                    you were allowed to see. The interface became smooth because the power became hidden.
                </p>
                <p>
                    Trinity asks a sharper question: can Web3 keep the comfort while removing the invisible
                    landlord? Can we give people applications that are familiar, coherent, and usable —
                    while no single company owns the switch?
                </p>
            </section>

            <section className="trinity-section">
                <div className="trinity-eyebrow">The product promise</div>
                <h2>Web3 should not smell like infrastructure.</h2>
                <div className="trinity-goals">
                    {GOALS.map(goal => (
                        <span key={goal}>{goal}</span>
                    ))}
                </div>
                <p>
                    These are not UX decorations. They are philosophical constraints translated into product
                    requirements. No login means identity is not rented from a platform. No crypto identifiers
                    means the user is not reduced to a public address. No exposure to multiple selves means
                    privacy does not have to fracture the person.
                </p>
            </section>

            <section className="trinity-section">
                <div className="trinity-eyebrow">Three superpowers</div>
                <h2>The server does not get decentralised. It disappears.</h2>
                <div className="trinity-superpowers">
                    {SUPERPOWERS.map(power => (
                        <article className="trinity-power" key={power.name}>
                            <div className="trinity-power-name">{power.name}</div>
                            <div className="trinity-power-label">{power.label}</div>
                            <p>{power.promise}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="trinity-section trinity-speech">
                <div className="trinity-eyebrow">Tuto-manifesto</div>
                <h2>I am Trinity.</h2>
                <p>
                    Not a wallet. Not a chain. Not another dashboard with glowing buttons and poor excuses.
                    I am the layer that lets the application speak Web3 without making the human carry the
                    weight of Web3.
                </p>
                <p>
                    I carry messages without a server. I preserve memory without a cloud. I let software
                    verify humanity without turning the body into a password. I let builders ship products
                    that feel ordinary, while their guarantees are anything but ordinary.
                </p>
                <p>
                    The Matrix was never the machine. The Matrix was dependence disguised as convenience.
                    Every login was a leash. Every central server, a silent throne. Every platform identity,
                    a borrowed mask.
                </p>
                <p>
                    Wake up, Neo. Do not build better prisons. Build applications whose architecture makes
                    the prison unnecessary.
                </p>
            </section>

            <section className="trinity-section">
                <div className="trinity-eyebrow">Builder path</div>
                <h2>How to build in the spirit of Trinity.</h2>
                <ol className="trinity-path">
                    {BUILD_PATH.map(step => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </section>

            <section className="trinity-section trinity-note">
                <div className="trinity-eyebrow">Reality check</div>
                <h2>Prototype energy. Production discipline.</h2>
                <p>
                    This page treats Trinity as an emerging product direction, not as a finished sacred tablet.
                    Some public repositories show the adjacent pieces already taking shape: product apps,
                    Bulletin-backed deployments, pallet-revive contracts, light-client thinking, and forkable
                    static applications. The work now is to turn the philosophy into habits: threat models,
                    tests, recovery paths, accessibility, and boring reliability. Freedom that crashes is still
                    a cage with better branding.
                </p>
                <div className="trinity-links">
                    <a href="https://github.com/paritytech/t3rminal" target="_blank" rel="noreferrer">T3RMINAL proof of concept</a>
                    <a href="https://github.com/paritytech/smoldot-archive" target="_blank" rel="noreferrer">smoldot light client</a>
                    <a href="https://github.com/paritytech/product-sdk" target="_blank" rel="noreferrer">Product SDK / Hackademy source</a>
                </div>
            </section>
        </main>
    );
}
