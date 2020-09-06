import { gql, useQuery } from "@apollo/client"
import React from "react"
import { nodes } from "~/src/util"
import {
  QueryRepositoryPile,
  QueryRepositoryPileVariables,
} from "../types/QueryRepositoryPile"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore } from "./Pager"
import { fragments, Pile } from "./Pile"
import { useParams } from "react-router-dom"
import { QuerySuspense } from "./QuerySuspense"

export default function RepositoryPilePage() {
  const params = useParams<{ owner: string; name: string }>()
  return <RepositoryPile {...params} />
}

export function RepositoryPile({ ...variables }: QueryRepositoryPileVariables) {
  const { data, loading, error } = useQuery<
    QueryRepositoryPile,
    QueryRepositoryPileVariables
  >(query, { variables })
  return (
    <QuerySuspense loading={loading} error={error}>
      <section>
        {nodes(data?.repository?.collaborators).map(e => (
          <React.Fragment key={e.id}>
            <p>
              <GithubItem frag={e} />
            </p>
            <Pile data={e} variables={{}}></Pile>
          </React.Fragment>
        ))}
        <PagerMore frag={data?.repository?.collaborators} />
      </section>
    </QuerySuspense>
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
