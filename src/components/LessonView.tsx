import type { TutorialProgress } from "../tutorial/types.ts";
import { findLesson, adjacentLessons } from "../tutorial/curriculum.tsx";
import CodeBlock from "./CodeBlock.tsx";
import LabCard from "./LabCard.tsx";
import AiTipsCard from "./AiTipsCard.tsx";
import ResourceLinks from "./ResourceLinks.tsx";
import CommunitySection from "./CommunitySection.tsx";

export default function LessonView({
    moduleId,
    lessonId,
    progress,
    account,
    onMarkComplete,
    onNavigate,
    onOpenDemo,
}: {
    moduleId: string;
    lessonId: string;
    progress: TutorialProgress;
    account: { address: string } | null;
    onMarkComplete: (lessonId: string) => void;
    onNavigate: (moduleId: string, lessonId: string) => void;
    onOpenDemo: () => void;
}) {
    const lesson = findLesson(moduleId, lessonId);
    const { prev, next } = adjacentLessons(moduleId, lessonId, progress.track);
    const completed = progress.completedLessons.includes(lessonId);

    if (!lesson) {
        return <div className="empty">Lesson not found.</div>;
    }

    const trackLabel =
        lesson.track === "both" ? "Fast + Deep" :
        lesson.track === "fast" ? "Fast track" : "Deep dive";

    return (
        <article className="lesson-content">
            <header className="lesson-header">
                <div className="lesson-meta">
                    <span className="lesson-track-badge">{trackLabel}</span>
                    <span className="lesson-duration">{lesson.duration}</span>
                    {completed && <span className="lesson-done-badge">✓ Completed</span>}
                </div>
                <h1 className="lesson-title">{lesson.title}</h1>
            </header>

            {/* Core concept */}
            <div className="lesson-concept">
                {lesson.concept}
            </div>

            {/* Diagram */}
            {lesson.diagram && (
                <div className="lesson-diagram">
                    {lesson.diagram}
                </div>
            )}

            {/* Code example */}
            {lesson.code && (
                <CodeBlock
                    snippet={lesson.code.snippet}
                    filename={lesson.code.filename}
                    language={lesson.code.language}
                />
            )}

            {/* Deep dive */}
            {lesson.deepDive && (
                <details className="deep-dive">
                    <summary className="deep-dive-summary">
                        <span className="deep-dive-icon">🌊</span>
                        <span className="deep-dive-label">Deep dive</span>
                        <span className="deep-dive-sub">Concepts, philosophy &amp; web3 stakes</span>
                    </summary>
                    <div className="deep-dive-body">
                        {lesson.deepDive}
                    </div>
                </details>
            )}

            {/* Lab */}
            {lesson.lab && (
                <LabCard
                    title={lesson.lab.title}
                    file={lesson.lab.file}
                    steps={lesson.lab.steps}
                    checkpoint={lesson.lab.checkpoint}
                    completed={completed}
                    onComplete={() => onMarkComplete(lessonId)}
                    hasDemo={lesson.lab.demo === "rps-game"}
                    onOpenDemo={onOpenDemo}
                />
            )}

            {/* Mark as read (no lab) */}
            {!lesson.lab && !completed && (
                <button
                    className="btn btn-primary btn-sm lesson-read-btn"
                    onClick={() => onMarkComplete(lessonId)}
                >
                    ✓ Mark as read
                </button>
            )}

            {/* AI Tips */}
            {lesson.aiTips && lesson.aiTips.length > 0 && (
                <AiTipsCard tips={lesson.aiTips} />
            )}

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
                <ResourceLinks resources={lesson.resources} />
            )}

            {/* Community */}
            <CommunitySection lessonId={lessonId} account={account} />

            {/* Navigation */}
            <nav className="lesson-nav">
                {prev ? (
                    <button
                        className="btn btn-ghost lesson-nav-btn"
                        onClick={() => onNavigate(prev.moduleId, prev.lessonId)}
                    >
                        ← {prev.lesson.title}
                    </button>
                ) : <span />}

                {next ? (
                    <button
                        className="btn btn-primary lesson-nav-btn"
                        onClick={() => onNavigate(next.moduleId, next.lessonId)}
                    >
                        {next.lesson.title} →
                    </button>
                ) : (
                    <div className="lesson-finish">
                        Track complete — check your profile in playground.dot
                    </div>
                )}
            </nav>
        </article>
    );
}
