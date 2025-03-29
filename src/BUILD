load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_esbuild//esbuild:defs.bzl", "esbuild")

# Common TypeScript configuration
ts_project(
    name = "common_ts",
    srcs = glob(
        [
            "components/common/**/*.tsx",
            "utils/**/*.ts",
            "types/**/*.ts",
        ],
        allow_empty = True,
    ),
    tsconfig = "tsconfig.json",
    declaration = True,
    deps = ["//:node_modules"],
)

# Feature components
ts_project(
    name = "features_ts",
    srcs = glob(
        [
            "components/features/**/*.tsx",
        ],
        allow_empty = True,
    ),
    tsconfig = "tsconfig.json",
    declaration = True,
    deps = [
        ":common_ts",
        "//:node_modules",
    ],
)

# Main application
ts_project(
    name = "app_ts",
    srcs = [
        "components/App.tsx",
        "index.tsx",
    ],
    tsconfig = "tsconfig.json",
    declaration = True,
    deps = [
        ":common_ts",
        ":features_ts",
        "//:node_modules",
    ],
)

# Styles
copy_to_bin(
    name = "styles",
    srcs = glob(["styles/**/*.css"], allow_empty = True),
)

# Static assets
copy_to_bin(
    name = "static",
    srcs = ["index.html"],
)

# JavaScript libraries
js_library(
    name = "common_js",
    srcs = [":common_ts"],
)

js_library(
    name = "features_js",
    srcs = [":features_ts"],
)

js_library(
    name = "app_js",
    srcs = [":app_ts"],
)

# Bundle everything
esbuild(
    name = "bundle",
    entry_point = "index.js",
    deps = [
        ":app_js",
        ":common_js",
        ":features_js",
    ],
    format = "esm",
    platform = "browser",
    sourcemap = "external",
    minify = True,
)

# Target for GitHub Pages deployment
filegroup(
    name = "gh_pages",
    srcs = [
        ":bundle",
        ":static",
        ":styles",
    ],
    visibility = ["//visibility:public"],
) 