import { useState, useEffect } from "react";
import { isInsideContainerSync } from "@parity/product-sdk-host";
import { useSignerState, signerManager, short } from "./utils.ts";
import Landing from "./pages/Landing.tsx";
import SoloGame from "./pages/SoloGame.tsx";
import Collection from "./pages/Collection.tsx";
import TutorialShell from "./components/TutorialShell.tsx";
import { modules } from "./tutorial/curriculum.tsx";
import { loadProgress } from "./tutorial/progress.ts";
import type { TutorialProgress } from "./tutorial/types.ts";

type View =
    | { page: "landing" }
    | { page: "lesson"; moduleId: string; lessonId: string; track: "fast" | "deep" }
    | { page: "solo"; returnTo?: { moduleId: string; lessonId: string; track: "fast" | "deep" } }
    | { page: "collection" };

export default function App() {
    const { status, accounts, selectedAccount, error } = useSignerState();

    useEffect(() => {
        signerManager.connect(isInsideContainerSync() ? "host" : "dev").then(result => {
            if (result.ok && result.value.length > 0) {
                signerManager.selectAccount(result.value[0].address);
            }
        });
    }, []);

    const account = selectedAccount;
    const [view, setView] = useState<View>({ page: "landing" });
    const [lastLesson, setLastLesson] = useState<{ moduleId: string; lessonId: string } | null>(null);
    const [cachedProgress, setCachedProgress] = useState<TutorialProgress | null>(null);

    useEffect(() => {
        if (!account) return;
        loadProgress(account.address).then(p => {
            if (!p) return;
            setCachedProgress(p);
            if (!p.lastLesson) return;
            for (const mod of modules) {
                const found = mod.lessons.find(l => l.id === p.lastLesson);
                if (found) {
                    setLastLesson({ moduleId: mod.id, lessonId: found.id });
                    break;
                }
            }
        }).catch(() => {});
    }, [account?.address]);

    if (status === "connecting") {
        return <div className="spinner">Connecting…</div>;
    }

    const goLanding = () => setView({ page: "landing" });

    const currentTrack = view.page === "lesson" ? view.track
        : view.page === "solo" && view.returnTo ? view.returnTo.track
        : "fast";

    const startTrack = (track: "fast" | "deep") => {
        const firstMod = modules[0];
        const firstLesson = firstMod.lessons.find(l =>
            track === "deep" || l.track !== "deep"
        );
        if (firstLesson) {
            setView({ page: "lesson", moduleId: firstMod.id, lessonId: firstLesson.id, track });
        }
    };

    const navigateLesson = (moduleId: string, lessonId: string) => {
        setView({ page: "lesson", moduleId, lessonId, track: currentTrack });
    };

    const openDemo = (returnTo?: { moduleId: string; lessonId: string; track: "fast" | "deep" }) => {
        setView({ page: "solo", returnTo });
    };

    const returnFromDemo = () => {
        if (view.page === "solo" && view.returnTo) {
            setView({ page: "lesson", moduleId: view.returnTo.moduleId, lessonId: view.returnTo.lessonId, track: view.returnTo.track });
        } else {
            setView({ page: "landing" });
        }
    };

    const isLesson = view.page === "lesson";
    const isSolo = view.page === "solo";
    const isCollection = view.page === "collection";

    return (
        <>
            <header className={isLesson ? "header--wide" : ""}>
                <div className="header-left">
                    <h1 onClick={goLanding} style={{ cursor: "pointer" }}>
                        Product Builders Hackademy
                    </h1>
                    {(isLesson || isCollection) && (
                        <button className="back-btn" onClick={goLanding}>← Home</button>
                    )}
                </div>
                <div className="header-right">
                    {accounts.length > 0 ? (
                        <select
                            className="account-select"
                            value={account?.address ?? ""}
                            onChange={e => signerManager.selectAccount(e.target.value)}
                        >
                            {accounts.map(acc => (
                                <option key={acc.address} value={acc.address}>
                                    {acc.name ?? short(acc.address)} ({acc.source})
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span className="account-select">{error?.message ?? "No accounts"}</span>
                    )}
                </div>
            </header>

            {isSolo && (
                <button className="back-btn" onClick={returnFromDemo}>← Back to tutorial</button>
            )}

            {view.page === "landing" && (
                <div className="page-narrow">
                    <Landing
                        onStart={startTrack}
                        onResume={lastLesson ? () => navigateLesson(lastLesson.moduleId, lastLesson.lessonId) : undefined}
                        lastLesson={lastLesson?.lessonId}
                    />
                </div>
            )}

            {view.page === "lesson" && (
                <TutorialShell
                    account={account}
                    initialModuleId={view.moduleId}
                    initialLessonId={view.lessonId}
                    initialTrack={view.track}
                    onOpenDemo={() => openDemo({ moduleId: view.moduleId, lessonId: view.lessonId, track: view.track })}
                    onNavigateLesson={navigateLesson}
                    onOpenCollection={() => setView({ page: "collection" })}
                />
            )}

            {view.page === "solo" && account && (
                <div className="page-narrow">
                    <SoloGame account={account} onDone={returnFromDemo} />
                </div>
            )}
            {view.page === "solo" && !account && (
                <div className="empty">Connect an account to play the demo.</div>
            )}

            {view.page === "collection" && (
                <div className="page-narrow">
                    <Collection
                        currentData={cachedProgress?.epistemon}
                        completedCount={cachedProgress?.completedLessons.length ?? 0}
                    />
                </div>
            )}
        </>
    );
}
