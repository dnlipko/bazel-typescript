# Bazel TypeScript

This repository demonstrates how to set up a TypeScript project using Bazel 8.1.1 with modern dependency management (Bzlmod).

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

## Project Structure

```
bazel-typescript/
├── .bazelignore          # Ignores node_modules directories
├── .bazeliskrc           # Specifies Bazel version 8.1.1
├── .gitignore            # Specifies which files Git should ignore
├── MODULE.bazel          # Defines Bazel module and dependencies
├── package.json          # Node.js package configuration
├── pnpm-lock.yaml        # pnpm lock file
└── src/
    ├── BUILD             # Bazel build configuration for TypeScript
    ├── hello.ts          # TypeScript source file
    └── tsconfig.json     # TypeScript configuration
```

## Key Configuration Files

### .bazeliskrc
```
USE_BAZEL_VERSION=8.1.1
```

### .gitignore
```gitignore
# Bazel
bazel-*
.bazel

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# TypeScript
*.tsbuildinfo
*.js
*.js.map
*.d.ts

# IDE
.idea/
.vscode/
*.swp
*.swo
.DS_Store

# Build output
dist/
build/
out/
```

### MODULE.bazel
```python
module(
    name = "bazel_typescript",
    version = "1.0",
)

bazel_dep(name = "aspect_rules_ts", version = "1.4.0")
bazel_dep(name = "aspect_rules_js", version = "1.32.1")
bazel_dep(name = "aspect_bazel_lib", version = "1.32.1")

npm = use_extension("@aspect_rules_js//npm:extensions.bzl", "npm")
npm.npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
)
use_repo(npm, "npm")

rules_ts_ext = use_extension(
    "@aspect_rules_ts//ts:extensions.bzl",
    "ext",
    dev_dependency = True,
)
rules_ts_ext.deps()
use_repo(rules_ts_ext, "npm_typescript")
```

### src/BUILD
```python
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")

ts_project(
    name = "hello",
    srcs = ["hello.ts"],
    tsconfig = "tsconfig.json",
    declaration = True,
)

filegroup(
    name = "hello_binary",
    srcs = [":hello"],
)
```

### src/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": ["es2018", "dom"],
    "declaration": true,
    "strict": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### src/hello.ts
```typescript
/**
 * A simple function that returns a greeting message.
 * @param name The name to greet
 * @returns A greeting message
 */
function sayHello(name: string): string {
    return `Hello, ${name}!`;
}

// Example usage
console.log(sayHello("Bazel"));
```

## Building and Running

To build the TypeScript project:
```bash
bazel build //src:hello_binary
```

To run the compiled JavaScript:
```bash
node bazel-bin/src/hello.js
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

## Troubleshooting

1. If you see errors about node_modules not being ignored, ensure your `.bazelignore` contains:
```
node_modules
**/node_modules
```

2. If TypeScript compilation fails with missing DOM types, ensure your `tsconfig.json` includes "dom" in the lib array.

3. For worker-related warnings, note that ts_project workers are not currently supported with TypeScript >= 5.0.0 (see [rules_ts issue #361](https://github.com/aspect-build/rules_ts/issues/361)).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.