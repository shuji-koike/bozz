import { gql } from "@apollo/client"
import React, { createElement } from "react"
import { Link } from "react-router-dom"
import { GithubFragment } from "../types"
import { GithubIcon } from "./GithubIcon"

export const GithubItem: React.FC<{
  frag: GithubFragment | null
  link?: string
  label?: React.ReactNode
}> = ({ frag, label, link, children }) =>
  frag && (
    <>
      <GithubIcon frag={frag} />
      <GithubItemLink frag={frag} link={link} title={getLabel(frag)}>
        {label ?? getLabel(frag)}
      </GithubItemLink>
      {children}
    </>
  )

export const GithubItemLink: React.FC<{
  frag: GithubFragment
  link?: string
  title?: string
}> = ({ frag, link, title, children }) => {
  return link
    ? createElement(Link, { to: link! }, children ?? title)
    : createElement("a", { href: frag.url, title }, children ?? title)
}

function getLabel(frag: GithubFragment) {
  switch (frag.__typename) {
    case "User":
    case "Organization":
      return frag.login
    case "Issue":
    case "PullRequest":
    case "Milestone":
      return frag.title
    case "Repository":
      return frag.name
  }
}

export const GithubItemFragment = {
  PullRequest: gql`
    fragment GithubItemFragmentPullRequest on PullRequest {
      id
      url
      number
      title
      body
      createdAt
      closedAt
      closed
      isDraft
    }
  `,
  Issue: gql`
    fragment GithubItemFragmentIssue on Issue {
      id
      url
      number
      title
      body
      createdAt
      closedAt
      closed
    }
  `,
  Repository: gql`
    fragment GithubItemFragmentRepository on Repository {
      id
      url
      name
      nameWithOwner
      isArchived
      isFork
      isPrivate
      owner {
        login
      }
    }
  `,
  Milestone: gql`
    fragment GithubItemFragmentMilestone on Milestone {
      id
      url
      number
      title
      createdAt
      dueOn
    }
  `,
  User: gql`
    fragment GithubItemFragmentUser on User {
      id
      url
      name
      login
    }
  `,
  Organization: gql`
    fragment GithubItemFragmentOrganization on Organization {
      id
      url
      name
      login
    }
  `,
}
