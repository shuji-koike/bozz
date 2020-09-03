import { gql } from "@apollo/client"
import React from "react"
import styled from "styled-components"
import { nodes } from "../src/util"
import { GithubUserFragment } from "../types/GithubUserFragment"
import { GithubItem, GithubItemFragment } from "./GithubItem"
import { PagerMore } from "./Pager"
import { PullRequestItem, PullRequestItemFragment } from "./PullRequestItem"
import { Repositories, RepositoriesFragment } from "./Repositories"

export const User: React.FC<{
  frag: GithubUserFragment | null | undefined
}> = ({ frag }) => {
  if (!frag) return <>Loading...</>
  return (
    <StyledSection>
      <ul>
        {[frag, ...nodes(frag.organizations)].map(org => (
          <li key={org.login}>
            <GithubItem frag={org} link={`/org/${org.login}/pile`} />
            <Repositories frag={org.repositories} />
          </li>
        ))}
        <li>
          <GithubItem frag={frag} label="Pull requests" />
          <ul>
            {frag.pullRequests.nodes?.map(e => (
              <li key={e?.id}>
                <PullRequestItem frag={e!} />
              </li>
            ))}
            <li>
              <PagerMore frag={frag.pullRequests} />
            </li>
          </ul>
          <GithubItem frag={frag} label="Issues" />
          <ul>
            {frag.issues.nodes?.map(e => (
              <li key={e?.id}>
                <GithubItem frag={e} />
              </li>
            ))}
            <li>
              <PagerMore frag={frag.issues} />
            </li>
          </ul>
        </li>
      </ul>
    </StyledSection>
  )
}

export const UserFragment = gql`
  fragment GithubUserFragment on User {
    ...GithubItemFragmentUser
    issues(
      first: 10
      orderBy: { field: UPDATED_AT, direction: DESC }
      states: [OPEN]
    ) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        ...GithubItemFragmentIssue
      }
    }
    pullRequests(
      first: 10
      orderBy: { field: UPDATED_AT, direction: DESC }
      states: [OPEN]
    ) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        ...GithubItemFragmentPullRequest
        ...PullRequestFragment
      }
    }
    repositories(first: $first, orderBy: $orderBy) {
      ...RepositoriesFragmentConnection
    }
    organizations(first: $first) {
      nodes {
        ...GithubItemFragmentOrganization
        repositories(first: $first, orderBy: $orderBy) {
          ...RepositoriesFragmentConnection
        }
      }
    }
  }
  ${GithubItemFragment.PullRequest}
  ${GithubItemFragment.Issue}
  ${GithubItemFragment.Organization}
  ${GithubItemFragment.User}
  ${PullRequestItemFragment}
  ${RepositoriesFragment}
`

const query = gql`
  query QueryUser(
    $login: String!
    $first: Int = 30
    $orderBy: RepositoryOrder = { field: UPDATED_AT, direction: DESC }
  ) {
    user(login: $login) {
      ...GithubUserFragment
    }
  }
  ${UserFragment}
`

const StyledSection = styled.section`
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  li {
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > ul > li {
    display: inline-block;
    margin-right: 2rem;
    vertical-align: top;
  }
  > ul > li > ul {
    margin-top: 0.4rem;
    padding-inline-start: 1em;
  }
  > ul > li > ul > li {
    margin-bottom: 0.2rem;
  }
`
