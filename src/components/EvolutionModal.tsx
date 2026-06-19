import { useEffect, useRef } from "react";
import EpistemonSVG from "./EpistemonSVG.tsx";
import { deriveTraits, calcStage, STAGE_NAMES } from "../tutorial/epistemon.ts";
import type { EpistemonStage } from "../tutorial/epistemon.ts";
import type { EpistemonData } from "../tutorial/types.ts";

type EvolutionModalProps = {
    data: EpistemonData;
    previousCount: number;
    newCount: number;
    onClose: () => void;
};

function ConfettiPiece({ i }: { i: number }) {
    const colours = ["#ff6b35", "#fbbf24", "#22c55e", "#0984e3", "#6c5ce7", "#fd79a8", "#a29bfe", "#55efc4"];
    const colour = colours[i % colours.length];
    const left = `${(i * 13 + 7) % 100}%`;
    const delay = `${(i * 0.12).toFixed(2)}s`;
    const size = 6 + (i % 4) * 3;
    return (
        <div
            className="confetti-piece"
            style={{
                left,
                background: colour,
                width: size,
                height: size,
                borderRadius: i % 3 === 0 ? "50%" : "2px",
                animationDelay: delay,
            }}
        />
    );
}

export default function EvolutionModal({ data, previousCount, newCount, onClose }: EvolutionModalProps) {
    const traits = deriveTraits(data.traitSeed);
    const prevStage = calcStage(previousCount) as EpistemonStage;
    const newStage = calcStage(newCount) as EpistemonStage;

    const overlayRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        overlayRef.current?.focus();
    }, []);

    return (
        <div
            className="evolution-overlay"
            ref={overlayRef}
            tabIndex={-1}
            onKeyDown={e => e.key === "Escape" && onClose()}
            onClick={e => e.target === overlayRef.current && onClose()}
        >
            <div className="confetti-container">
                {Array.from({ length: 22 }, (_, i) => <ConfettiPiece key={i} i={i} />)}
            </div>

            <div className="evolution-modal">
                <div className="evolution-modal-header">
                    <div className="evolution-modal-title">Your Epistemon evolved!</div>
                    <div className="evolution-modal-subtitle">
                        A new stage of knowledge unlocked
                    </div>
                </div>

                <div className="evolution-modal-stages">
                    <div className="evolution-stage evolution-stage--before">
                        <EpistemonSVG traits={traits} stage={prevStage} size={90} />
                        <span className="evolution-stage-label">{STAGE_NAMES[prevStage]}</span>
                    </div>

                    <div className="evolution-arrow">→</div>

                    <div className="evolution-stage evolution-stage--after">
                        <EpistemonSVG traits={traits} stage={newStage} size={120} />
                        <span className="evolution-stage-label evolution-stage-label--new">
                            ✦ {STAGE_NAMES[newStage]}
                        </span>
                    </div>
                </div>

                <div className="evolution-modal-desc">
                    {newStage === 1 && "Your Epistemon hatched — curiosity takes form."}
                    {newStage === 2 && "The Explorer emerges — you're building real things now."}
                    {newStage === 3 && "An Architect rises — you understand the full stack."}
                    {newStage === 4 && "Enlightened. You've mastered the Polkadot product stack."}
                </div>

                <button className="btn btn-primary" onClick={onClose}>
                    Continue building →
                </button>
            </div>
        </div>
    );
}
