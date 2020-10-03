import execa from "execa"

type BrewCommand =
  | "update"
  | "upgrade"
  | "list"
  | "leaves"
  | "search"
  | "info"
  | "services"

export async function brew(command: BrewCommand, ...args: string[]) {
  try {
    const { stdout, stderr } = await execa("brew", [command, ...args])
    if (stderr) console.warn(stderr)
    return stdout
  } catch (error) {
    console.error(error)
    if (error instanceof Error) return error.message
    if (typeof error === "string") return error
    throw error
  }
}

export async function brewUpgrade() {
  await brew("update")
  await brew("upgrade")
}

export async function brewServiceList(): Promise<BrewState["services"]> {
  return (await brew("services", "list"))
    .split("\n")
    .slice(1)
    .map(e => e.split(/\s+/))
    .map(([name, status]) => ({ name, status }))
}
