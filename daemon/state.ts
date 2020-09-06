import { resolve } from "path"
import execa from "execa"
import fs from "fs-extra-promise"
import config from "../config"
import { branches, packages } from "./git"

const state: State = {}

export function getState() {
  initState(config.rootDir)
  return state
}

export function setState(newState: Partial<State>) {
  Object.assign(state, newState, { count: (state.count || 0) + 1 })
}

export async function initState(rootDir: string) {
  setState({
    timestamp: new Date().getTime(),
    repos: await exec(resolve("../scripts/git-list-repo.sh"), [rootDir], repo),
  })
}

export async function repo(path: string): Promise<Repo> {
  const [owner, name] = path.split("/").slice(-2)
  return {
    owner,
    name,
    path,
    packages: await Promise.all((await packages(path)).map(npm)),
    branches: await branches(path),
  }
}

export async function npm(path: string): Promise<Package> {
  const { name, scripts } = JSON.parse(
    (await fs.readFileAsync(path)).toString()
  )
  return {
    path,
    package: {
      name,
    },
    scripts,
  }
}

async function exec<A>(
  file: string,
  args: readonly string[],
  fn: (e: string) => Promise<A> | A
): Promise<A[]> {
  const { stdout, stderr } = await execa(file, args)
  if (stderr) console.warn(stderr)
  return await Promise.all(stdout.split("\n").map(fn))
}
