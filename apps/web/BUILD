load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")
load("@aspect_rules_swc//swc:defs.bzl", "swc")

package(default_visibility = ["//visibility:public"])

# App-specific package.json
js_library(
    name = "web_package_json",
    srcs = ["package.json"],
)

# Copy app-specific files to bin
copy_to_bin(
    name = "config_files",
    srcs = [
        "next.config.js",
    ],
)

# TypeScript project for the Next.js app
ts_project(
    name = "web_ts",
    srcs = glob(
        [
            "src/**/*.ts",
            "src/**/*.tsx",
        ],
        allow_empty = True,
    ),
    allow_js = True,
    declaration = True,
    incremental = True,
    preserve_jsx = True,
    resolve_json_module = True,
    transpiler = swc,
    tsconfig = "//:tsconfig",
    deps = ["//:node_modules"],
)

# JavaScript library including all app files
js_library(
    name = "web_lib",
    srcs = glob(
        [
            "src/**/*",
            "public/**/*",
        ],
        exclude = ["**/*.ts", "**/*.tsx"],
        allow_empty = True,
    ) + [":web_ts"],
    deps = ["//:node_modules"],
)

# Next.js build target
js_binary(
    name = "build",
    data = [
        ":web_lib",
        ":config_files",
        ":web_package_json",
        "//:workspace_files",
        "//:node_modules",
    ],
    entry_point = "//:next",
    args = ["build", "apps/web"],
)

# Next.js dev server target
js_binary(
    name = "dev",
    data = [
        ":web_lib",
        ":config_files",
        ":web_package_json",
        "//:workspace_files",
        "//:node_modules",
    ],
    entry_point = "//:next",
    args = ["dev", "apps/web"],
) 