import { resolve } from "path"
import execa from "execa"
import { nonNull, nonEmptyString, tryParse } from "../src/util"

export async function git<A>(path: string, args: string[]) {
  try {
    const { stdout, stderr } = await execa("git", [
      "-C",
      `${path}/.git`,
      ...args,
    ])
    if (stderr) console.warn(stderr)
    return stdout
  } catch (reason) {
    console.warn(reason)
    return ""
  }
}

export async function packages(path: string): Promise<string[]> {
  const stdout = await git(path, [
    "ls-files",
    "package.json",
    "**/package.json",
  ])
  return Promise.all(stdout.split("\n").map(e => resolve(path, e)))
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
    ...rest
  }: Record<keyof typeof format, string>): Promise<GitBranch> {
    const [behind, ahead] = (
      await git(path, [
        "rev-list",
        "--left-right",
        "--count",
        `origin/HEAD...${rest.refname}`,
      ])
    )
      .split("\t")
      .map(Number)
    return {
      ...rest,
      objecttype: objecttype as GitBranch["objecttype"],
      objectsize: Number(objectsize),
      upstream: upstream || null,
      authordate: new Date(),
      isHead: HEAD === "*",
      behind,
      ahead,
    }
  }
  const stdout = await git(path, [
    "for-each-ref",
    "--format",
    JSON.stringify(format) + "%00",
  ])
  return Promise.all(
    stdout
      .split("\0")
      .map(e => e.trim().replace(/\n/g, "\\n"))
      .filter(nonEmptyString)
      .map<typeof format | null>(tryParse)
      .filter(nonNull)
      .map(toBranch)
  )
}
