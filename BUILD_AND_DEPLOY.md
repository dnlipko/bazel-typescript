# Build and Deploy Guide

This guide details the build and deployment process for the Next.js TypeScript project using Static Site Generation (SSG).

## Table of Contents
- [Build Process](#build-process)
  - [Development Build](#development-build)
  - [Production Build](#production-build)
  - [Static Export](#static-export)
- [Local Testing](#local-testing)
- [Deployment Process](#deployment-process)
  - [GitHub Pages](#github-pages)
  - [Manual Deployment](#manual-deployment)
- [Configuration](#configuration)
  - [Next.js Config](#nextjs-config)
  - [TypeScript Config](#typescript-config)
- [Troubleshooting](#troubleshooting)

## Build Process

### Development Build

For local development:
```bash
pnpm dev
```

This starts the Next.js development server with:
- Hot Module Replacement (HMR)
- Fast Refresh for React components
- Development error overlay
- TypeScript type checking

### Production Build

To create a production build:
```bash
pnpm build
```

This process:
1. Type checks all TypeScript files
2. Compiles TypeScript to JavaScript
3. Generates static HTML for all pages
4. Optimizes JavaScript bundles
5. Minifies CSS and JavaScript
6. Processes and optimizes images
7. Creates a production-ready build in `src/.next`

### Static Export

The project is configured for Static Site Generation (SSG). The build process automatically exports static files to `src/out` directory, containing:
- Pre-rendered HTML pages
- JavaScript bundles
- CSS files
- Static assets (images, fonts, etc.)

## Local Testing

Test the production build locally:

```bash
# Build the static site
pnpm build

# Serve the static files
pnpm start
```

Visit `http://localhost:3000` to verify:
- All pages load correctly
- Styles are applied
- Interactive features work
- Assets are loading properly

## Deployment Process

### GitHub Pages

#### 1. Repository Setup

1. Go to repository Settings → Pages
2. Set "Source" to "GitHub Actions"
3. Ensure proper permissions are set:
   - Actions: Read/Write
   - Pages: Write
   - ID Token: Write

#### 2. Workflow Configuration

The `.github/workflows/deploy.yml` handles automatic deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: pnpm build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: src/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Manual Deployment

For other hosting platforms:

1. Build the static site:
```bash
pnpm build
```

2. The `src/out` directory contains all necessary files for deployment
3. Upload the contents to your hosting provider
4. Configure your server to handle client-side routing (if needed)

## Configuration

### Next.js Config

`next.config.js` is configured for static exports:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
}

module.exports = nextConfig
```

### TypeScript Config

`tsconfig.json` settings for Next.js:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Troubleshooting

### Build Issues

1. **Next.js Build Failures**
   - Clear build cache:
     ```bash
     rm -rf src/.next
     rm -rf node_modules/.cache
     ```
   - Reinstall dependencies:
     ```bash
     rm -rf node_modules
     pnpm install
     ```

2. **TypeScript Errors**
   - Check import paths
   - Verify component props have correct types
   - Ensure `tsconfig.json` is properly configured

3. **Static Export Issues**
   - Verify no server-side only features are used
   - Check image optimization settings
   - Ensure all dynamic routes have proper static paths

### Deployment Issues

1. **GitHub Pages**
   - Verify GitHub Actions permissions
   - Check workflow runs for detailed errors
   - Ensure `basePath` is correctly set in `next.config.js`

2. **Static Files**
   - Check if all files are in `src/out`
   - Verify file permissions
   - Ensure all paths are relative

### Common Solutions

1. **Clear All Caches**
```bash
# Clear Next.js cache
rm -rf src/.next
# Clear node_modules cache
rm -rf node_modules/.cache
```

2. **Full Rebuild**
```bash
# Remove all dependencies
rm -rf node_modules
# Clean install
pnpm install
# Rebuild
pnpm build
```

3. **Verify Configuration**
```bash
# Check Next.js info
pnpm next info
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Static Site Generation Guide](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 