import EpistemonSVG from "../components/EpistemonSVG.tsx";
import { deriveTraits, calcStage, epistemonName, STAGE_NAMES, PALETTE_NAMES } from "../tutorial/epistemon.ts";
import type { EpistemonData } from "../tutorial/types.ts";

function EpistemonCard({
    data,
    completedCount,
    isCurrent,
}: {
    data: EpistemonData;
    completedCount: number;
    isCurrent: boolean;
}) {
    const traits = deriveTraits(data.traitSeed);
    const stage = calcStage(completedCount);
    const name = epistemonName(data, completedCount);

    return (
        <div className={`epistemon-card ${isCurrent ? "epistemon-card--current" : ""}`}>
            {isCurrent && <div className="epistemon-card-badge">Active</div>}
            <div className="epistemon-card-svg">
                <EpistemonSVG traits={traits} stage={stage} size={120} />
            </div>
            <div className="epistemon-card-name">{name}</div>
            <div className="epistemon-card-stage">{STAGE_NAMES[stage]}</div>
            <div className="epistemon-card-traits">
                <span className="epistemon-trait">{PALETTE_NAMES[traits.colorPalette]}</span>
                <span className="epistemon-trait">Gen {data.generation + 1}</span>
                <span className="epistemon-trait">{completedCount} lessons</span>
            </div>
        </div>
    );
}

export default function Collection({
    currentData,
    completedCount,
}: {
    currentData: EpistemonData | undefined;
    completedCount: number;
}) {
    if (!currentData) {
        return (
            <div className="collection-empty">
                <div className="collection-empty-egg">🥚</div>
                <h2>No Epistemon yet</h2>
                <p>Complete your first lesson to hatch your first Epistemon.</p>
            </div>
        );
    }

    // In the future this would load all generations from the contract.
    // For now, show the current one.
    const allGenerations: Array<{ data: EpistemonData; count: number }> = [
        { data: currentData, count: completedCount },
    ];

    return (
        <div className="collection-page">
            <div className="collection-header">
                <h1 className="collection-title">Your Epistemon</h1>
                <p className="collection-subtitle">
                    Epistemons evolve as you learn. Each run of the tutorial mints a new generation with unique traits.
                    On-chain ownership via ink! contract unlocks tradability across Polkadot.
                </p>
            </div>

            <div className="collection-grid">
                {allGenerations.map(({ data, count }, i) => (
                    <EpistemonCard
                        key={i}
                        data={data}
                        completedCount={count}
                        isCurrent={i === allGenerations.length - 1}
                    />
                ))}
            </div>

            <div className="collection-contract-note">
                <strong>On-chain ownership:</strong> Deploy the Epistemon ink! contract to register your
                Epistemon on Polkadot Hub — making it a true NFT, tradeable and composable.
                Run <code>pg deploy</code> with the included <code>cdm.json</code>.
            </div>
        </div>
    );
}
