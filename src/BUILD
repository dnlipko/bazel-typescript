load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
load("@aspect_rules_js//js:defs.bzl", "js_library")

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

filegroup(
    name = "hello_binary",
    srcs = [":hello", ":html", ":styles"],
)

# Target for GitHub Pages deployment
filegroup(
    name = "gh_pages",
    srcs = [
        ":hello",
        ":html",
        ":styles",
    ],
    visibility = ["//visibility:public"],
) 