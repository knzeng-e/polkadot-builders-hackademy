import { getStorageClient } from "../utils.ts";
import type { TutorialProgress } from "./types.ts";
import { createEpistemonData } from "./epistemon.ts";

const PROGRESS_KEY = (addr: string) => `tutorial-progress:${addr}`;

export async function loadProgress(address: string): Promise<TutorialProgress | null> {
    try {
        const cid = localStorage.getItem(PROGRESS_KEY(address));
        if (cid) {
            const client = await getStorageClient();
            const bytes = await client.fetchBytes(cid);
            return JSON.parse(new TextDecoder().decode(bytes)) as TutorialProgress;
        }
    } catch { /* fall through */ }
    return null;
}

export async function saveProgress(address: string, progress: TutorialProgress): Promise<void> {
    const bytes = new TextEncoder().encode(JSON.stringify(progress));
    const client = await getStorageClient();
    const result = await client.store(bytes).send();
    if (!result.cid) throw new Error("upload returned no CID");
    localStorage.setItem(PROGRESS_KEY(address), result.cid.toString());
}

export function defaultProgress(track: "fast" | "deep" = "fast"): TutorialProgress {
    return { track, completedLessons: [], lastLesson: "", startedAt: Date.now() };
}

export function markLessonComplete(
    progress: TutorialProgress,
    lessonId: string,
    address?: string,
): TutorialProgress {
    if (progress.completedLessons.includes(lessonId)) return progress;
    const next: TutorialProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId],
        lastLesson: lessonId,
    };
    // Hatch Epistemon on first lesson completion
    if (!next.epistemon && address) {
        next.epistemon = createEpistemonData(address, 0);
    }
    return next;
}
