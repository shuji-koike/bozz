import React, { createContext, useState, useEffect } from "react"
import { Auth } from "./Auth"
import { GithubProvider } from "./GithubProvider"
import { RateLimit } from "./RateLimit"
import { useAuth } from "~/hooks"
import { Provider } from "react-redux"
import { store } from "~/store"

export default function ({ children }: React.Props<{}>) {
  return (
    <Provider store={store}>
      <GithubProvider fallback={<Auth />}>
        <RateLimit>
          <ContextProvider>
            <BozzProvider>
              <>{children}</>
            </BozzProvider>
          </ContextProvider>
        </RateLimit>
      </GithubProvider>
    </Provider>
  )
}

export const UserContext = createContext<AuthUser>(null)

const ContextProvider: React.FC = ({ children }) => {
  const { user } = useAuth()
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const BozzContext = createContext<State>({ timestamp: 0 })

const BozzProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({ timestamp: 0 })
  useEffect(() => {
    fetch("/.bozz")
      .then<State>(e => e.json())
      .then(res => {
        setState(res)
      })
  }, [])
  return <BozzContext.Provider value={state}>{children}</BozzContext.Provider>
}
