import React, { useState } from 'react';
import { fetchReadme } from '../services/api';

const ReadmeFetcher = () => {
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchReadme = async () => {
        setLoading(true);
        setError('');
        setContent('');

        try {
            const readmeContent = await fetchReadme(url);
            setContent(readmeContent);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                            {loading ? 'Fetching...' : 'Fetch README'}
                        </button>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="result-card">
                        <div className="result-header">
                            <span>README Preview</span>
                            <span className={`status-pill ${content ? 'ready' : 'idle'}`}>
                                {content ? 'Ready' : 'Waiting'}
                            </span>
                        </div>
                        <textarea
                            value={content}
                            readOnly
                            rows={14}
                            placeholder="README content will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadmeFetcher;