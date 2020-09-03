import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client"
import { PossibleTypesMap } from "@apollo/client/cache/inmemory/policies"
import React, { useContext, useState, useEffect, createContext } from "react"
import { QuerySchema } from "../types/QuerySchema"

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
    ;(async () =>
      new ApolloClient({
        cache: new InMemoryCache({
          possibleTypes: await getPossibleTypes(github),
        }),
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
      }))().then(setClient, e => {
      throw e
    })
  }, [github, github.token])
  if (!client) return <></>
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

// https://www.apollographql.com/docs/react/v3.0-beta/data/fragments/#using-fragments-with-unions-and-interfaces
async function getPossibleTypes({
  endpoint,
  token,
}: {
  endpoint: string
  token: string | null
}): Promise<PossibleTypesMap> {
  const cache = localStorage.getItem("GITHUB_GRAPHQL_POSSIBLE_TYPES")
  if (cache) {
    return JSON.parse(cache)
  } else {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify({
        query: gql`
          query QuerySchema {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `.loc?.source.body,
        variables: {},
      }),
    })
    if (res.status > 400) {
      localStorage.removeItem("GITHUB_TOKEN")
      throw new Error(`status: ${res.status}`)
    }
    const { data }: { data: QuerySchema } = await res.json()
    const possibleTypes: PossibleTypesMap = {}
    data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name!] = supertype.possibleTypes.map(
          subtype => subtype.name!
        )
      }
    })
    localStorage.setItem(
      "GITHUB_GRAPHQL_POSSIBLE_TYPES",
      JSON.stringify(possibleTypes)
    )
    return possibleTypes
  }
}
