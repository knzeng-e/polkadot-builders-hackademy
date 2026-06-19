export default function ContentAddressed() {
    return (
        <figure className="diagram">
            <figcaption className="diagram-caption">Content-addressed storage — same bytes, same address, forever</figcaption>
            <svg viewBox="0 0 560 180" className="diagram-svg" aria-label="Content-addressed storage flow">
                {/* Data box */}
                <rect x="10" y="60" width="120" height="64" rx="8" className="d-box d-box--data" />
                <text x="70" y="83" className="d-label d-label--sm">Your data</text>
                <text x="70" y="100" className="d-mono">{"{ wins: 5,"}</text>
                <text x="70" y="115" className="d-mono">{"  games: […] }"}</text>

                {/* Arrow 1 */}
                <line x1="130" y1="92" x2="168" y2="92" className="d-arrow" markerEnd="url(#a2)" />

                {/* Hash box */}
                <rect x="170" y="60" width="120" height="64" rx="8" className="d-box d-box--hash" />
                <text x="230" y="83" className="d-label d-label--sm">blake2b hash</text>
                <text x="230" y="100" className="d-label d-label--sub">deterministic</text>
                <text x="230" y="116" className="d-label d-label--sub">same in → same out</text>

                {/* Arrow 2 */}
                <line x1="290" y1="92" x2="328" y2="92" className="d-arrow" markerEnd="url(#a2)" />

                {/* CID box */}
                <rect x="330" y="60" width="120" height="64" rx="8" className="d-box d-box--cid" />
                <text x="390" y="83" className="d-label d-label--sm">CID</text>
                <text x="390" y="100" className="d-mono" style={{ fontSize: 9 }}>bafy…abc123</text>
                <text x="390" y="116" className="d-label d-label--sub">content fingerprint</text>

                {/* Arrow 3 */}
                <line x1="450" y1="92" x2="488" y2="92" className="d-arrow" markerEnd="url(#a2)" />

                {/* Network box */}
                <rect x="490" y="60" width="60" height="64" rx="8" className="d-box d-box--network" />
                <text x="520" y="90" className="d-label d-label--sm">Bulletin</text>
                <text x="520" y="107" className="d-label d-label--sm">Network</text>

                {/* localStorage pointer note */}
                <rect x="170" y="150" width="300" height="24" rx="6" className="d-box d-box--note" />
                <text x="320" y="166" className="d-label d-label--note">localStorage stores only the CID (tiny pointer)</text>

                <line x1="390" y1="124" x2="320" y2="150" className="d-dashed" />

                <defs>
                    <marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                    </marker>
                </defs>
            </svg>
        </figure>
    );
}
