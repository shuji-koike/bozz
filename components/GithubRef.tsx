import { gql } from "@apollo/client"
import { CommentIcon, StopIcon } from "@primer/octicons-react"
import React from "react"
import { nodes } from "~/src/util"
import { RefFragment } from "../types/RefFragment"
import { StyledGithubIcon } from "./GithubIcon"
import { GithubLabelFragment, GithubLabel } from "./Labels"

export const GithubRef: React.FC<{
  frag: RefFragment
  onSelectItem?: (frag: RefFragment) => void
}> = ({ frag, onSelectItem }) => {
  return (
    <>
      <span onClick={() => onSelectItem?.(frag)}>{frag.name}</span>
      <a href={frag.target?.commitUrl}>{frag.target?.oid.slice(0, 7)}</a>
      {nodes(frag.associatedPullRequests).map(e => (
        <React.Fragment key={e.number}>
          <a href={e.url}>#{e.number}</a>
          <span>{e.title}</span>
          <span>
            {nodes(e.labels).map(e => (
              <GithubLabel key={e.name} frag={e}></GithubLabel>
            ))}
          </span>
          <span>
            {e.mergeable === "CONFLICTING" && (
              <StyledGithubIcon as={StopIcon} style={{ color: "orange" }} />
            )}
          </span>
          <span>
            <CommentIcon />
            {[
              e.comments.totalCount,
              ...nodes(e.reviews).map(e => e.comments.totalCount),
            ].reduce((a, b) => a + b)}
          </span>
        </React.Fragment>
      ))}
    </>
  )
}

export const GithubRefFragment = gql`
  fragment RefFragment on Ref {
    name
    prefix
    target {
      oid
      commitUrl
    }
    associatedPullRequests(first: 1) {
      nodes {
        number
        title
        url
        isDraft
        mergeable
        baseRef {
          name
          prefix
          target {
            oid
            commitUrl
          }
        }
        labels(first: 10) {
          nodes {
            ...LabelFragment
          }
        }
        comments {
          totalCount
        }
        reviews(first: 10) {
          totalCount
          nodes {
            author {
              avatarUrl
              login
              url
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
  ${GithubLabelFragment}
`
