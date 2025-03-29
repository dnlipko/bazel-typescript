'use client'


/**
 * A simple function that returns a greeting message.
 * @param name The name to greet
 * @returns A greeting message
 */
export function sayHello(name: string): string {
    return `Hello, ${name}!`;
}

interface GreetingProps {
    message: string
}

export function Greeting({ message }: GreetingProps) {
    return (
        <div className="greeting">
            <p>{message}</p>
        </div>
    )
} 