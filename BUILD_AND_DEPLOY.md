# Build and Deploy Guide

This guide explains how to build and deploy the Next.js application using Bazel in our monorepo structure.

## Prerequisites

- Node.js 18 or later
- pnpm 8 or later
- Bazel 7.0 or later

## Project Structure

```
.
├── apps/
│   └── web/              # Next.js web application
│       ├── src/          # Application source code
│       ├── public/       # Static files
│       ├── BUILD        # Bazel build configuration
│       ├── package.json  # App-specific dependencies
│       └── next.config.js
├── BUILD                # Root Bazel configuration
├── MODULE.bazel        # Bazel module configuration
├── package.json        # Workspace-level dependencies
└── tsconfig.json      # TypeScript configuration
```

## Build Commands

### Development

To start the development server:

```bash
# Using Bazel
bazel run //apps/web:dev

# Using pnpm
pnpm dev:web
```

The development server will be available at `http://localhost:3000`.

### Production Build

To create a production build:

```bash
# Using Bazel
bazel build //apps/web:build

# Using pnpm
pnpm build:web
```

The build output will be available in `apps/web/out/`.

## Bazel Configuration

### Key Build Targets

- `//apps/web:build` - Production build of the web application
- `//apps/web:dev` - Development server
- `//apps/web:web_ts` - TypeScript compilation
- `//apps/web:web_lib` - JavaScript library including all app files

### Important Configuration Files

1. `apps/web/BUILD`:
   - Defines the web application build targets
   - Configures TypeScript compilation with SWC
   - Manages Next.js build and dev server

2. Root `BUILD`:
   - Sets up workspace-level dependencies
   - Configures Next.js binary
   - Manages shared resources

3. `MODULE.bazel`:
   - Defines external dependencies
   - Configures npm package management
   - Sets up TypeScript and SWC tools

## Deployment

### GitHub Pages

The repository includes a GitHub Actions workflow for deploying to GitHub Pages. The workflow:

1. Sets up the build environment:
   - Installs Node.js and pnpm
   - Sets up Bazel with caching
   - Installs project dependencies

2. Builds the application using Bazel:
   - Runs `bazel build //apps/web:build`
   - Copies the build output to a deployment directory

3. Deploys to GitHub Pages:
   - Uploads the build artifacts
   - Deploys using GitHub Pages action

Configuration in `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  NEXT_PUBLIC_BASE_PATH: /bazel-typescript
  NODE_VERSION: 18
  PNPM_VERSION: 8
  BAZEL_VERSION: 7.0.0

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Bazel
        uses: bazelbuild/setup-bazelisk@v2
      - name: Mount Bazel cache
        uses: actions/cache@v3
        with:
          path: ~/.cache/bazel
          key: ${{ runner.os }}-bazel
      - uses: pnpm/action-setup@v2
      - name: Build
        run: |
          bazel build //apps/web:build
          cp -r bazel-bin/apps/web/build.sh.runfiles/__main__/apps/web/out/* apps/web/out/
      - name: Deploy
        uses: actions/deploy-pages@v4
```

### Manual Deployment

To deploy to any static hosting:

1. Build the application:
   ```bash
   bazel build //apps/web:build
   ```

2. Copy the build output to your deployment directory:
   ```bash
   mkdir -p apps/web/out
   cp -r bazel-bin/apps/web/build.sh.runfiles/__main__/apps/web/out/* apps/web/out/
   ```

3. Deploy the contents of `apps/web/out/` to your hosting provider.

4. For providers requiring specific configurations:
   - Update `next.config.js` with the appropriate `basePath` and `trailingSlash` settings
   - Ensure your hosting provider's configuration matches Next.js's static export requirements

## Troubleshooting

### Common Issues

1. TypeScript Compilation Errors:
   - Check `tsconfig.json` settings
   - Ensure all required dependencies are installed
   - Verify TypeScript version compatibility

2. Bazel Build Failures:
   - Clear Bazel cache: `bazel clean --expunge`
   - Update dependencies: `pnpm install`
   - Check Bazel version compatibility
   - Verify Bazel configuration in `MODULE.bazel` and `BUILD` files

3. Next.js Build Issues:
   - Verify Next.js configuration in `next.config.js`
   - Check for unsupported features in static export
   - Ensure all required environment variables are set

### Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Bazel JavaScript Rules](https://docs.aspect.build/rules/aspect_rules_js)
- [TypeScript Rules for Bazel](https://docs.aspect.build/rules/aspect_rules_ts)
- [GitHub Pages Documentation](https://docs.github.com/en/pages) 