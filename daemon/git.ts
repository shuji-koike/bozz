import { resolve } from "path"
import execa from "execa"
import { nonNull, nonEmptyString, tryParse, normalize } from "../src/util"

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

export async function commits(path: string, ref: string): Promise<GitCommit[]> {
  // https://git-scm.com/docs/pretty-formats
  const format: Record<keyof GitCommit, string> = {
    hash: "%H",
    treeHash: "%T",
    parentHashs: "%P",
    authorName: "%an",
    authorEmail: "%ae",
    authorDate: "%aI",
    authorRelativeDate: "%ar",
    committerName: "%cn",
    committerEmail: "%ce",
    committerDate: "%cI",
    committerRelativeDate: "%cr",
    refNames: "%D",
    subject: "%s",
    body: "%b",
    commitNotes: "%N",
  }
  const stdout = await git(path, [
    "log",
    "--format=" + JSON.stringify(format) + "%x00",
    ref,
  ])
  return Promise.all(
    stdout
      .split("\0")
      .map(normalize)
      .filter(nonEmptyString)
      .map<typeof format | null>(tryParse)
      .filter(nonNull)
  )
}

export async function branches(
  path: string,
  option: { logs?: boolean } = {}
): Promise<GitBranch[]> {
  // https://git-scm.com/docs/git-for-each-ref
  const format: Record<keyof GitRefInfo, string> = {
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
    isHead: "%(HEAD)",
  }
  async function toBranch({
    objecttype,
    objectsize,
    upstream,
    authordate,
    isHead,
    ...rest
  }: typeof format): Promise<GitBranch> {
    return {
      ...rest,
      objecttype: objecttype as GitBranch["objecttype"],
      objectsize: Number(objectsize),
      upstream: upstream || null,
      authordate: new Date(),
      isHead: isHead === "*",
      ...(await revListLeftRight(path, `origin/HEAD...${rest.refname}`)),
      commits: option?.logs
        ? await commits(path, `origin/HEAD..${rest.refname}`)
        : undefined,
    }
  }
  const stdout = await git(path, [
    "for-each-ref",
    "--format=" + JSON.stringify(format) + "%00",
  ])
  return Promise.all(
    stdout
      .split("\0")
      .map(normalize)
      .filter(nonEmptyString)
      .map<typeof format | null>(tryParse)
      .filter(nonNull)
      .map(toBranch)
  )
}

export async function revListLeftRight(
  path: string,
  ref: string
): Promise<GitBranchInfo> {
  const [behind, ahead] = (
    await git(path, ["rev-list", "--left-right", "--count", ref])
  )
    .split("\t")
    .map(Number)
  return { behind, ahead }
}
