import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import React, { useContext, useState, useEffect, createContext } from "react"

const GithubContext = createContext({
  endpoint: "https://api.github.com/graphql",
  token: localStorage.getItem("GITHUB_TOKEN"),
})

export const GithubProvider: React.FC<{
  fallback: React.ReactNode
}> = ({ fallback, children }) => {
  const github = useContext(GithubContext)
  return (
    <GithubContext.Provider value={github}>
      <GithubAuthProvider fallback={fallback}>
        <GithubSchemaProvider>{children}</GithubSchemaProvider>
      </GithubAuthProvider>
    </GithubContext.Provider>
  )
}

export const GithubAuthProvider: React.FC<{
  fallback: React.ReactNode
}> = ({ fallback, children }) => {
  const github = useContext(GithubContext)
  return <>{github.token ? children : fallback}</>
}

export const GithubSchemaProvider: React.FC = ({ children }) => {
  const github = useContext(GithubContext)
  const [client, setClient] = useState<any>(null)
  useEffect(() => {
    setClient(
      new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: github.endpoint,
          headers: {
            Authorization: "bearer " + github.token,
          },
        }),
        defaultOptions: {
          watchQuery: {
            errorPolicy: "all",
          },
          query: {
            errorPolicy: "all",
          },
        },
      })
    )
  }, [github.endpoint, github.token])
  if (!client) return <></>
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
