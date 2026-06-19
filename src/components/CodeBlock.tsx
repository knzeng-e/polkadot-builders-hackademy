import { useState } from "react";

export default function CodeBlock({
    snippet,
    filename,
    language = "ts",
}: {
    snippet: string;
    filename?: string;
    language?: string;
}) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(snippet).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    };

    return (
        <div className="code-block">
            {filename && (
                <div className="code-block-header">
                    <span className="code-block-filename">{filename}</span>
                    <span className="code-block-lang">{language}</span>
                </div>
            )}
            <div className="code-block-body">
                <pre><code>{snippet}</code></pre>
                <button className="code-copy-btn" onClick={copy} title="Copy to clipboard">
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
    );
}
