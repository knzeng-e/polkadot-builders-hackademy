import type { EpistemonData } from "./types.ts";

// ─── Trait types ───────────────────────────────────────────────────
export interface EpistemonTraits {
    colorPalette: 0 | 1 | 2 | 3 | 4 | 5;
    bodyType: 0 | 1 | 2 | 3 | 4;
    eyeType: 0 | 1 | 2 | 3 | 4 | 5;
    accessory: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    pattern: 0 | 1 | 2 | 3;
}

export type EpistemonStage = 0 | 1 | 2 | 3 | 4;

// ─── Stage thresholds ──────────────────────────────────────────────
export const STAGE_NAMES = [
    "Dormant Seed",
    "Curious Spark",
    "Explorer",
    "Architect",
    "Enlightened",
] as const;

export const STAGE_THRESHOLDS = [0, 1, 4, 9, 15] as const;

export const PALETTE_NAMES = [
    "Flame", "Bloom", "Wave", "Storm", "Shadow", "Dawn",
] as const;

export function calcStage(completedCount: number): EpistemonStage {
    if (completedCount === 0) return 0;
    if (completedCount <= 3) return 1;
    if (completedCount <= 8) return 2;
    if (completedCount <= 14) return 3;
    return 4;
}

export function nextStageAt(stage: EpistemonStage): number | null {
    if (stage >= 4) return null;
    return STAGE_THRESHOLDS[stage + 1];
}

// ─── Trait derivation ──────────────────────────────────────────────
function djb2(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (((hash << 5) + hash) + str.charCodeAt(i)) >>> 0;
    }
    return hash;
}

export function deriveTraitSeed(address: string, generation: number): number {
    return djb2(`${address}:${generation}`);
}

export function deriveTraits(seed: number): EpistemonTraits {
    return {
        colorPalette: (seed % 6) as EpistemonTraits["colorPalette"],
        bodyType: ((seed >>> 4) % 5) as EpistemonTraits["bodyType"],
        eyeType: ((seed >>> 8) % 6) as EpistemonTraits["eyeType"],
        accessory: ((seed >>> 12) % 8) as EpistemonTraits["accessory"],
        pattern: ((seed >>> 16) % 4) as EpistemonTraits["pattern"],
    };
}

export function epistemonName(data: EpistemonData, completedCount: number): string {
    const stage = calcStage(completedCount);
    const traits = deriveTraits(data.traitSeed);
    const colour = PALETTE_NAMES[traits.colorPalette];
    const stageName = STAGE_NAMES[stage];
    const genSuffix = data.generation > 0 ? ` #${data.generation + 1}` : "";
    return `${colour} ${stageName}${genSuffix}`;
}

export function createEpistemonData(address: string, generation = 0): EpistemonData {
    return { traitSeed: deriveTraitSeed(address, generation), generation };
}
