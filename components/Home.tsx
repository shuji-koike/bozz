import { gql, useQuery } from "@apollo/client"
import React from "react"
import { QueryViewer } from "../types/QueryViewer"
import { QuerySuspense } from "./QuerySuspense"
import { UserFragment, User } from "./User"
import { Bozz } from "./Bozz"

export default function Home() {
  return <Bozz />
}

export function Home2() {
  const { data, loading, error } = useQuery<QueryViewer>(queryViewer)
  return (
    <>
      <QuerySuspense loading={loading} error={error}>
        <User frag={data?.viewer} />
      </QuerySuspense>
    </>
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
