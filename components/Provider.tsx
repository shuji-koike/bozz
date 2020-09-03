import React from "react"
import { UserContext, useAuth } from "../src/firebase"
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

const ContextProvider: React.FC = ({ children }) => {
  const { user } = useAuth()
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
