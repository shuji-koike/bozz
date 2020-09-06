import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"
import { nodes } from "~/src/util"
import {
  QueryOrganizationPile,
  QueryOrganizationPileVariables,
} from "../types/QueryOrganizationPile"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { fragments, Pile } from "./Pile"
import { QuerySuspense } from "./QuerySuspense"

export default function OrganizationPilePage() {
  const params = useParams<{ login: string }>()
  return <OrganizationPile {...params} />
}

function OrganizationPile(variables: QueryOrganizationPileVariables) {
  const { data, loading, error } = useQuery<
    QueryOrganizationPile,
    QueryOrganizationPileVariables
  >(query, { variables })
  return (
    <QuerySuspense loading={loading} error={error}>
      <section>
        <header>
          {nodes(data?.organization?.repositories).map(e => (
            <GithubItem
              key={e.id}
              frag={e}
              link={`/${e.owner.login}/${e.name}/pile`}
            />
          ))}
        </header>
        {nodes(data?.organization?.membersWithRole).map(e => (
          <React.Fragment key={e.id}>
            <p>
              <GithubItem frag={e} />
            </p>
            <Pile data={e} variables={variables}></Pile>
          </React.Fragment>
        ))}
      </section>
    </QuerySuspense>
  )
}

const query = gql`
  query QueryOrganizationPile(
    $login: String!
    $limit: Int = 20
    $after: String
  ) {
    organization(login: $login) {
      ...GithubItemFragmentOrganization
      repositories(first: 10, orderBy: { field: PUSHED_AT, direction: DESC }) {
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
