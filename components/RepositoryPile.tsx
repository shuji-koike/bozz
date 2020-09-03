import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useLocation, useParams } from "react-router-dom"
import {
  QueryRepositoryPile,
  QueryRepositoryPileVariables,
} from "../types/QueryRepositoryPile"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore } from "./Pager"
import { fragments, Pile } from "./Pile"

export default function RepositoryPile() {
  const params = useParams<{ owner: string; name: string }>()
  const search = new URLSearchParams(useLocation().search)
  const variables = {
    ...params,
    limit: Number(search.get("limit")) || undefined,
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
  const { data, loading, error } = useQuery<
    QueryRepositoryPile,
    QueryRepositoryPileVariables
  >(query, { variables })
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (!data) return <p>data is null</p>
  return (
    <section>
      {data.repository?.collaborators?.nodes?.map(e => (
        <React.Fragment key={e?.id}>
          <p>
            <GithubItem frag={e} />
          </p>
          <Pile data={e!}></Pile>
        </React.Fragment>
      ))}
      <PagerMore frag={data.repository?.collaborators} />
    </section>
  )
}
