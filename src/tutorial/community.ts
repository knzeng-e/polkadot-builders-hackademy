import { getStorageClient } from "../utils.ts";
import type { CommentContent, CommentEntry, CommentType } from "./types.ts";

const COMMENT_TYPE_MAP: Record<CommentType, number> = {
    question: 0, tip: 1, resource: 2, correction: 3, experience: 4,
};
const COMMENT_TYPE_RMAP: CommentType[] = [
    "question", "tip", "resource", "correction", "experience",
];

// ─── Bulletin content storage ───────────────────────────────────────

export async function uploadComment(content: CommentContent): Promise<string> {
    const bytes = new TextEncoder().encode(JSON.stringify(content));
    const client = await getStorageClient();
    const result = await client.store(bytes).send();
    if (!result.cid) throw new Error("upload returned no CID");
    return result.cid.toString();
}

export async function fetchCommentContent(cid: string): Promise<CommentContent | null> {
    try {
        const client = await getStorageClient();
        const bytes = await client.fetchBytes(cid);
        return JSON.parse(new TextDecoder().decode(bytes)) as CommentContent;
    } catch {
        return null;
    }
}

// ─── Local index (localStorage, per lesson) ─────────────────────────
// Format: lesson-comments:<lessonId> → JSON array of CommentEntry (without content)

const LOCAL_KEY = (lessonId: string) => `lesson-comments:${lessonId}`;

export function loadLocalComments(lessonId: string): CommentEntry[] {
    try {
        const raw = localStorage.getItem(LOCAL_KEY(lessonId));
        if (raw) return JSON.parse(raw) as CommentEntry[];
    } catch { /* fall through */ }
    return [];
}

function saveLocalComments(lessonId: string, entries: CommentEntry[]) {
    localStorage.setItem(LOCAL_KEY(lessonId), JSON.stringify(entries));
}

// ─── Post a comment ──────────────────────────────────────────────────

export async function postComment(
    lessonId: string,
    text: string,
    type: CommentType,
    authorAddress: string,
    resources?: Array<{ title: string; url: string }>,
): Promise<CommentEntry> {
    const content: CommentContent = {
        lessonId,
        text,
        type,
        resources,
        timestamp: Date.now(),
    };

    // 1. Upload to Bulletin
    const cid = await uploadComment(content);

    // 2. Build entry
    const existing = loadLocalComments(lessonId);
    const entry: CommentEntry = {
        index: existing.length,
        author: authorAddress,
        cid,
        type,
        timestamp: content.timestamp,
        upvotes: 0,
        content,
    };

    // 3. Store in local index
    saveLocalComments(lessonId, [...existing, entry]);

    return entry;
}

// ─── Load comments for a lesson ──────────────────────────────────────
// Phase 1: reads local index + hydrates content from Bulletin.
// Phase 2 (after contract deployed): will also query contract for shared comments.

export async function loadComments(lessonId: string): Promise<CommentEntry[]> {
    const entries = loadLocalComments(lessonId);
    if (entries.length === 0) return [];

    // Hydrate content from Bulletin for any entry that doesn't have it
    const hydrated = await Promise.all(
        entries.map(async (e) => {
            if (e.content) return e;
            const content = await fetchCommentContent(e.cid);
            return content ? { ...e, content } : e;
        })
    );

    return hydrated.sort((a, b) => b.upvotes - a.upvotes);
}

// ─── Upvote (local only until contract deployed) ─────────────────────

export function upvoteComment(lessonId: string, index: number): void {
    const entries = loadLocalComments(lessonId);
    const updated = entries.map(e =>
        e.index === index ? { ...e, upvotes: e.upvotes + 1 } : e
    );
    saveLocalComments(lessonId, updated);
}

export { COMMENT_TYPE_MAP, COMMENT_TYPE_RMAP };
