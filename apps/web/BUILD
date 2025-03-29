load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

package(default_visibility = ["//visibility:public"])

# Copy Next.js config to bin
copy_to_bin(
    name = "next_config",
    srcs = ["next.config.js"],
)

# TypeScript project for the Next.js app
ts_project(
    name = "next_ts",
    srcs = glob([
        "src/app/**/*.ts",
        "src/app/**/*.tsx",
        "src/components/**/*.ts",
        "src/components/**/*.tsx",
    ]),
    declaration = True,
    tsconfig = "//:tsconfig",
    deps = ["//:node_modules"],
)

# JavaScript library including all app files
js_library(
    name = "next_lib",
    srcs = glob([
        "src/app/**/*",
        "src/components/**/*",
        "src/styles/**/*.css",
    ]) + [":next_ts"],
    deps = ["//:node_modules"],
)

# Next.js build target
js_binary(
    name = "build",
    data = [
        ":next_lib",
        ":next_config",
        "//:tsconfig",
        "//:package_json",
        "//:node_modules/next",
    ],
    entry_point = "@npm//next/dist/bin:next",
    args = ["build", "apps/web"],
)

# Next.js dev server target
js_binary(
    name = "dev",
    data = [
        ":next_lib",
        ":next_config",
        "//:tsconfig",
        "//:package_json",
        "//:node_modules/next",
    ],
    entry_point = "@npm//next/dist/bin:next",
    args = ["dev", "apps/web"],
) 