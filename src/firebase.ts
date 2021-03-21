import firebase from "firebase/app"
import "firebase/auth"

export async function login({ email, password }: LoginData) {
  const { user } = await firebase
    .app()
    .auth()
    .signInWithEmailAndPassword(email, password)
  return user
}

export async function loginWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope("repo")
  provider.addScope("read:org")
  loginWithAuthProvider(provider)
}

export async function loginWithAuthProvider(
  provider: firebase.auth.AuthProvider
) {
  const { credential } = await firebase.auth().signInWithPopup(provider)
  const obj = credential?.toJSON()
  if (obj && "oauthAccessToken" in obj)
    localStorage.setItem("GITHUB_TOKEN", obj["oauthAccessToken"])
}

export async function logout() {
  localStorage.removeItem("GITHUB_TOKEN")
  await firebase.app().auth().signOut()
}
