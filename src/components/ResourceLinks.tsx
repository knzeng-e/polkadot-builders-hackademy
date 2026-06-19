import type { Resource } from "../tutorial/types.ts";

const TYPE_ICON: Record<Resource["type"], string> = {
    docs:    "📖",
    spec:    "📐",
    article: "📝",
    repo:    "💻",
    video:   "▶️",
};

export default function ResourceLinks({ resources }: { resources: Resource[] }) {
    return (
        <div className="resource-links">
            <div className="resource-links-title">Further reading</div>
            <ul className="resource-list">
                {resources.map((r, i) => (
                    <li key={i} className="resource-item">
                        <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-link"
                        >
                            <span className="resource-icon">{TYPE_ICON[r.type]}</span>
                            <span className="resource-text">
                                <span className="resource-title">{r.title}</span>
                                {r.description && (
                                    <span className="resource-desc">{r.description}</span>
                                )}
                            </span>
                            <span className="resource-arrow">↗</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
