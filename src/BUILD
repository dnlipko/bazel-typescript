load("@aspect_rules_ts//ts:defs.bzl", "ts_project")

ts_project(
    name = "hello",
    srcs = ["hello.ts"],
    tsconfig = "tsconfig.json",
    declaration = True,
)

filegroup(
    name = "hello_binary",
    srcs = [":hello"],
) 