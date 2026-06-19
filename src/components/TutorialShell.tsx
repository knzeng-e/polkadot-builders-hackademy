import { useState, useEffect, useCallback, useRef } from "react";
import Sidebar from "./Sidebar.tsx";
import LessonView from "./LessonView.tsx";
import EpistemonWidget from "./EpistemonWidget.tsx";
import EvolutionModal from "./EvolutionModal.tsx";
import { modules, flatLessons } from "../tutorial/curriculum.tsx";
import {
    loadProgress,
    saveProgress,
    defaultProgress,
    markLessonComplete,
} from "../tutorial/progress.ts";
import { calcStage } from "../tutorial/epistemon.ts";
import type { TutorialProgress } from "../tutorial/types.ts";

export default function TutorialShell({
    account,
    initialModuleId,
    initialLessonId,
    initialTrack,
    onOpenDemo,
    onNavigateLesson,
    onOpenCollection,
}: {
    account: { address: string } | null;
    initialModuleId: string;
    initialLessonId: string;
    initialTrack: "fast" | "deep";
    onOpenDemo: () => void;
    onNavigateLesson: (moduleId: string, lessonId: string) => void;
    onOpenCollection: () => void;
}) {
    const [progress, setProgress] = useState<TutorialProgress>(defaultProgress(initialTrack));
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [saving, setSaving] = useState(false);
    const [evolutionPrev, setEvolutionPrev] = useState<number | null>(null);
    const lessonPaneRef = useRef<HTMLElement>(null);

    // Scroll to top on lesson change — covers both the inner pane and the window
    useEffect(() => {
        lessonPaneRef.current?.scrollTo({ top: 0, behavior: "instant" });
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [initialModuleId, initialLessonId]);

    // Load progress from Bulletin on mount / account change
    useEffect(() => {
        if (!account) return;
        loadProgress(account.address).then(p => {
            if (p) setProgress(p);
        }).catch(() => {});
    }, [account?.address]);

    const persistProgress = useCallback(async (next: TutorialProgress) => {
        setProgress(next);
        if (!account) return;
        setSaving(true);
        try { await saveProgress(account.address, next); } catch { /* non-fatal */ }
        finally { setSaving(false); }
    }, [account?.address]);

    const handleMarkComplete = useCallback((lessonId: string) => {
        const prevCount = progress.completedLessons.length;
        const prevStage = calcStage(prevCount);

        const next = markLessonComplete(progress, lessonId, account?.address);
        const newCount = next.completedLessons.length;
        const newStage = calcStage(newCount);

        persistProgress({ ...next, lastLesson: lessonId });

        // Trigger evolution modal if stage advanced
        if (newStage > prevStage) {
            setEvolutionPrev(prevCount);
        }
    }, [progress, persistProgress, account?.address]);

    const handleTrackChange = (track: "fast" | "deep") => {
        persistProgress({ ...progress, track });
    };

    // Progress bar
    const flat = flatLessons(progress.track);
    const completedCount = flat.filter(e => progress.completedLessons.includes(e.lessonId)).length;
    const totalCount = flat.length;
    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const getFirstLesson = () => flat.length > 0 ? flat[0] : null;
    const currentModuleId = initialModuleId || getFirstLesson()?.moduleId || modules[0].id;
    const currentLessonId = initialLessonId || getFirstLesson()?.lessonId || modules[0].lessons[0]?.id;

    return (
        <div className="tutorial-shell">
            {/* Evolution modal */}
            {evolutionPrev !== null && progress.epistemon && (
                <EvolutionModal
                    data={progress.epistemon}
                    previousCount={evolutionPrev}
                    newCount={progress.completedLessons.length}
                    onClose={() => setEvolutionPrev(null)}
                />
            )}

            {/* Toolbar */}
            <div className="tutorial-toolbar">
                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(o => !o)}
                    title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                >
                    ☰
                </button>

                <div className="track-switcher">
                    <button
                        className={`track-btn ${progress.track === "fast" ? "track-btn--active" : ""}`}
                        onClick={() => handleTrackChange("fast")}
                    >
                        ⚡ Fast track <span className="track-hint">~15 min</span>
                    </button>
                    <button
                        className={`track-btn ${progress.track === "deep" ? "track-btn--active" : ""}`}
                        onClick={() => handleTrackChange("deep")}
                    >
                        🔬 Deep dive <span className="track-hint">~90 min</span>
                    </button>
                </div>

                <div className="progress-bar-wrap">
                    <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="progress-bar-label">
                        {completedCount}/{totalCount}
                        {saving && <span className="progress-saving"> saving…</span>}
                    </span>
                </div>

                {!account && (
                    <span className="progress-nudge">Connect account to save progress</span>
                )}
            </div>

            <div className={`tutorial-layout ${sidebarOpen ? "tutorial-layout--sidebar" : ""}`}>
                {sidebarOpen && (
                    <aside className="sidebar">
                        {/* Epistemon widget */}
                        <div className="sidebar-epistemon">
                            <EpistemonWidget
                                data={progress.epistemon}
                                completedCount={completedCount}
                                onClick={onOpenCollection}
                            />
                        </div>
                        <Sidebar
                            progress={progress}
                            currentModuleId={currentModuleId}
                            currentLessonId={currentLessonId}
                            onSelect={onNavigateLesson}
                        />
                    </aside>
                )}

                <main className="lesson-pane" ref={lessonPaneRef}>
                    <LessonView
                        key={`${currentModuleId}-${currentLessonId}`}
                        moduleId={currentModuleId}
                        lessonId={currentLessonId}
                        progress={progress}
                        account={account}
                        onMarkComplete={handleMarkComplete}
                        onNavigate={onNavigateLesson}
                        onOpenDemo={onOpenDemo}
                    />
                </main>
            </div>
        </div>
    );
}
