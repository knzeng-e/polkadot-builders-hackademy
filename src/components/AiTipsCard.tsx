import { useState } from "react";
import type { AiTip, AiTipType } from "../tutorial/types.ts";

const TYPE_META: Record<AiTipType, { label: string; color: string; icon: string }> = {
    understand: { label: "Understand", color: "ai-tip--understand", icon: "💡" },
    explore:    { label: "Explore",    color: "ai-tip--explore",    icon: "🔭" },
    build:      { label: "Build",      color: "ai-tip--build",      icon: "🔨" },
    debug:      { label: "Debug",      color: "ai-tip--debug",      icon: "🐛" },
};

function TipBlock({ tip }: { tip: AiTip }) {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const meta = TYPE_META[tip.type];

    const copy = () => {
        navigator.clipboard.writeText(tip.prompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className={`ai-tip ${meta.color}`}>
            <div className="ai-tip-header" onClick={() => setExpanded(e => !e)}>
                <div className="ai-tip-meta">
                    <span className="ai-tip-icon">{meta.icon}</span>
                    <span className={`ai-tip-badge ai-tip-badge--${tip.type}`}>{meta.label}</span>
                    <span className="ai-tip-title">{tip.title}</span>
                </div>
                <span className="ai-tip-toggle">{expanded ? "▲" : "▼"}</span>
            </div>

            {expanded && (
                <div className="ai-tip-body">
                    <p className="ai-tip-rationale">{tip.rationale}</p>
                    <div className="ai-tip-prompt-wrap">
                        <div className="ai-tip-prompt-label">Copy this prompt →</div>
                        <pre className="ai-tip-prompt"><code>{tip.prompt}</code></pre>
                        <button className="ai-tip-copy-btn" onClick={copy}>
                            {copied ? "Copied!" : "Copy prompt"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AiTipsCard({ tips }: { tips: AiTip[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="ai-tips-card">
            <button className="ai-tips-header" onClick={() => setOpen(o => !o)}>
                <div className="ai-tips-header-left">
                    <span className="ai-tips-robot">🤖</span>
                    <div>
                        <div className="ai-tips-title">AI-Assisted Learning</div>
                        <div className="ai-tips-subtitle">
                            Use these prompts with Claude, ChatGPT, or any LLM — as a <em>tutor</em>, not a code generator.
                        </div>
                    </div>
                </div>
                <span className="ai-tips-toggle">{open ? "▲" : "▼"} {tips.length} prompts</span>
            </button>

            {open && (
                <div className="ai-tips-body">
                    <div className="ai-tips-philosophy">
                        <strong>Not vibe coding.</strong> Ask AI to explain concepts before generating code.
                        Understanding what you ship is what makes you a builder, not a copy-paster.
                    </div>
                    <div className="ai-tips-list">
                        {tips.map((tip, i) => <TipBlock key={i} tip={tip} />)}
                    </div>
                </div>
            )}
        </div>
    );
}
