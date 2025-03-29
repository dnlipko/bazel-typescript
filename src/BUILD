load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_esbuild//esbuild:defs.bzl", "esbuild")

ts_project(
    name = "hello_ts",
    srcs = [
        "components/App.tsx",
        "components/Greeting.tsx",
        "index.tsx",
    ],
    tsconfig = "tsconfig.json",
    declaration = True,
    deps = ["//:node_modules"],
)

js_library(
    name = "hello",
    srcs = [":hello_ts"],
)

copy_to_bin(
    name = "html",
    srcs = ["index.html"],
)

copy_to_bin(
    name = "styles",
    srcs = ["styles.css"],
)

esbuild(
    name = "bundle",
    entry_point = "index.js",
    deps = [":hello"],
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
        ":html",
        ":styles",
    ],
    visibility = ["//visibility:public"],
) 