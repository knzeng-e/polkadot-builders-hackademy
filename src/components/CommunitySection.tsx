import { useState, useEffect, useCallback } from "react";
import CommentCard from "./CommentCard.tsx";
import CommentForm from "./CommentForm.tsx";
import { loadComments } from "../tutorial/community.ts";
import type { CommentEntry } from "../tutorial/types.ts";

export default function CommunitySection({
    lessonId,
    account,
}: {
    lessonId: string;
    account: { address: string } | null;
}) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<CommentEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const entries = await loadComments(lessonId);
            setComments(entries);
        } catch { /* silent */ }
        finally { setLoading(false); }
    }, [lessonId]);

    useEffect(() => {
        if (open) refresh();
    }, [open, refresh]);

    const visible = showAll ? comments : comments.slice(0, 5);

    return (
        <div className="community-section">
            <button
                className="community-toggle"
                onClick={() => setOpen(o => !o)}
            >
                <span className="community-toggle-icon">💬</span>
                <span className="community-toggle-label">Community</span>
                {comments.length > 0 && (
                    <span className="community-count">{comments.length}</span>
                )}
                <span className="community-toggle-chevron">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="community-body">
                    {loading ? (
                        <div className="community-loading">Loading discussions…</div>
                    ) : comments.length === 0 ? (
                        <div className="community-empty">
                            Be the first to share a tip, ask a question, or add a resource for this lesson.
                        </div>
                    ) : (
                        <>
                            <div className="community-list">
                                {visible.map(entry => (
                                    <CommentCard
                                        key={entry.index}
                                        entry={entry}
                                        lessonId={lessonId}
                                        onUpvoted={refresh}
                                    />
                                ))}
                            </div>
                            {comments.length > 5 && !showAll && (
                                <button
                                    className="community-load-more"
                                    onClick={() => setShowAll(true)}
                                >
                                    Show {comments.length - 5} more
                                </button>
                            )}
                        </>
                    )}

                    {account ? (
                        <>
                            {!showForm ? (
                                <button
                                    className="btn btn-ghost btn-sm community-add-btn"
                                    onClick={() => setShowForm(true)}
                                >
                                    + Share a tip / ask a question
                                </button>
                            ) : (
                                <CommentForm
                                    lessonId={lessonId}
                                    authorAddress={account.address}
                                    onPosted={() => { setShowForm(false); refresh(); }}
                                />
                            )}
                        </>
                    ) : (
                        <div className="community-no-account">
                            Connect an account to contribute to this lesson's discussion.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
