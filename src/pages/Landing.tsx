import type React from "react";
import { flatLessons } from "../tutorial/curriculum.tsx";
import EpistemonSVG from "../components/EpistemonSVG.tsx";
import { deriveTraits } from "../tutorial/epistemon.ts";

// Fixed hero Epistemon — always an egg (stage 0), deterministic traits
const HERO_TRAITS = deriveTraits(42007);

const PILLARS = [
    {
        icon: "⚡",
        title: "Ship live apps",
        body: "Every level ends with a real deploy to a permanent .dot address you own. No staging environments, no mock deployments. Your first deploy earns 100 XP on the Summit leaderboard.",
        accent: "#ff6b35",
    },
    {
        icon: "🧠",
        title: "Understand the why",
        body: "Optional deep dives into philosophy, web3 stakes, and the principles behind every technology. Nick Szabo. The DAO. Content-addressed permanence. Because builders who understand what they're shipping, ship better.",
        accent: "#6c5ce7",
    },
    {
        icon: "🤖",
        title: "AI as tutor, not ghostwriter",
        body: "Structured AI prompts in every lesson — designed to deepen understanding before touching code. Understand, then build. Not vibe coding.",
        accent: "#00b894",
    },
] as const;

const LEVELS = [
    {
        num: "01",
        icon: "🎨",
        title: "Mod it",
        body: "Customise design and logic. Make it yours.",
        tags: ["CSS variables", "TypeScript", "pg deploy"],
    },
    {
        num: "02",
        icon: "🗄️",
        title: "Store it",
        body: "Game results saved permanently — no server, no database.",
        tags: ["Bulletin Chain", "CloudStorageClient", "CIDs"],
    },
    {
        num: "03",
        icon: "📜",
        title: "Contract it",
        body: "Deploy a shared leaderboard as a smart contract on Polkadot Hub.",
        tags: ["ink! Rust", "Polkadot Hub", "ContractManager"],
    },
    {
        num: "04",
        icon: "🔗",
        title: "Play it",
        body: "Challenge another player. No server coordinating it.",
        tags: ["Statement Store", "Commit-reveal", "P2P"],
    },
] as const;

const EXTRAS = [
    {
        icon: "🐣",
        title: "Epistemon NFT",
        body: "An on-chain builder entity that evolves through 5 stages as you learn — from dormant egg to Enlightened. Unique generative traits per address. Real ink! contract on Polkadot Hub.",
    },
    {
        icon: "💬",
        title: "Community knowledge",
        body: "Tips, questions, corrections — stored permanently on Bulletin Chain under every lesson. Peer learning baked into the platform, not bolted on.",
    },
    {
        icon: "🔀",
        title: "This tutorial is moddable",
        body: "Fork it, change the curriculum, add modules, deploy your version. Every mod earns you XP. Open source at a new level — not just code you can read, but a product you can build on.",
    },
] as const;

export default function Landing({
    onStart,
    onResume,
    lastLesson,
}: {
    onStart: (track: "fast" | "deep") => void;
    onResume?: () => void;
    lastLesson?: string;
}) {
    const fastCount = flatLessons("fast").length;
    const deepCount = flatLessons("deep").length;

    return (
        <div className="lp">

            {/* ── Hero ── */}
            <section className="lp-hero">
                <div className="lp-event-badge">
                    <span className="lp-event-dot" />
                    Web3 Summit · Berlin · June 2026
                </div>

                <div className="lp-hero-grid">
                    <div className="lp-hero-text">
                        <h1 className="lp-title">
                            Build on Polkadot.<br />
                            <span className="lp-title-accent">For real.</span>
                        </h1>
                        <p className="lp-subtitle">
                            Not exercises. Not demos. A hands-on journey where every level ships
                            a live app to a permanent <code>.dot</code> address you own — from
                            your first mod to smart contracts and peer-to-peer multiplayer.
                        </p>
                        <div className="lp-pills">
                            <span className="lp-pill lp-pill--orange">⚡ 15 min to first deploy</span>
                            <span className="lp-pill lp-pill--purple">🧠 Philosophy + mechanics</span>
                            <span className="lp-pill lp-pill--green">🤖 AI prompts in every lesson</span>
                        </div>
                        <div className="lp-hero-ctas">
                            <button className="btn btn-primary lp-cta-primary" onClick={() => onStart("fast")}>
                                Start fast track ⚡
                            </button>
                            <button className="btn btn-ghost lp-cta-secondary" onClick={() => onStart("deep")}>
                                Deep dive 🔬
                            </button>
                        </div>
                        {onResume && lastLesson && (
                            <button className="lp-resume-btn" onClick={onResume}>
                                ↩ Continue where you left off
                            </button>
                        )}
                    </div>

                    <div className="lp-hero-visual">
                        <div className="lp-epistemon-orbit">
                            <div className="lp-orbit-ring lp-orbit-ring--1" />
                            <div className="lp-orbit-ring lp-orbit-ring--2" />
                            <div className="lp-orbit-ring lp-orbit-ring--3" />
                            <div className="lp-epistemon-center">
                                <EpistemonSVG traits={HERO_TRAITS} stage={0} size={120} />
                            </div>
                        </div>
                        <div className="lp-epistemon-caption">
                            Your Epistemon awaits — complete lessons to evolve it
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Three pillars ── */}
            <section className="lp-pillars">
                {PILLARS.map((p, i) => (
                    <div
                        key={i}
                        className="lp-pillar"
                        style={{ "--pillar-accent": p.accent } as React.CSSProperties}
                    >
                        <div className="lp-pillar-icon">{p.icon}</div>
                        <div className="lp-pillar-title">{p.title}</div>
                        <div className="lp-pillar-body">{p.body}</div>
                    </div>
                ))}
            </section>

            {/* ── Build journey ── */}
            <section className="lp-journey">
                <div className="lp-section-eyebrow">The build journey</div>
                <div className="lp-levels">
                    {LEVELS.map((lvl, i) => (
                        <div key={i} className="lp-level">
                            <div className="lp-level-header">
                                <span className="lp-level-num">{lvl.num}</span>
                                <span className="lp-level-icon">{lvl.icon}</span>
                            </div>
                            <div className="lp-level-title">{lvl.title}</div>
                            <div className="lp-level-body">{lvl.body}</div>
                            <div className="lp-level-tags">
                                {lvl.tags.map((t, j) => (
                                    <span key={j} className="lp-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Track selector ── */}
            <section className="lp-tracks">
                <div className="lp-section-eyebrow">Pick your track</div>
                <div className="lp-track-cards">
                    <div className="lp-track-card lp-track-fast" onClick={() => onStart("fast")}>
                        <div className="lp-track-top">
                            <span className="lp-track-icon">⚡</span>
                            <div>
                                <div className="lp-track-name">Fast track</div>
                                <div className="lp-track-time">~15–30 min · {fastCount} lessons</div>
                            </div>
                        </div>
                        <ul className="lp-track-list">
                            <li>Mod the app, save to the network, deploy live</li>
                            <li>Earn <strong>100 XP</strong> on your first deploy</li>
                            <li>Get on the Summit leaderboard fast</li>
                        </ul>
                        <button
                            className="btn btn-primary btn-full"
                            onClick={e => { e.stopPropagation(); onStart("fast"); }}
                        >
                            Start fast track →
                        </button>
                    </div>

                    <div className="lp-track-card lp-track-deep" onClick={() => onStart("deep")}>
                        <div className="lp-track-top">
                            <span className="lp-track-icon">🔬</span>
                            <div>
                                <div className="lp-track-name">Deep dive</div>
                                <div className="lp-track-time">~60–90 min · {deepCount} lessons</div>
                            </div>
                        </div>
                        <ul className="lp-track-list">
                            <li>Full stack — accounts, storage, contracts, P2P</li>
                            <li>Philosophy + web3 stakes in every lesson</li>
                            <li>Structured AI prompts to deepen understanding</li>
                        </ul>
                        <button
                            className="btn btn-ghost btn-full"
                            onClick={e => { e.stopPropagation(); onStart("deep"); }}
                        >
                            Start deep dive →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Platform extras ── */}
            <section className="lp-extras">
                {EXTRAS.map((e, i) => (
                    <div key={i} className="lp-extra">
                        <div className="lp-extra-icon">{e.icon}</div>
                        <div className="lp-extra-title">{e.title}</div>
                        <div className="lp-extra-body">{e.body}</div>
                    </div>
                ))}
            </section>

            {/* ── Event note ── */}
            <div className="lp-event-note">
                <strong>Closing ceremony note:</strong> The Summit network switches off at the end
                of the event. Push your code to GitHub before then — your code persists, the
                network data doesn't.
            </div>
        </div>
    );
}
