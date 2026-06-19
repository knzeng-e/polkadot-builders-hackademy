import { modules } from "../tutorial/curriculum.tsx";
import type { TutorialProgress } from "../tutorial/types.ts";

export default function Sidebar({
    progress,
    currentModuleId,
    currentLessonId,
    onSelect,
}: {
    progress: TutorialProgress;
    currentModuleId: string;
    currentLessonId: string;
    onSelect: (moduleId: string, lessonId: string) => void;
}) {
    const track = progress.track;
    const completed = new Set(progress.completedLessons);

    const visibleModules = modules.map(m => ({
        ...m,
        visibleLessons: m.lessons.filter(l =>
            track === "deep" || l.track !== "deep"
        ),
    })).filter(m => m.visibleLessons.length > 0);

    return (
        <nav className="sidebar-nav">
            {visibleModules.map(mod => {
                const allDone = mod.visibleLessons.every(l => completed.has(l.id));
                return (
                    <div key={mod.id} className="sidebar-module">
                        <div className={`sidebar-module-title ${allDone ? "sidebar-module-title--done" : ""}`}>
                            <span>{mod.icon}</span>
                            <span>{mod.title}</span>
                            {allDone && <span className="sidebar-done-mark">✓</span>}
                        </div>
                        <ul className="sidebar-lessons">
                            {mod.visibleLessons.map(lesson => {
                                const isCurrent = mod.id === currentModuleId && lesson.id === currentLessonId;
                                const isDone = completed.has(lesson.id);
                                return (
                                    <li key={lesson.id}>
                                        <button
                                            className={`sidebar-lesson ${isCurrent ? "sidebar-lesson--active" : ""} ${isDone ? "sidebar-lesson--done" : ""}`}
                                            onClick={() => onSelect(mod.id, lesson.id)}
                                        >
                                            <span className="sidebar-lesson-icon">
                                                {isDone ? "✓" : isCurrent ? "›" : "○"}
                                            </span>
                                            <span className="sidebar-lesson-title">{lesson.title}</span>
                                            <span className="sidebar-lesson-duration">{lesson.duration}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </nav>
    );
}
