import firebase from "firebase/app"
import { useState, useEffect, useCallback } from "react"

export function useAuth() {
  const [user, setAuthUser] = useState<AuthUser>()
  const [error, setAuthError] = useState<AuthError>()
  useEffect(
    () => firebase.app().auth().onAuthStateChanged(setAuthUser, setAuthError),
    [setAuthUser, setAuthError]
  )
  return {
    user,
    error,
  }
}

export function useStorage(name: string, storage?: Storage) {
  const [value, setValue] = useState(storage?.getItem(name) || "")
  return {
    value,
    setValue: useCallback(
      function persistState(value: string) {
        storage?.setItem(name, value)
        setValue(value)
      },
      [name, storage]
    ),
  }
}
