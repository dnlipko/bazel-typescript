package(default_visibility = ["//visibility:public"])

load("@aspect_rules_js//npm:defs.bzl", "npm_link_package")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

# Link all npm packages in the root workspace
npm_link_all_packages(name = "node_modules")

# Root tsconfig for inheritance
copy_to_bin(
    name = "tsconfig",
    srcs = ["tsconfig.json"],
    visibility = ["//visibility:public"],
)

# Root package.json for dependency management
js_library(
    name = "package_json",
    srcs = ["package.json"],
    visibility = ["//visibility:public"],
)

# Export files needed by other packages
exports_files([
    "package.json",
    "tsconfig.json",
], visibility = ["//visibility:public"]) 