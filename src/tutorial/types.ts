import type { ReactNode } from "react";

export type Track = "fast" | "deep" | "both";

export type AiTipType = "understand" | "explore" | "build" | "debug";

export interface AiTip {
    type: AiTipType;
    title: string;
    rationale: string;
    prompt: string;
}

export interface Resource {
    title: string;
    url: string;
    type: "docs" | "spec" | "article" | "repo" | "video";
    description?: string;
}

export interface CodeExample {
    snippet: string;
    filename?: string;
    language?: string;
}

export interface Lab {
    title: string;
    file?: string;
    steps: ReactNode[];
    checkpoint: string;
    demo?: "rps-game";
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    track: Track;
    concept: ReactNode;
    deepDive?: ReactNode;
    diagram?: ReactNode;
    code?: CodeExample;
    lab?: Lab;
    aiTips?: AiTip[];
    resources?: Resource[];
}

export interface TutorialModule {
    id: string;
    title: string;
    icon: string;
    lessons: Lesson[];
}

export interface EpistemonData {
    traitSeed: number;
    generation: number;
}

export interface TutorialProgress {
    track: "fast" | "deep";
    completedLessons: string[];
    lastLesson: string;
    startedAt: number;
    epistemon?: EpistemonData;
}

// Community types
export type CommentType = "question" | "tip" | "resource" | "correction" | "experience";

export interface CommentContent {
    lessonId: string;
    text: string;
    type: CommentType;
    resources?: Array<{ title: string; url: string }>;
    timestamp: number;
}

export interface CommentEntry {
    index: number;
    author: string;
    cid: string;
    type: CommentType;
    timestamp: number;
    upvotes: number;
    content?: CommentContent;
}
