import { gql, useQuery } from "@apollo/client"
import React, { useEffect } from "react"
import { QueryViewer } from "../types/QueryViewer"
import { QuerySuspense } from "./QuerySuspense"
import { UserFragment, User } from "./User"

export default function Home() {
  const { data, loading, error } = useQuery<QueryViewer>(queryViewer)
  useEffect(() => {
    fetch("/api/state")
      .then<State>(e => e.json())
      .then(res => {
        console.debug(res)
      })
  }, [])
  return (
    <QuerySuspense loading={loading} error={error}>
      <User frag={data?.viewer} />
    </QuerySuspense>
  )
}

const queryViewer = gql`
  query QueryViewer(
    $first: Int = 10
    $orderBy: RepositoryOrder = { field: UPDATED_AT, direction: DESC }
  ) {
    viewer {
      ...GithubUserFragment
    }
  }
  ${UserFragment}
`
