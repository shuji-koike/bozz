import path, { resolve } from "path"
import execa from "execa"
import fs from "fs-extra-promise"

const state: State = {}

export function getState() {
  return state
}

export function setState(newState: Partial<State>) {
  Object.assign(state, newState)
}

export async function initState(rootDir: string) {
  setState({
    repos: await exec(
      path.resolve("../scripts/git-list-repo.sh"),
      [rootDir],
      repo
    ),
  })
}

export async function repo(path: string): Promise<Repo> {
  const [owner, name] = path.split("/").slice(-2)
  return {
    owner,
    name,
    path,
    packages: await packages(path),
    branches: await branches(path),
  }
}

export async function packages(path: string): Promise<Package[]> {
  const { stdout } = await execa.command(
    `git -C ${path}/.git ls-files package.json **/package.json`
  )
  return Promise.all(
    stdout
      .split("\n")
      .map(e => resolve(path, e))
      .map(npm)
  )
}

export async function branches(path: string): Promise<GitBranch[]> {
  const { stdout } = await execa.command(
    `git -C ${path}/.git for-each-ref --format=%(refname:short) refs/heads`
  )
  return Promise.all(stdout.split("\n").map(e => ({ name: e })))
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
