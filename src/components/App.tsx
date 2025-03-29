import React from 'react';
import { Greeting } from './Greeting';

export const App: React.FC = () => {
    return (
        <div className="app">
            <h1>Bazel TypeScript React Example</h1>
            <Greeting initialName="Bazel" />
        </div>
    );
}; 