import React, { createContext, useState, useEffect } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { useAuth } from "~/src/hooks"
import { store } from "~/src/store"
import { Auth } from "./Auth"
import { GithubProvider } from "./GithubProvider"
import { Layout } from "./Layout"
import { RateLimit } from "./RateLimit"
import { Routes } from "./Routes"

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  )
}

function AppProvider({ children }: React.Props<{}>) {
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

export const BozzContext = createContext<State>({})

const BozzProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({})
  useEffect(() => {
    fetch("/.bozz")
      .then<State>(e => e.json())
      .then(res => {
        setState(res)
      })
  }, [])
  return <BozzContext.Provider value={state}>{children}</BozzContext.Provider>
}
