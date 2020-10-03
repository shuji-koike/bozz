import { resolve } from "path"
import execa from "execa"
import fs from "fs-extra-promise"
import { brewServiceList } from "./brew"
import { remotes, branches, commits, packages } from "./git"

const state: State = {}
let statePromise: Promise<State> | null = null

export async function getState(rootDir?: string) {
  if (statePromise) return statePromise
  statePromise = new Promise(async resolve => {
    await initState(rootDir ?? state.rootDir)
    resolve(state)
    statePromise = null
  })
  return statePromise
}

export function setState(newState: Partial<State>) {
  Object.assign(state, newState, { count: (state.count || 0) + 1 })
}

export async function initState(rootDir: string = "") {
  setState({
    timestamp: new Date().getTime(),
    rootDir,
    repos: await exec(resolve("../scripts/git-list-repo.sh"), [rootDir], repo),
    brew: {
      services: await brewServiceList(),
    },
  })
}

export async function repo(
  path: string,
  options: { commits?: boolean } = {}
): Promise<GitRepo> {
  const [owner, name] = path.split("/").slice(-2)
  return {
    owner,
    name,
    path,
    packages: await Promise.all((await packages(path)).map(readPackage)),
    remotes: await remotes(path),
    branches: await branches(path),
    commits: options.commits
      ? await commits(path, "origin/HEAD..HEAD")
      : undefined,
  }
}

export async function readPackage(path: string): Promise<Package> {
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
