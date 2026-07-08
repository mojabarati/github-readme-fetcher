import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import "github-markdown-css/github-markdown.css";
import { fetchReadme } from "../services/api";

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "img",
    "picture",
    "source",
    "div",
    "span",
    "br",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "code",
    "pre",
    "ul",
    "ol",
    "li",
    "a",
    "strong",
    "em",
    "del",
    "blockquote",
    "hr",
  ],
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a || []), "href", "title"],
    img: [...(defaultSchema.attributes?.img || []), "src", "alt", "title", "width", "height"],
    source: [...(defaultSchema.attributes?.source || []), "srcset", "media", "type"],
    picture: [...(defaultSchema.attributes?.picture || []), "class"],
    div: [...(defaultSchema.attributes?.div || []), "align", "class"],
    p: [...(defaultSchema.attributes?.p || []), "align"],
    span: [...(defaultSchema.attributes?.span || []), "class"],
  },
};

const ReadmeFetcher = () => {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("preview");

  const handleFetchReadme = async () => {
    setLoading(true);
    setError("");
    setContent("");
    setViewMode("preview");

    try {
      const readmeContent = await fetchReadme(url);
      setContent(readmeContent);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasContent = Boolean(content);

  const previewContent = useMemo(() => {
    if (!content) return "";

    return content.replace(/\r\n/g, "\n");
  }, [content]);

  return (
    <div className="fetcher-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">GitHub Explorer</p>
          <h1>Fetch any repository README in seconds</h1>
          <p className="subtitle">
            Paste a repository URL and preview the README content instantly.
          </p>
        </div>

        <div className="input-panel">
          <label className="input-label" htmlFor="repo-url">
            Repository URL
          </label>
          <div className="input-row">
            <input
              id="repo-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/owner/repository"
            />
            <button onClick={handleFetchReadme} disabled={loading}>
              {loading ? "Fetching..." : "Fetch README"}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="result-card">
            <div className="result-header">
              <span>README Preview</span>
              <div className="result-toolbar">
                <div className="mode-switch" role="tablist" aria-label="Preview mode">
                  <button
                    type="button"
                    className={`mode-button ${viewMode === "preview" ? "active" : ""}`}
                    onClick={() => setViewMode("preview")}
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className={`mode-button ${viewMode === "raw" ? "active" : ""}`}
                    onClick={() => setViewMode("raw")}
                  >
                    Raw
                  </button>
                </div>
                <span className={`status-pill ${hasContent ? "ready" : "idle"}`}>
                  {hasContent ? "Ready" : "Waiting"}
                </span>
              </div>
            </div>

            {!hasContent && !loading && !error && (
              <div className="preview-placeholder">
                README content will appear here after you fetch a repository.
              </div>
            )}

            {loading && <div className="preview-placeholder">Loading README...</div>}

            {!loading && hasContent && viewMode === "preview" && (
              <article className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[[rehypeRaw, { passThrough: [] }], [rehypeSanitize, sanitizeSchema]]}
                  components={{
                    img: ({ node, ...props }) => <img {...props} loading="lazy" />,
                    a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
                  }}
                >
                  {previewContent}
                </ReactMarkdown>
              </article>
            )}

            {!loading && hasContent && viewMode === "raw" && (
              <pre className="raw-markdown">{previewContent}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeFetcher;
