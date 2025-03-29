load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

ts_project(
    name = "hello",
    srcs = ["index.ts"],
    tsconfig = "tsconfig.json",
    declaration = True,
)

copy_to_bin(
    name = "html",
    srcs = ["index.html"],
)

filegroup(
    name = "hello_binary",
    srcs = [":hello", ":html"],
)

# Target for GitHub Pages deployment
filegroup(
    name = "gh_pages",
    srcs = [
        ":hello",
        ":html",
    ],
    visibility = ["//visibility:public"],
) 