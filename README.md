# Bazel TypeScript Next.js Example

This project demonstrates how to use Bazel with TypeScript and Next.js, featuring static site generation (SSG) for optimal performance and deployment flexibility.

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Static Site Generation (SSG)
- Modern React patterns
- Client-side interactivity
- Responsive design
- Bazel build system

## Prerequisites

- Node.js (v16 or later)
- pnpm (v8 or later)
- Bazel (v6 or later)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/dnlipko/bazel-typescript.git
   cd bazel-typescript
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router directory
│   ├── components/        # React components
│   ├── styles/           # CSS styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── BUILD                  # Bazel build configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the static site
- `pnpm start` - Serve the static files
- `pnpm export` - Export the static site

## Build and Deploy

For detailed information about building and deploying the application, please see [BUILD_AND_DEPLOY.md](BUILD_AND_DEPLOY.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.