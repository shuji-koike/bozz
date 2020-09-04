import React, { createContext, useState, useEffect } from "react"
import { app } from "~/src/firebase"
import { Auth } from "./Auth"
import { GithubProvider } from "./GithubProvider"
import { RateLimit } from "./RateLimit"

export default function Provider({ children }: React.Props<{}>) {
  return (
    <GithubProvider fallback={<Auth />}>
      <RateLimit>
        <ContextProvider>{children}</ContextProvider>
      </RateLimit>
    </GithubProvider>
  )
}

export const UserContext = createContext<AuthUser>(null)

const ContextProvider: React.FC = ({ children }) => {
  const { user } = useAuth()
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

function useAuth() {
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
