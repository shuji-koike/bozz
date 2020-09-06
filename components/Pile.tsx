import { gql } from "@apollo/client"
import React from "react"
import { GithubItemFragmentRepository } from "../types/GithubItemFragmentRepository"
import { QueryOrganizationPileVariables } from "../types/QueryOrganizationPile"
import { QueryRepositoryPileVariables } from "../types/QueryRepositoryPile"
import {
  UserPileFragment,
  UserPileFragment_pullRequests_nodes,
  UserPileFragment_issues_nodes,
} from "../types/UserPileFragment"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore, PagerUtil } from "./Pager"

interface PileProps {
  data: UserPileFragment
  variables: Partial<
    QueryOrganizationPileVariables & QueryRepositoryPileVariables
  >
}

export const Pile: React.FC<PileProps> = ({
  data,
  variables: { login, owner, name },
}) => {
  function getRepoLabel(repo?: GithubItemFragmentRepository) {
    if (!repo) return ""
    return [
      (owner || login) !== repo.owner.login ? repo.owner.login + "/" : "",
      name !== repo.name ? repo.name : "",
    ].join("")
  }
  const frag = PagerUtil.reduce<
    UserPileFragment_pullRequests_nodes | UserPileFragment_issues_nodes
  >(data.issues, data.pullRequests)
  return (
    <ul>
      {frag.nodes?.map(e => (
        <li key={e?.id}>
          <GithubItem
            frag={e}
            label={getRepoLabel(e?.repository) + `#${e?.number}`}>
            <span>{e?.title}</span>
          </GithubItem>
        </li>
      ))}
      {frag.pageInfo.hasNextPage && (
        <li>
          <PagerMore frag={frag} />
        </li>
      )}
    </ul>
  )
}

export const fragments = gql`
  fragment UserPileFragment on User {
    ...GithubItemFragmentUser
    issues(
      first: 10
      states: OPEN
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...GithubItemFragmentIssue
        repository {
          ...GithubItemFragmentRepository
        }
      }
    }
    pullRequests(
      first: 10
      states: OPEN
      orderBy: { field: CREATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...GithubItemFragmentPullRequest
        repository {
          ...GithubItemFragmentRepository
        }
      }
    }
  }
  ${GithubItemFragment.Issue}
  ${GithubItemFragment.PullRequest}
  ${GithubItemFragment.Repository}
  ${GithubItemFragment.User}
`
