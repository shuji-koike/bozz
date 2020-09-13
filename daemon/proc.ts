import { spawn, ChildProcess, SpawnOptionsWithoutStdio } from "child_process"
import { openSync } from "fs"

const procMap: Record<string, ChildProcess | undefined> = {}

export function runTarget(
  target: string,
  runner: () => ChildProcess
): ChildProcess {
  const proc = procMap[target]
  if (proc && proc.killed) {
    console.warn("runTarget:", "killed", { pid: proc.pid })
    delete procMap[target]
  } else if (proc) {
    console.warn("runTarget:", "running", { pid: proc.pid })
    return proc
  }
  console.info("runTarget:", "run")
  return (procMap[target] = runner())
}

export function run(
  command: string,
  args: string[] = [],
  { cwd = "..", detached, ...options }: SpawnOptionsWithoutStdio = {}
): ChildProcess {
  // https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
  const proc = spawn(command, args, {
    cwd,
    detached,
    stdio: detached ? ["ignore", openSyncLog(), openSyncLog()] : "inherit",
    windowsHide: true,
    ...options,
  })
  if (detached) proc.unref()
  console.info("run:", { pid: proc.pid, command, args: args.join(" ") })
  proc.on("exit", code => console.warn("exit", { pid: proc.pid, code }))
  proc.on("error", error => console.error("error", { pid: proc.pid, error }))
  const close = () => proc.kill("SIGTERM")
  process.on("SIGTERM", close)
  return proc
}

export function openSyncLog(path: string = "/tmp/bozz.log") {
  return openSync(path, "a")
}
