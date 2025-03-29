load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

ts_project(
    name = "next_ts",
    srcs = glob(
        [
            "pages/**/*.ts",
            "pages/**/*.tsx",
            "components/**/*.ts",
            "components/**/*.tsx",
        ],
        allow_empty = True,
    ),
    declaration = True,
    tsconfig = "tsconfig.json",
    deps = ["//:node_modules"],
)

js_library(
    name = "next_lib",
    srcs = glob(
        [
            "styles/**/*.css",
            "pages/**/*",
            "components/**/*",
        ],
        allow_empty = True,
    ) + [":next_ts"],
    deps = ["//:node_modules"],
)

js_binary(
    name = "next_build",
    data = [":next_lib", "//:next_config"],
    entry_point = "@npm//next/dist/bin/next",
    args = ["build"],
) 