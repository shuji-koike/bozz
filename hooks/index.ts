import { useState, useEffect, useContext } from "react"
import { app } from "~/src/firebase"
import { BozzContext } from "~/components/Provider"

export function useAuth() {
  const [user, setAuthUser] = useState<AuthUser>()
  const [error, setAuthError] = useState<AuthError>()
  useEffect(() => app.auth().onAuthStateChanged(setAuthUser, setAuthError), [
    setAuthUser,
    setAuthError,
  ])
  return {
    user,
    error,
  }
}

export function useBozz() {
  return useContext(BozzContext)
}
