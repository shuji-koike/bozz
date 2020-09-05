/// <reference types="firebase/app" />

interface State {
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
  name: string
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
