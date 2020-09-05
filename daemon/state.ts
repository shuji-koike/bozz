import { resolve } from "path"
import execa from "execa"
import fs from "fs-extra-promise"
import config from "../config"
import { nonNull, tryParse } from "../src/util"

const state: State = { timestamp: 0 }

export function getState() {
  initState(config.rootDir)
  return state
}

export function setState(newState: Partial<State>) {
  Object.assign(state, newState)
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
    packages: await packages(path),
    branches: await branches(path),
  }
}

export async function packages(path: string): Promise<Package[]> {
  const stdout = await git(path, [
    "ls-files",
    "package.json",
    "**/package.json",
  ])
  return Promise.all(
    stdout
      .split("\n")
      .map(e => resolve(path, e))
      .map(npm)
  )
}

export function git<A>(path: string, args: string[]) {
  return execa("git", ["-C", `${path}/.git`, ...args])
    .then(({ stdout, stderr }) => {
      if (stderr) console.warn(stderr)
      return stdout
    })
    .catch(reason => {
      console.warn(reason)
      return ""
    })
}

export async function branches(path: string): Promise<GitBranch[]> {
  // https://git-scm.com/docs/git-for-each-ref
  const format = {
    refname: "%(refname)",
    objecttype: "%(objecttype)",
    objectname: "%(objectname)",
    objectsize: "%(objectsize)",
    upstream: "%(upstream)",
    authordate: "%(authordate)",
    subject: "%(contents:subject)",
    body: "%(contents:body)",
    author: "%(author)",
    committer: "%(committer)",
    HEAD: "%(HEAD)",
  }
  async function toBranch({
    objecttype,
    objectsize,
    upstream,
    authordate,
    HEAD,
    ...obj
  }: Record<keyof typeof format, string>): Promise<GitBranch> {
    return {
      ...obj,
      objecttype: objecttype as GitBranch["objecttype"],
      objectsize: Number(objectsize),
      upstream: upstream || null,
      authordate: new Date(),
      isHead: HEAD == "*",
    }
  }
  const stdout = await git(path, [
    "for-each-ref",
    "--format",
    JSON.stringify(format),
  ])
  return Promise.all(
    stdout
      .split("\n")
      .map<typeof format | null>(tryParse)
      .filter(nonNull)
      .map(toBranch)
  )
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
