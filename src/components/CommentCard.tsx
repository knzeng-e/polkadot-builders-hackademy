import { short } from "../utils.ts";
import { upvoteComment } from "../tutorial/community.ts";
import type { CommentEntry } from "../tutorial/types.ts";

const TYPE_META = {
    question:    { label: "Question",    icon: "❓", cls: "comment-type--question"    },
    tip:         { label: "Tip",         icon: "💡", cls: "comment-type--tip"         },
    resource:    { label: "Resource",    icon: "📖", cls: "comment-type--resource"    },
    correction:  { label: "Correction",  icon: "✏️", cls: "comment-type--correction"  },
    experience:  { label: "Experience",  icon: "⭐", cls: "comment-type--experience"  },
} as const;

function timeAgo(ts: number): string {
    const diff = Date.now() - ts;
    if (diff < 60_000) return "just now";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return `${Math.floor(diff / 86_400_000)}d ago`;
}

export default function CommentCard({
    entry,
    lessonId,
    onUpvoted,
}: {
    entry: CommentEntry;
    lessonId: string;
    onUpvoted: () => void;
}) {
    const meta = TYPE_META[entry.type];
    const content = entry.content;

    const handleUpvote = () => {
        upvoteComment(lessonId, entry.index);
        onUpvoted();
    };

    return (
        <div className="comment-card">
            <div className="comment-card-header">
                <span className={`comment-type-badge ${meta.cls}`}>
                    {meta.icon} {meta.label}
                </span>
                <span className="comment-author">{short(entry.author)}</span>
                <span className="comment-time">{timeAgo(entry.timestamp)}</span>
            </div>

            <div className="comment-text">
                {content?.text ?? <span className="comment-loading">Loading…</span>}
            </div>

            {content?.resources && content.resources.length > 0 && (
                <ul className="comment-resources">
                    {content.resources.map((r, i) => (
                        <li key={i}>
                            <a href={r.url} target="_blank" rel="noopener noreferrer" className="comment-resource-link">
                                📎 {r.title} ↗
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <div className="comment-card-footer">
                <button className="comment-upvote" onClick={handleUpvote}>
                    ▲ {entry.upvotes > 0 ? entry.upvotes : ""}
                </button>
            </div>
        </div>
    );
}
