import React, { useState } from 'react';

/**
 * A simple function that returns a greeting message.
 * @param name The name to greet
 * @returns A greeting message
 */
export function sayHello(name: string): string {
    return `Hello, ${name}!`;
}

interface GreetingProps {
    initialName?: string;
}

export const Greeting: React.FC<GreetingProps> = ({ initialName = 'Bazel' }) => {
    const [name, setName] = useState(initialName);
    const [greeting, setGreeting] = useState(sayHello(initialName));

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const updateGreeting = () => {
        setGreeting(sayHello(name));
    };

    return (
        <div className="container">
            <h2>Try the Greeting Function:</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                />
                <button onClick={updateGreeting}>Generate Greeting</button>
            </div>
            <div id="output">{greeting}</div>
        </div>
    );
}; 