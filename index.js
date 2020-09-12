require("child_process").spawn(
  "yarn",
  "workspace daemon run start".split(" "),
  {
    cwd: __dirname,
  }
)
