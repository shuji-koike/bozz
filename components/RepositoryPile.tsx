import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { nodes } from "~/src/util"
import {
  QueryRepositoryPile,
  QueryRepositoryPileVariables,
} from "../types/QueryRepositoryPile"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore } from "./Pager"
import { fragments, Pile } from "./Pile"
import { QuerySuspense } from "./QuerySuspense"

export default function RepositoryPilePage() {
  const { data, loading, error } = useQuery<
    QueryRepositoryPile,
    QueryRepositoryPileVariables
  >(query, {
    variables: useParams<{ owner: string; name: string }>(),
  })
  return (
    <QuerySuspense loading={loading} error={error}>
      <RepositoryPile frag={data} />
    </QuerySuspense>
  )
}

export const RepositoryPile: React.FC<{ frag?: QueryRepositoryPile }> = ({
  frag,
}) => {
  return (
    <section>
      {nodes(frag?.repository?.collaborators).map(e => (
        <React.Fragment key={e.id}>
          <p>
            <GithubItem frag={e} />
          </p>
          <Pile data={e}></Pile>
        </React.Fragment>
      ))}
      <PagerMore frag={frag?.repository?.collaborators} />
    </section>
  )
}

const query = gql`
  query QueryRepositoryPile(
    $owner: String!
    $name: String!
    $limit: Int = 20
    $after: String
  ) {
    repository(owner: $owner, name: $name) {
      ...GithubItemFragmentRepository
      owner {
        login
      }
      collaborators(first: $limit, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
        }
        nodes {
          ...UserPileFragment
        }
      }
    }
  }
  ${GithubItemFragment.Repository}
  ${fragments}
`
