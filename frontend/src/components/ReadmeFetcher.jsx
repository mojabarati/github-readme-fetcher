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
        <div>
            <h1>GitHub README Fetcher</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter GitHub repository URL"
            />
            <button onClick={handleFetchReadme} disabled={loading}>
                {loading ? 'Fetching...' : 'Fetch README'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <textarea
                value={content}
                readOnly
                rows={10}
                cols={50}
                placeholder="README content will appear here..."
            />
        </div>
    );
};

export default ReadmeFetcher;