import { gql } from "@apollo/client"
import React from "react"
import { RepositoriesFragmentConnection } from "../types/RepositoriesFragmentConnection"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore } from "./Pager"

export const Repositories: React.FC<{
  frag: RepositoriesFragmentConnection | null | undefined
}> = ({ frag }) => {
  if (!frag) return <>Loading...</>
  return (
    <ul>
      {frag.nodes?.map(e => (
        <li key={e?.id}>
          <GithubItem frag={e} link={`/${e?.nameWithOwner}/gantt`} />
        </li>
      ))}
      <li>
        <PagerMore frag={frag} />
      </li>
    </ul>
  )
}

export const RepositoriesFragment = gql`
  fragment RepositoriesFragmentConnection on RepositoryConnection {
    totalCount
    pageInfo {
      hasNextPage
    }
    nodes {
      ...GithubItemFragmentRepository
    }
  }
  ${GithubItemFragment.Repository}
`
