export default function CommitReveal() {
    return (
        <figure className="diagram">
            <figcaption className="diagram-caption">Commit-reveal — fair play without a referee</figcaption>
            <svg viewBox="0 0 540 260" className="diagram-svg" aria-label="Commit-reveal anti-cheat protocol">
                {/* Player columns */}
                <text x="110" y="22" className="d-label d-label--player">Player A</text>
                <text x="430" y="22" className="d-label d-label--player">Player B</text>

                <line x1="110" y1="30" x2="110" y2="255" className="d-timeline" />
                <line x1="430" y1="30" x2="430" y2="255" className="d-timeline" />

                {/* Phase 1: Commit */}
                <rect x="10" y="36" width="200" height="36" rx="6" className="d-box d-box--commit" />
                <text x="110" y="52" className="d-label d-label--sm">picks: rock</text>
                <text x="110" y="68" className="d-label d-label--sub">commit = hash("rock:🔑salt")</text>

                <rect x="330" y="36" width="200" height="36" rx="6" className="d-box d-box--commit" />
                <text x="430" y="52" className="d-label d-label--sm">picks: paper</text>
                <text x="430" y="68" className="d-label d-label--sub">commit = hash("paper:🔑salt")</text>

                <line x1="210" y1="54" x2="330" y2="54" className="d-msg" markerEnd="url(#a4)" />
                <text x="270" y="48" className="d-hint">commit →</text>
                <line x1="330" y1="66" x2="210" y2="66" className="d-msg" markerEnd="url(#a4)" />
                <text x="270" y="78" className="d-hint">← commit</text>

                {/* Phase divider */}
                <text x="270" y="100" className="d-phase-label">Both commits received — safe to reveal</text>
                <line x1="10" y1="106" x2="530" y2="106" className="d-divider" />

                {/* Phase 2: Reveal */}
                <rect x="10" y="114" width="200" height="36" rx="6" className="d-box d-box--reveal" />
                <text x="110" y="130" className="d-label d-label--sm">reveals: rock + 🔑salt</text>

                <rect x="330" y="114" width="200" height="36" rx="6" className="d-box d-box--reveal" />
                <text x="430" y="130" className="d-label d-label--sm">reveals: paper + 🔑salt</text>

                <line x1="210" y1="130" x2="330" y2="130" className="d-msg" markerEnd="url(#a4)" />
                <line x1="330" y1="142" x2="210" y2="142" className="d-msg" markerEnd="url(#a4)" />

                {/* Verification */}
                <text x="270" y="170" className="d-phase-label">Verify: hash(rock:salt) == original commit?</text>
                <line x1="10" y1="176" x2="530" y2="176" className="d-divider" />

                <rect x="100" y="184" width="340" height="52" rx="8" className="d-box d-box--result" />
                <text x="270" y="205" className="d-label" style={{ fill: "#22c55e" }}>paper beats rock — Player B wins</text>
                <text x="270" y="225" className="d-label d-label--sub">Neither player could cheat — the hash locked the choice in</text>

                <defs>
                    <marker id="a4" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#a5b4fc" />
                    </marker>
                </defs>
            </svg>
        </figure>
    );
}
