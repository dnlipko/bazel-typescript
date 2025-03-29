load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

ts_project(
    name = "next_ts",
    srcs = glob(
        [
            "app/**/*.ts",
            "app/**/*.tsx",
            "components/**/*.ts",
            "components/**/*.tsx",
        ],
        allow_empty = True,
    ),
    declaration = True,
    tsconfig = "//:tsconfig",
    deps = ["//:node_modules"],
)

js_library(
    name = "next_lib",
    srcs = glob(
        [
            "app/**/*",
            "components/**/*",
            "styles/**/*.css",
        ],
        allow_empty = True,
    ) + [":next_ts"],
    deps = ["//:node_modules"],
)

js_binary(
    name = "next_build",
    data = [
        ":next_lib",
        "//:next_config",
        "//:tsconfig",
        "//:package_json",
        "//:node_modules/next",
    ],
    entry_point = "@npm//next/dist/bin:next",
    args = ["build"],
)

js_binary(
    name = "next_dev",
    data = [
        ":next_lib",
        "//:next_config",
        "//:tsconfig",
        "//:package_json",
        "//:node_modules/next",
    ],
    entry_point = "@npm//next/dist/bin:next",
    args = ["dev"],
) 