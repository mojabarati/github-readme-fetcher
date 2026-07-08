import React, { useState } from 'react';
import ReadmeFetcher from './components/ReadmeFetcher';

const App = () => {
    return (
        <div className="App">
            <h1>GitHub README Fetcher</h1>
            <ReadmeFetcher />
        </div>
    );
};

export default App;