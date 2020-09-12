import { openSync } from "fs"
import { spawn, SpawnOptionsWithoutStdio } from "child_process"

export function run(
  command: string,
  args: string[] = [],
  { cwd = "..", detached, ...options }: SpawnOptionsWithoutStdio = {}
) {
  // https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
  const proc = spawn(command, args, {
    cwd,
    detached,
    stdio: detached ? ["ignore", openSyncLog(), openSyncLog()] : "inherit",
    windowsHide: true,
    ...options,
  })
  if (detached) proc.unref()
  console.info("run:", { pid: proc.pid, command, args })
  proc.on("exit", code => console.warn("exit", { pid: proc.pid, code }))
  proc.on("error", error => console.error("error", { pid: proc.pid, error }))
  const close = () => proc.kill("SIGTERM")
  process.on("SIGTERM", close)
  return close
}

export function openSyncLog(path: string = "/tmp/bozz.log") {
  return openSync(path, "a")
}