import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useLocation, useParams } from "react-router-dom"
import {
  QueryOrganizationPile,
  QueryOrganizationPileVariables,
} from "../types/QueryOrganizationPile"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { fragments, Pile } from "./Pile"

export default function OrganizationPilePage() {
  const params = useParams<{ login: string }>()
  const search = new URLSearchParams(useLocation().search)
  const variables = {
    ...params,
    limit: Number(search.get("limit")) || undefined,
  }
  const query = gql`
    query QueryOrganizationPile(
      $login: String!
      $limit: Int = 20
      $after: String
    ) {
      organization(login: $login) {
        ...GithubItemFragmentOrganization
        repositories(
          first: 10
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            ...GithubItemFragmentRepository
          }
        }
        membersWithRole(first: $limit, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ...UserPileFragment
          }
        }
      }
    }
    ${fragments}
    ${GithubItemFragment.Organization}
    ${GithubItemFragment.Repository}
  `
  const { data, loading, error } = useQuery<
    QueryOrganizationPile,
    QueryOrganizationPileVariables
  >(query, { variables })
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (!data || !data.organization) return <p>data is null</p>
  return (
    <section>
      <header>
        {data.organization.repositories.nodes?.map(e => (
          <GithubItem
            key={e?.id}
            frag={e}
            link={`/${e?.owner.login}/${e?.name}/pile`}
          />
        ))}
      </header>
      {data.organization.membersWithRole.nodes?.map(e => (
        <React.Fragment key={e?.id}>
          <p>
            <GithubItem frag={e} />
          </p>
          <Pile data={e!}></Pile>
        </React.Fragment>
      ))}
    </section>
  )
}
