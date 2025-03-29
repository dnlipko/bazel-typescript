# Build and Deploy Guide

This guide explains how to build the TypeScript project with Bazel and deploy it to GitHub Pages.

## Table of Contents
- [Build Process](#build-process)
  - [Build Targets](#build-targets)
  - [Local Development](#local-development)
  - [Local Testing](#local-testing)
- [Deployment Process](#deployment-process)
  - [GitHub Actions Workflow](#github-actions-workflow)
  - [Deployment Configuration](#deployment-configuration)
  - [Troubleshooting](#troubleshooting)

## Build Process

### Build Targets

The project includes two main build targets:

1. **Development Build**:
```bash
bazel build //src:hello_binary
```
This target:
- Compiles TypeScript to JavaScript
- Copies HTML interface to output directory
- Generates type declarations
- Suitable for local development

2. **GitHub Pages Build**:
```bash
bazel build //src:gh_pages
```
This target:
- Creates a deployment-ready bundle
- Includes all necessary files for web deployment
- Used by GitHub Actions for deployment

### Local Development

1. Install dependencies:
```bash
pnpm install
```

2. Build the project:
```bash
bazel build //src:hello_binary
```

3. Run the compiled JavaScript:
```bash
node bazel-bin/src/hello.js
```

### Local Testing

To test the web interface locally:

1. Build the GitHub Pages target:
```bash
bazel build //src:gh_pages
```

2. Locate the built files:
```bash
ls bazel-bin/src/
```

3. Start a local server:
```bash
# Using Python's built-in server
python -m http.server 8000 --directory bazel-bin/src
```

4. Open `http://localhost:8000` in your browser

## Deployment Process

### GitHub Actions Workflow

The deployment process is automated using GitHub Actions. The workflow file is located at `.github/workflows/build-and-deploy.yml`.

#### Required Repository Settings

Before the workflow can run successfully, you need to configure your repository:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions"

2. **Configure Workflow Permissions**:
   - Go to Settings → Actions → General
   - Under "Workflow permissions":
     - Select "Read and write permissions"
     - Enable "Allow GitHub Actions to create and approve pull requests"

3. **Environment Setup**:
   - The workflow uses the `github-pages` environment
   - No additional secrets are required as it uses `GITHUB_TOKEN`

#### Workflow Structure

The workflow consists of two main jobs:

1. **Build Job**:
```yaml
build:
  runs-on: ubuntu-latest
  steps:
    - Checkout code
    - Setup Bazel cache
    - Install Node.js and pnpm
    - Build with Bazel
    - Configure GitHub Pages
    - Prepare and upload artifacts
```

2. **Deploy Job**:
```yaml
deploy:
  needs: build
  environment:
    name: github-pages
  permissions:
    pages: write
    id-token: write
```

### Deployment Configuration

#### Required Permissions

The workflow requires these permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
  actions: read
```

#### Build and Artifact Process

1. The workflow builds the project using Bazel:
```bash
bazel build //src:gh_pages
```

2. Prepares deployment files:
```bash
mkdir -p _site
cp bazel-bin/src/hello.js _site/
cp bazel-bin/src/index.html _site/
```

3. Uploads artifacts using `actions/upload-pages-artifact@v3`

### Troubleshooting

#### Common Issues and Solutions

1. **GitHub Pages Not Enabled**:
   - Error: "Get Pages site failed"
   - Solution: 
     - Go to repository Settings → Pages
     - Select "GitHub Actions" as the source
     - Ensure workflow permissions are correct

2. **Deployment Environment Issues**:
   - Error: "Value 'github-pages' is not valid"
   - Solution:
     - Verify environment name in workflow matches repository settings
     - Check if GitHub Pages is properly enabled
     - Ensure repository has necessary permissions

3. **Build Artifacts Missing**:
   - Error: Files not found in deployment
   - Solution:
     - Check Bazel build output: `bazel build //src:gh_pages`
     - Verify files are copied correctly in the workflow
     - Check `_site` directory structure

4. **Permission Errors**:
   - Error: "Resource not accessible by integration"
   - Solution:
     - Verify workflow permissions in repository settings
     - Check if `GITHUB_TOKEN` has correct scopes
     - Ensure all required permissions are set in workflow file

#### Deployment Verification

After deployment:
1. Check the Actions tab for workflow status
2. Visit the GitHub Pages URL (found in repository settings)
3. Verify all assets are loading correctly
4. Check browser console for any errors

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Bazel Build System](https://bazel.build/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 