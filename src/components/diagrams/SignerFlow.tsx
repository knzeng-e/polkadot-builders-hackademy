export default function SignerFlow() {
    return (
        <figure className="diagram">
            <figcaption className="diagram-caption">SignerManager — your app never sees private keys</figcaption>
            <svg viewBox="0 0 520 230" className="diagram-svg" aria-label="SignerManager architecture">
                {/* Host */}
                <rect x="10" y="10" width="160" height="70" rx="8" className="d-box d-box--host" />
                <text x="90" y="34" className="d-label">Polkadot Host</text>
                <text x="90" y="52" className="d-label d-label--sub">holds private keys</text>
                <text x="90" y="68" className="d-label d-label--sub">manages accounts</text>

                {/* SignerManager */}
                <rect x="180" y="10" width="160" height="130" rx="8" className="d-box d-box--sdk" />
                <text x="260" y="36" className="d-label">SignerManager</text>

                <rect x="196" y="46" width="128" height="38" rx="6" className="d-box d-box--provider" />
                <text x="260" y="62" className="d-label d-label--sm">HostProvider</text>
                <text x="260" y="78" className="d-label d-label--sub">signed by host</text>

                <rect x="196" y="92" width="128" height="38" rx="6" className="d-box d-box--provider" style={{ opacity: 0.6 }} />
                <text x="260" y="108" className="d-label d-label--sm">DevProvider</text>
                <text x="260" y="124" className="d-label d-label--sub">Alice/Bob locally</text>

                {/* Your App */}
                <rect x="350" y="10" width="160" height="70" rx="8" className="d-box d-box--app" />
                <text x="430" y="34" className="d-label d-label--app">Your App</text>
                <text x="430" y="52" className="d-label d-label--sub">calls getSigner()</text>
                <text x="430" y="68" className="d-label d-label--sub">never sees keys</text>

                {/* Arrows */}
                <line x1="170" y1="45" x2="180" y2="65" className="d-arrow" markerEnd="url(#a3)" />
                <text x="158" y="60" className="d-hint" style={{ fontSize: 9 }}>signs</text>

                <line x1="340" y1="65" x2="350" y2="45" className="d-arrow" markerEnd="url(#a3)" />
                <text x="346" y="60" className="d-hint" style={{ fontSize: 9 }}>account</text>

                {/* Network access note */}
                <rect x="10" y="160" width="500" height="56" rx="8" className="d-box d-box--note" />
                <text x="260" y="182" className="d-label">The host also gates network access</text>
                <text x="260" y="200" className="d-label d-label--sub">Bulletin reads · Asset Hub writes · Statement Store — all routed via the host</text>
                <text x="260" y="216" className="d-label d-label--sub">Your app never opens a direct WebSocket</text>

                <defs>
                    <marker id="a3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                    </marker>
                </defs>
            </svg>
        </figure>
    );
}
