import type { ReactNode } from "react";

export default function LabCard({
    title,
    file,
    steps,
    checkpoint,
    completed,
    onComplete,
    onOpenDemo,
    hasDemo,
}: {
    title: string;
    file?: string;
    steps: ReactNode[];
    checkpoint: string;
    completed: boolean;
    onComplete: () => void;
    onOpenDemo?: () => void;
    hasDemo?: boolean;
}) {
    return (
        <div className={`lab-card ${completed ? "lab-card--done" : ""}`}>
            <div className="lab-card-header">
                <span className="lab-card-label">Lab</span>
                <span className="lab-card-title">{title}</span>
                {file && <span className="lab-card-file">{file}</span>}
            </div>

            <ol className="lab-steps">
                {steps.map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
            </ol>

            <div className="lab-checkpoint">
                <span className="lab-checkpoint-label">Verify:</span> {checkpoint}
            </div>

            <div className="lab-actions">
                {hasDemo && onOpenDemo && (
                    <button className="btn btn-ghost btn-sm" onClick={onOpenDemo}>
                        ▶ Open game demo
                    </button>
                )}
                {!completed ? (
                    <button className="btn btn-primary btn-sm" onClick={onComplete}>
                        ✓ Mark complete
                    </button>
                ) : (
                    <span className="lab-done-badge">✓ Done</span>
                )}
            </div>
        </div>
    );
}
