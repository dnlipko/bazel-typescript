import { Greeting } from './components/Greeting'
import './styles/globals.css'

export default function Home() {
  return (
    <div className="container">
      <main>
        <h1>Welcome to Next.js with Bazel</h1>
        <Greeting message="Hello from Next.js with Static Site Generation!" />
      </main>
    </div>
  )
} 