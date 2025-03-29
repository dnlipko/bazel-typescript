import React from 'react';
import { Greeting } from './features/greeting';

export const App = () => {
    return (
        <div className="app">
            <h1>Bazel TypeScript React Example</h1>
            <Greeting initialName="Bazel" />
        </div>
    );
}; 