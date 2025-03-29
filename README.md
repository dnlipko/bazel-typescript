# Bazel TypeScript

This repository demonstrates how to set up a TypeScript project using Bazel 8.1.1 with modern dependency management (Bzlmod) and GitHub Pages deployment.

## Live Demo

Visit the [live demo](https://dnlipko.github.io/bazel-typescript/) to try out the TypeScript example in your browser.

## Prerequisites

- Bazel 8.1.1 (managed by Bazelisk)
- Node.js
- pnpm (version 6.1 for compatibility with current rules_js)

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

5. Build and run the example:
```bash
bazel build //src:hello_binary
node bazel-bin/src/hello.js
```

6. Open the web example:
```bash
# After building, open this file in your browser
bazel-bin/src/index.html
```

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
    ├── hello.ts          # TypeScript source file
    ├── index.html        # Web interface for the example
    └── tsconfig.json     # TypeScript configuration
```

## Key Configuration Files

[Configuration files section remains the same...]

## Building and Running

For detailed build and deployment instructions, including GitHub Pages deployment, see [BUILD_AND_DEPLOY.md](BUILD_AND_DEPLOY.md).

Quick reference:
```bash
# Development build
bazel build //src:hello_binary

# GitHub Pages build
bazel build //src:gh_pages
```

## Adding New TypeScript Files

1. Create your TypeScript file in the `src` directory
2. Add the file to the `srcs` list in `src/BUILD`
3. Build using the Bazel command above

## Key Features

- **Modern Dependency Management**: Uses Bzlmod instead of WORKSPACE
- **Type Safety**: Full TypeScript type checking during build
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

For build and deployment troubleshooting, see [BUILD_AND_DEPLOY.md](BUILD_AND_DEPLOY.md#troubleshooting).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.