package(default_visibility = ["//visibility:public"])

load("@aspect_rules_js//npm:defs.bzl", "npm_link_package")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//js:defs.bzl", "js_library")

npm_link_all_packages(name = "node_modules")

js_library(
    name = "next_bin",
    srcs = ["node_modules/next/dist/bin/next"],
    visibility = ["//src:__pkg__"],
)

js_library(
    name = "next_config",
    srcs = ["next.config.js"],
    visibility = ["//src:__pkg__"],
)

exports_files([
    "package.json",
    "tsconfig.json",
], visibility = ["//visibility:public"]) 