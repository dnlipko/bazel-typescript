# Bazel TypeScript

This repository demonstrates how to set up a TypeScript project using Bazel 8.1.1 with modern dependency management (Bzlmod) and GitHub Pages deployment.

## Live Demo

Visit the [live demo](https://dnlipko.github.io/bazel-typescript/) to try out the TypeScript example in your browser.

## Prerequisites

- Bazel 8.1.1 (managed by Bazelisk)
- Node.js
- pnpm (version 6.1 for compatibility with current rules_js)
- Python 3 (for local development server)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/dnlipko/bazel-typescript.git
cd bazel-typescript
```

2. Install Bazelisk to manage Bazel versions:
```bash
npm install -g @bazel/bazelisk
```

3. Install pnpm version 6.1:
```bash
npm install -g pnpm@6.1
```

4. Install dependencies:
```bash
pnpm install
```

5. Build and run locally:
```bash
# Build the project
bazel build //src:gh_pages

# Create a local site directory
mkdir -p _site
cp bazel-bin/src/bundle.js _site/
cp bazel-bin/src/bundle.js.map _site/
cp bazel-bin/src/index.html _site/
cp bazel-bin/src/styles.css _site/

# Start a local development server
cd _site && python3 -m http.server 8000
```

Then visit http://localhost:8000 in your browser.

## Project Structure

```
bazel-typescript/
├── .bazelignore          # Ignores node_modules directories
├── .bazeliskrc           # Specifies Bazel version 8.1.1
├── .github/              # GitHub Actions workflows
├── .gitignore            # Specifies which files Git should ignore
├── BUILD_AND_DEPLOY.md   # Detailed build and deployment guide
├── MODULE.bazel          # Defines Bazel module and dependencies
├── package.json          # Node.js package configuration
├── pnpm-lock.yaml        # pnpm lock file
└── src/
    ├── BUILD             # Bazel build configuration for TypeScript
    ├── components/       # React components
    │   ├── App.tsx       # Main App component
    │   └── Greeting.tsx  # Greeting component
    ├── index.tsx         # Application entry point
    ├── index.html        # HTML template
    ├── styles.css        # Application styles
    └── tsconfig.json     # TypeScript configuration
```

## Key Configuration Files

[Configuration files section remains the same...]

## Building and Development

### Local Development
```bash
# Build the project
bazel build //src:gh_pages

# Set up local development environment
mkdir -p _site
cp bazel-bin/src/bundle.js _site/
cp bazel-bin/src/bundle.js.map _site/
cp bazel-bin/src/index.html _site/
cp bazel-bin/src/styles.css _site/

# Start local server
cd _site && python3 -m http.server 8000
```

### Production Build
```bash
# Build for production
bazel build //src:gh_pages
```

The build output will be in `bazel-bin/src/` directory.

## Adding New Components

1. Create your component in the `src/components` directory
2. Add the file to the `srcs` list in `src/BUILD` under the `ts_project` rule
3. Import and use your component
4. Build using the Bazel command above

## Key Features

- **Modern Dependency Management**: Uses Bzlmod instead of WORKSPACE
- **Type Safety**: Full TypeScript type checking during build
- **Bundling**: Uses esbuild for fast and efficient bundling
- **React Support**: Full React and TypeScript integration
- **Source Maps**: Development-friendly source maps for debugging
- **Incremental Builds**: Bazel's caching ensures fast rebuilds
- **Reproducible Builds**: Locked dependencies with pnpm
- **Automated Deployment**: GitHub Pages deployment via GitHub Actions

## Troubleshooting

1. If you see errors about node_modules not being ignored, ensure your `.bazelignore` contains:
```
node_modules
**/node_modules
```

2. If TypeScript compilation fails with missing DOM types, ensure your `tsconfig.json` includes "dom" in the lib array.

3. For worker-related warnings, note that ts_project workers are not currently supported with TypeScript >= 5.0.0 (see [rules_ts issue #361](https://github.com/aspect-build/rules_ts/issues/361)).

4. If the bundle fails to load in the browser, check that:
   - The bundle.js file is being served correctly
   - All file paths in index.html are correct
   - The browser console for any specific error messages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.