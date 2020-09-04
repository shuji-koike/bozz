import { gql } from "@apollo/client"
import { useRouter } from "next/router"
import React from "react"
import { Params } from "~/src/util"
import { GithubItemFragmentRepository } from "../types/GithubItemFragmentRepository"
import {
  UserPileFragment,
  UserPileFragment_pullRequests_nodes,
  UserPileFragment_issues_nodes,
} from "../types/UserPileFragment"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore, PagerUtil } from "./Pager"

export const Pile: React.FC<{ data: UserPileFragment }> = ({ data }) => {
  const { query } = useRouter()
  const login = Params.string(query.login)
  const owner = Params.string(query.owner)
  const name = Params.string(query.name)
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
