/// <reference types="firebase/app" />

interface State {
  timestamp: number
  count?: number
  repos?: Repo[]
}

interface Repo {
  owner: string
  name: string
  path: string
  branches: GitBranch[]
  packages: Package[]
}

interface GitBranch {
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

interface Package {
  path: string
  package: {
    name?: string
  }
  scripts?: Record<string, string>
}

type AuthUser = firebase.User | null | undefined
type AuthError = firebase.auth.Error | undefined

interface LoginData {
  email: string
  password: string
}
