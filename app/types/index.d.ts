/// <reference types="firebase/app" />

interface State {
  timestamp?: number
  count?: number
  repos?: GitRepo[]
}

interface GitRepo {
  owner: string
  name: string
  path?: string
  packages?: Package[]
  remotes?: {
    origin: GitRemote | null
    [name: string]: GitRemote
  }
  branches?: GitBranch[]
  commits?: GitCommit[]
}

interface GitRemote {
  url: string
}

type GitBranch = GitRefInfo & GitBranchInfo & GitBranchCommitLog

interface GitRefInfo {
  refname: string
  objecttype: "blob" | "tree" | "commit" | "tag"
  objectname: string
  objectsize: number
  upstream: string | null
  authordate: Date
  subject: string
  body: string
  author: string
  committer: string
  isHead: boolean
}

interface GitBranchInfo {
  behind: number
  ahead: number
}

interface GitBranchCommitLog {
  commits?: GitCommit[]
}

type GitCommit = GitCommitInfo

interface GitCommitInfo {
  hash: string
  treeHash: string
  parentHashs: string
  authorName: string
  authorEmail: string
  authorDate: string
  authorRelativeDate: string
  committerName: string
  committerEmail: string
  committerDate: string
  committerRelativeDate: string
  refNames: string
  subject: string
  body: string
  commitNotes: string
}

interface Package {
  path: string
  package: {
    name?: string
  }
  scripts?: Record<string, string>
}

interface Config {
  rootDir?: string
  host?: string
  port?: number
  firebaseConfig: Object
}

type AuthUser = firebase.User | null | undefined
type AuthError = firebase.auth.Error | undefined

interface LoginData {
  email: string
  password: string
}
