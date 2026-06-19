import { useId } from "react";
import type { EpistemonTraits, EpistemonStage } from "../tutorial/epistemon.ts";

// ─── Colour palettes ───────────────────────────────────────────────
const PALETTES = [
    { name: "Flame",  primary: "#ff6b35", secondary: "#ff9f43", glow: "rgba(255,107,53,0.35)",  text: "#fff3cd" },
    { name: "Bloom",  primary: "#fd79a8", secondary: "#fdcb6e", glow: "rgba(253,121,168,0.35)", text: "#fff0f6" },
    { name: "Wave",   primary: "#00b894", secondary: "#55efc4", glow: "rgba(0,184,148,0.35)",   text: "#e8fff9" },
    { name: "Storm",  primary: "#6c5ce7", secondary: "#a29bfe", glow: "rgba(108,92,231,0.35)",  text: "#f0eeff" },
    { name: "Shadow", primary: "#636e72", secondary: "#b2bec3", glow: "rgba(99,110,114,0.35)",  text: "#f0f0f0" },
    { name: "Dawn",   primary: "#0984e3", secondary: "#74b9ff", glow: "rgba(9,132,227,0.35)",   text: "#e8f4ff" },
] as const;

// ─── Body shape paths (centered at 50,55 r=24) ────────────────────
function BodyPolygon({ bodyType, fill, id }: { bodyType: number; fill: string; id: string }) {
    const cx = 50, cy = 55, r = 24;
    switch (bodyType) {
        case 1: { // hexagon
            const pts = Array.from({ length: 6 }, (_, i) => {
                const a = (i * 60 - 30) * Math.PI / 180;
                return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
            }).join(" ");
            return <polygon points={pts} fill={fill} />;
        }
        case 2: { // soft star
            const pts = Array.from({ length: 10 }, (_, i) => {
                const a = (i * 36 - 90) * Math.PI / 180;
                const rr = i % 2 === 0 ? r : r * 0.62;
                return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
            }).join(" ");
            return <polygon points={pts} fill={fill} />;
        }
        case 3: { // diamond
            const pts = `${cx},${cy - r} ${cx + r * 0.85},${cy} ${cx},${cy + r} ${cx - r * 0.85},${cy}`;
            return <polygon points={pts} fill={fill} />;
        }
        case 4: { // cloud
            return (
                <g>
                    <circle cx={cx} cy={cy + 4} r={18} fill={fill} />
                    <circle cx={cx - 12} cy={cy + 2} r={13} fill={fill} />
                    <circle cx={cx + 12} cy={cy + 2} r={13} fill={fill} />
                    <circle cx={cx - 6}  cy={cy - 8} r={12} fill={fill} />
                    <circle cx={cx + 6}  cy={cy - 8} r={12} fill={fill} />
                </g>
            );
        }
        default: // round
            return <circle cx={cx} cy={cy} r={r} fill={fill} id={id} />;
    }
}

// ─── Eyes ─────────────────────────────────────────────────────────
function EyePair({ eyeType, color }: { eyeType: number; color: string }) {
    const positions = [{ x: 43, y: 51 }, { x: 57, y: 51 }];
    return (
        <g>
            {positions.map(({ x, y }, i) => {
                switch (eyeType) {
                    case 0: return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />;
                    case 1: { // stars
                        const pts = Array.from({ length: 10 }, (_, j) => {
                            const a = (j * 36 - 90) * Math.PI / 180;
                            const r = j % 2 === 0 ? 3 : 1.5;
                            return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
                        }).join(" ");
                        return <polygon key={i} points={pts} fill={color} />;
                    }
                    case 2: return <g key={i}><circle cx={x} cy={y} r={3} fill={color} /><circle cx={x} cy={y} r={1.4} fill="rgba(0,0,0,0.5)" /></g>;
                    case 3: { // diamond
                        const pts = `${x},${y - 3} ${x + 2.5},${y} ${x},${y + 3} ${x - 2.5},${y}`;
                        return <polygon key={i} points={pts} fill={color} />;
                    }
                    case 4: // crescent
                        return <g key={i}><circle cx={x} cy={y} r={3} fill={color} /><circle cx={x + 1.2} cy={y} r={2.2} fill="#0a0a1a" /></g>;
                    case 5: // spiral dots
                        return (
                            <g key={i}>
                                <circle cx={x} cy={y} r={1.5} fill={color} />
                                <circle cx={x + 2} cy={y - 1} r={1} fill={color} opacity="0.7" />
                                <circle cx={x - 2} cy={y + 1} r={0.7} fill={color} opacity="0.5" />
                            </g>
                        );
                    default: return <circle key={i} cx={x} cy={y} r={2.5} fill={color} />;
                }
            })}
        </g>
    );
}

// ─── Accessories ──────────────────────────────────────────────────
function Accessory({ accessory, primary, secondary }: { accessory: number; primary: string; secondary: string }) {
    switch (accessory) {
        case 0: return null;
        case 1: // wrench (top-right)
            return (
                <g transform="translate(68,28) rotate(-35)">
                    <rect x="-1.5" y="-8" width="3" height="12" rx="1.5" fill={secondary} />
                    <circle cx="0" cy="-8" r="3.5" fill="none" stroke={secondary} strokeWidth="2" />
                    <circle cx="0" cy="4" r="3.5" fill="none" stroke={secondary} strokeWidth="2" />
                </g>
            );
        case 2: // code brackets
            return (
                <g fill="none" stroke={secondary} strokeWidth="1.5" strokeLinecap="round">
                    <path d="M 36 27 L 33 31 L 36 35" />
                    <path d="M 64 27 L 67 31 L 64 35" />
                </g>
            );
        case 3: { // star badge on body
            const pts = Array.from({ length: 10 }, (_, i) => {
                const a = (i * 36 - 90) * Math.PI / 180;
                const r = i % 2 === 0 ? 5 : 2.5;
                return `${(66 + r * Math.cos(a)).toFixed(1)},${(44 + r * Math.sin(a)).toFixed(1)}`;
            }).join(" ");
            return <polygon points={pts} fill={secondary} />;
        }
        case 4: // scroll/book (left)
            return (
                <g>
                    <rect x="21" y="44" width="10" height="13" rx="1" fill={secondary} opacity="0.9" />
                    <line x1="23" y1="48" x2="29" y2="48" stroke="#0a0a1a" strokeWidth="1" />
                    <line x1="23" y1="51" x2="29" y2="51" stroke="#0a0a1a" strokeWidth="1" />
                    <line x1="23" y1="54" x2="29" y2="54" stroke="#0a0a1a" strokeWidth="1" />
                </g>
            );
        case 5: // circuit dots
            return (
                <g fill={secondary} opacity="0.7">
                    <circle cx="30" cy="35" r="1.5" />
                    <circle cx="36" cy="30" r="1.5" />
                    <circle cx="64" cy="35" r="1.5" />
                    <circle cx="70" cy="30" r="1.5" />
                    <line x1="31.5" y1="35" x2="36" y2="31.5" stroke={secondary} strokeWidth="0.8" opacity="0.7" />
                    <line x1="64" y1="33.5" x2="68.5" y2="30" stroke={secondary} strokeWidth="0.8" opacity="0.7" />
                </g>
            );
        case 6: // lightning bolt (above head)
            return (
                <polygon
                    points="48,24 45,32 49,32 47,40 54,28 50,28 52,24"
                    fill={secondary}
                    opacity="0.9"
                />
            );
        case 7: // infinity (below)
            return (
                <g fill="none" stroke={secondary} strokeWidth="1.5" opacity="0.8">
                    <path d="M 42 82 Q 39 78 42 74 Q 48 70 50 74 Q 52 78 50 74 Q 52 70 58 74 Q 61 78 58 82 Q 52 86 50 82 Q 48 86 42 82" />
                </g>
            );
        default: return null;
    }
}

// ─── Pattern overlay ──────────────────────────────────────────────
function PatternOverlay({ pattern, glow }: { pattern: number; glow: string }) {
    switch (pattern) {
        case 0: return null;
        case 1: // spots
            return (
                <g opacity="0.25">
                    <circle cx="45" cy="50" r="4" fill="white" />
                    <circle cx="56" cy="58" r="3" fill="white" />
                    <circle cx="48" cy="62" r="2.5" fill="white" />
                </g>
            );
        case 2: // stripes
            return (
                <g opacity="0.15" clipPath="url(#body-clip)">
                    <line x1="26" y1="40" x2="74" y2="70" stroke="white" strokeWidth="5" />
                    <line x1="26" y1="50" x2="74" y2="80" stroke="white" strokeWidth="5" />
                    <line x1="26" y1="30" x2="74" y2="60" stroke="white" strokeWidth="5" />
                </g>
            );
        case 3: // inner circle
            return <circle cx="50" cy="55" r="10" fill={glow} />;
        default: return null;
    }
}

// ─── Crown ────────────────────────────────────────────────────────
function Crown({ color }: { color: string }) {
    return (
        <g>
            <polygon points="38,30 38,22 43,27 50,20 57,27 62,22 62,30" fill={color} />
            <circle cx="50" cy="19" r="2.5" fill="white" opacity="0.9" />
            <circle cx="40" cy="23" r="1.5" fill="white" opacity="0.7" />
            <circle cx="60" cy="23" r="1.5" fill="white" opacity="0.7" />
        </g>
    );
}

// ─── Sparkles ─────────────────────────────────────────────────────
function Sparkles({ color }: { color: string }) {
    const positions = [
        { x: 22, y: 35 }, { x: 78, y: 35 }, { x: 18, y: 58 }, { x: 82, y: 58 },
        { x: 28, y: 78 }, { x: 72, y: 78 }, { x: 50, y: 16 },
    ];
    return (
        <g>
            {positions.map(({ x, y }, i) => (
                <g key={i} transform={`translate(${x},${y})`} opacity={0.6 + (i % 3) * 0.13}>
                    <line x1="-3" y1="0" x2="3" y2="0" stroke={color} strokeWidth="1.2" />
                    <line x1="0" y1="-3" x2="0" y2="3" stroke={color} strokeWidth="1.2" />
                    <line x1="-2" y1="-2" x2="2" y2="2" stroke={color} strokeWidth="0.8" />
                    <line x1="2" y1="-2" x2="-2" y2="2" stroke={color} strokeWidth="0.8" />
                </g>
            ))}
        </g>
    );
}

// ─── Main component ───────────────────────────────────────────────
export default function EpistemonSVG({
    traits,
    stage,
    size = 100,
}: {
    traits: EpistemonTraits;
    stage: EpistemonStage;
    size?: number;
}) {
    const uid = useId().replace(/:/g, "");
    const pal = PALETTES[traits.colorPalette];
    const gradId = `ep-grad-${uid}`;
    const glowId = `ep-glow-${uid}`;

    // Glow radius grows with stage
    const glowR = [0, 28, 34, 40, 48][stage];

    return (
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
            <defs>
                <radialGradient id={gradId} cx="38%" cy="32%" r="68%">
                    <stop offset="0%" stopColor={pal.secondary} />
                    <stop offset="100%" stopColor={pal.primary} />
                </radialGradient>
                <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {stage >= 4 && (
                    <linearGradient id={`rainbow-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#ff6b35" />
                        <stop offset="20%"  stopColor="#fbbf24" />
                        <stop offset="40%"  stopColor="#22c55e" />
                        <stop offset="60%"  stopColor="#0984e3" />
                        <stop offset="80%"  stopColor="#6c5ce7" />
                        <stop offset="100%" stopColor="#fd79a8" />
                    </linearGradient>
                )}
            </defs>

            {/* Outer glow ring */}
            {stage > 0 && (
                <circle cx="50" cy="55" r={glowR} fill={pal.glow} />
            )}

            {/* Architect+ decorative ring */}
            {stage >= 3 && (
                <circle cx="50" cy="55" r={glowR - 4}
                    fill="none" stroke={pal.secondary} strokeWidth="1" opacity="0.4"
                    strokeDasharray="4 3"
                />
            )}

            {/* Legend rainbow border */}
            {stage >= 4 && (
                <circle cx="50" cy="55" r={28}
                    fill="none"
                    stroke={`url(#rainbow-${uid})`}
                    strokeWidth="3"
                    opacity="0.75"
                />
            )}

            {/* ── Stage 0: Egg ── */}
            {stage === 0 && (
                <g filter={`url(#${glowId})`}>
                    <ellipse cx="50" cy="55" rx="22" ry="28"
                        fill={`url(#${gradId})`} />
                    <ellipse cx="50" cy="55" rx="22" ry="28"
                        fill="none" stroke={pal.secondary} strokeWidth="1" opacity="0.4" />
                    <circle cx="50" cy="55" r="7" fill={pal.secondary} opacity="0.55" />
                    <circle cx="50" cy="55" r="3" fill="white" opacity="0.4" />
                    {/* Hint of life */}
                    <circle cx="43" cy="50" r="1.2" fill={pal.secondary} opacity="0.6" />
                    <circle cx="57" cy="50" r="1.2" fill={pal.secondary} opacity="0.6" />
                </g>
            )}

            {/* ── Stages 1–4: Creature ── */}
            {stage >= 1 && (
                <g filter={stage >= 3 ? `url(#${glowId})` : undefined}>
                    {/* Pattern overlay clip */}
                    <clipPath id={`body-clip-${uid}`}>
                        <circle cx="50" cy="55" r="24" />
                    </clipPath>

                    {/* Body */}
                    <g clipPath={stage >= 2 ? undefined : undefined}>
                        <BodyPolygon
                            bodyType={stage >= 2 ? traits.bodyType : 0}
                            fill={`url(#${gradId})`}
                            id={`body-${uid}`}
                        />
                    </g>

                    {/* Inner glow */}
                    <circle cx="50" cy="55" r="14" fill={pal.secondary} opacity="0.2" />

                    {/* Pattern (stage 2+) */}
                    {stage >= 2 && (
                        <PatternOverlay pattern={traits.pattern} glow={pal.glow} />
                    )}

                    {/* Eyes */}
                    <EyePair eyeType={traits.eyeType} color="white" />
                    {/* Eye shine */}
                    <circle cx="44.5" cy="50" r="0.8" fill="white" opacity="0.7" />
                    <circle cx="58.5" cy="50" r="0.8" fill="white" opacity="0.7" />

                    {/* Antenna (stages 1-2) */}
                    {stage <= 2 && (
                        <g>
                            <line x1="46" y1="32" x2="43" y2="24" stroke={pal.secondary} strokeWidth="1.2" />
                            <circle cx="43" cy="23" r="2" fill={pal.secondary} />
                            <line x1="54" y1="32" x2="57" y2="24" stroke={pal.secondary} strokeWidth="1.2" />
                            <circle cx="57" cy="23" r="2" fill={pal.secondary} />
                        </g>
                    )}

                    {/* Accessory (stage 2+) */}
                    {stage >= 2 && (
                        <Accessory
                            accessory={traits.accessory}
                            primary={pal.primary}
                            secondary={pal.secondary}
                        />
                    )}

                    {/* Crown (stage 4) */}
                    {stage >= 4 && <Crown color={pal.secondary} />}

                    {/* Sparkles (stage 4) */}
                    {stage >= 4 && <Sparkles color={pal.secondary} />}

                    {/* Architect: extra concentric aura rings */}
                    {stage >= 3 && (
                        <g opacity="0.15">
                            <circle cx="50" cy="55" r="38" fill="none" stroke={pal.primary} strokeWidth="1.5" />
                            <circle cx="50" cy="55" r="44" fill="none" stroke={pal.primary} strokeWidth="1" />
                        </g>
                    )}
                </g>
            )}
        </svg>
    );
}
