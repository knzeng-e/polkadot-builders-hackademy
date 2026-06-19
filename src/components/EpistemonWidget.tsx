import EpistemonSVG from "./EpistemonSVG.tsx";
import { deriveTraits, calcStage, epistemonName, STAGE_NAMES, nextStageAt } from "../tutorial/epistemon.ts";
import type { EpistemonData } from "../tutorial/types.ts";

export default function EpistemonWidget({
    data,
    completedCount,
    onClick,
}: {
    data: EpistemonData | undefined;
    completedCount: number;
    onClick?: () => void;
}) {
    if (!data) {
        return (
            <button className="epistemon-widget epistemon-widget--empty" onClick={onClick}>
                <div className="epistemon-widget-egg">🥚</div>
                <div className="epistemon-widget-info">
                    <span className="epistemon-widget-name">Complete a lesson to hatch</span>
                </div>
            </button>
        );
    }

    const traits = deriveTraits(data.traitSeed);
    const stage = calcStage(completedCount);
    const name = epistemonName(data, completedCount);
    const nextAt = nextStageAt(stage);
    const toNext = nextAt !== null ? nextAt - completedCount : 0;

    return (
        <button className="epistemon-widget" onClick={onClick} title={`View your Epistemon: ${name}`}>
            <EpistemonSVG traits={traits} stage={stage} size={48} />
            <div className="epistemon-widget-info">
                <span className="epistemon-widget-name">{name}</span>
                <span className="epistemon-widget-stage">{STAGE_NAMES[stage]}</span>
                {toNext > 0 && (
                    <span className="epistemon-widget-next">+{toNext} to evolve</span>
                )}
            </div>
        </button>
    );
}
