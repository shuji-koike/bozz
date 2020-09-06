import firebase from "firebase/app"
import "firebase/auth"
import { firebaseConfig } from "~/config"

export const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export async function login({ email, password }: LoginData) {
  const { user } = await app.auth().signInWithEmailAndPassword(email, password)
  return user
}

export async function loginWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider()
  provider.addScope("repo")
  provider.addScope("read:org")
  const { credential } = await firebase.auth().signInWithPopup(provider)
  const obj = credential?.toJSON()
  if (obj && "oauthAccessToken" in obj)
    localStorage.setItem("GITHUB_TOKEN", obj["oauthAccessToken"])
}

export async function logout() {
  localStorage.removeItem("GITHUB_TOKEN")
  await app.auth().signOut()
}
