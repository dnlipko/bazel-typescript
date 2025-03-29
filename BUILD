package(default_visibility = ["//visibility:public"])

load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

# Link all npm packages in the root workspace
npm_link_all_packages(name = "node_modules")

# Root tsconfig for inheritance
copy_to_bin(
    name = "tsconfig",
    srcs = ["tsconfig.json"],
)

# Root package.json for workspace management
js_library(
    name = "root_package_json",
    srcs = ["package.json"],
)

# Root pnpm-lock.yaml for dependency management
js_library(
    name = "pnpm_lock",
    srcs = ["pnpm-lock.yaml"],
)

# Next.js binary
js_binary(
    name = "next",
    data = ["//:node_modules"],
    entry_point = "next/dist/bin/next",
)

# Workspace-level files needed by apps
filegroup(
    name = "workspace_files",
    srcs = [
        ":root_package_json",
        ":tsconfig",
        ":pnpm_lock",
    ],
)

# Export files needed by other packages
exports_files([
    "package.json",
    "tsconfig.json",
    "pnpm-lock.yaml",
]) 