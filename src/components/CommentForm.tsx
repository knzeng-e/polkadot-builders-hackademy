import { useState } from "react";
import { postComment } from "../tutorial/community.ts";
import type { CommentType } from "../tutorial/types.ts";

const TYPES: Array<{ value: CommentType; label: string; icon: string }> = [
    { value: "question",   label: "Question",   icon: "❓" },
    { value: "tip",        label: "Tip",        icon: "💡" },
    { value: "resource",   label: "Resource",   icon: "📖" },
    { value: "correction", label: "Correction", icon: "✏️" },
    { value: "experience", label: "Experience", icon: "⭐" },
];

export default function CommentForm({
    lessonId,
    authorAddress,
    onPosted,
}: {
    lessonId: string;
    authorAddress: string;
    onPosted: () => void;
}) {
    const [type, setType] = useState<CommentType>("tip");
    const [text, setText] = useState("");
    const [resourceUrl, setResourceUrl] = useState("");
    const [resourceTitle, setResourceTitle] = useState("");
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        if (!text.trim()) return;
        setPosting(true);
        setError(null);
        try {
            const resources = resourceUrl.trim()
                ? [{ title: resourceTitle.trim() || resourceUrl, url: resourceUrl.trim() }]
                : undefined;
            await postComment(lessonId, text.trim(), type, authorAddress, resources);
            setText("");
            setResourceUrl("");
            setResourceTitle("");
            onPosted();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to post — are you connected to a host?");
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="comment-form">
            <div className="comment-form-type-row">
                {TYPES.map(t => (
                    <button
                        key={t.value}
                        className={`comment-type-btn ${type === t.value ? "comment-type-btn--active" : ""}`}
                        onClick={() => setType(t.value)}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            <textarea
                className="comment-textarea"
                placeholder={
                    type === "question" ? "What's unclear about this lesson?" :
                    type === "tip" ? "Share a tip that helped you..." :
                    type === "resource" ? "Describe the resource you're sharing..." :
                    type === "correction" ? "What needs to be corrected?" :
                    "Share your experience building this..."
                }
                value={text}
                onChange={e => setText(e.target.value)}
                rows={3}
                maxLength={1000}
            />

            <div className="comment-form-resource">
                <input
                    className="comment-input"
                    placeholder="Optional: resource URL"
                    value={resourceUrl}
                    onChange={e => setResourceUrl(e.target.value)}
                />
                {resourceUrl && (
                    <input
                        className="comment-input"
                        placeholder="Resource title"
                        value={resourceTitle}
                        onChange={e => setResourceTitle(e.target.value)}
                    />
                )}
            </div>

            {error && <div className="comment-error">{error}</div>}

            <div className="comment-form-footer">
                <span className="comment-form-note">
                    Stored permanently on Bulletin Chain
                </span>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={submit}
                    disabled={!text.trim() || posting}
                >
                    {posting ? "Posting to Bulletin…" : "Post"}
                </button>
            </div>
        </div>
    );
}
