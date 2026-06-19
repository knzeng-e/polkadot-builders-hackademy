export default function PolkadotTriangle() {
    return (
        <figure className="diagram">
            <figcaption className="diagram-caption">The Polkadot Triangle — three host environments, one app</figcaption>
            <svg viewBox="0 0 520 280" className="diagram-svg" aria-label="Polkadot Triangle architecture diagram">
                {/* App at top */}
                <rect x="160" y="12" width="200" height="52" rx="10" className="d-box d-box--app" />
                <text x="260" y="33" className="d-label d-label--app">Your App</text>
                <text x="260" y="52" className="d-label d-label--sub">(.dot domain)</text>

                {/* "runs inside" arrow */}
                <line x1="220" y1="64" x2="140" y2="120" className="d-arrow" markerEnd="url(#arrow)" />
                <line x1="260" y1="64" x2="260" y2="120" className="d-arrow" markerEnd="url(#arrow)" />
                <line x1="300" y1="64" x2="380" y2="120" className="d-arrow" markerEnd="url(#arrow)" />
                <text x="260" y="100" className="d-hint">runs inside</text>

                {/* Three hosts */}
                <rect x="20" y="124" width="150" height="60" rx="10" className="d-box d-box--host" />
                <text x="95" y="148" className="d-label">Polkadot</text>
                <text x="95" y="167" className="d-label">Desktop</text>
                <text x="95" y="183" className="d-label d-label--sub">laptop/workstation</text>

                <rect x="185" y="124" width="150" height="60" rx="10" className="d-box d-box--host" />
                <text x="260" y="148" className="d-label">Polkadot</text>
                <text x="260" y="167" className="d-label">Mobile</text>
                <text x="260" y="183" className="d-label d-label--sub">phone / tablet</text>

                <rect x="350" y="124" width="150" height="60" rx="10" className="d-box d-box--host" />
                <text x="425" y="148" className="d-label">Polkadot</text>
                <text x="425" y="167" className="d-label">Web</text>
                <text x="425" y="183" className="d-label d-label--sub">dot.li browser</text>

                {/* Network layer */}
                <rect x="60" y="220" width="400" height="44" rx="10" className="d-box d-box--network" />
                <text x="260" y="240" className="d-label d-label--network">Polkadot Network</text>
                <text x="260" y="257" className="d-label d-label--sub">Bulletin · Hub · Statement Store · DotNS</text>

                {/* Lines to network */}
                <line x1="95"  y1="184" x2="175" y2="220" className="d-arrow-soft" />
                <line x1="260" y1="184" x2="260" y2="220" className="d-arrow-soft" />
                <line x1="425" y1="184" x2="345" y2="220" className="d-arrow-soft" />

                <defs>
                    <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                    </marker>
                </defs>
            </svg>
        </figure>
    );
}
