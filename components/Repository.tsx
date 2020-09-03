import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { nodes } from "../src/util"
import {
  QueryRepository,
  QueryRepository_repository,
} from "../types/QueryRepository"
import { GithubLabel, GithubLabelFragment } from "./Labels"
import { QuerySuspense } from "./QuerySuspense"

export default function Page() {
  const { owner, name } = useParams<{ owner: string; name: string }>()
  const { data, loading, error } = useQuery<QueryRepository>(query, {
    variables: { owner, name },
  })
  return (
    <QuerySuspense loading={loading} error={error}>
      <section>{data && <Repository frag={data.repository} />}</section>
    </QuerySuspense>
  )
}

const Repository: React.FC<{
  frag: QueryRepository_repository | null | undefined
}> = ({ frag }) => {
  return (
    <>
      {frag?.owner.login}/{frag?.name}
      {nodes(frag?.labels).map(e => (
        <p key={e.name}>
          <GithubLabel key={e.name} frag={e}></GithubLabel>
        </p>
      ))}
    </>
  )
}

const query = gql`
  query QueryRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      owner {
        login
      }
      name
      labels(first: 100) {
        nodes {
          ...LabelFragment
        }
      }
    }
  }
  ${GithubLabelFragment}
`
