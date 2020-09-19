import { gql } from "@apollo/client"
import { BranchName, BranchNameProps, CounterLabel } from "@primer/components"
import React from "react"
import { nodes } from "~/src/util"
import { RefFragment } from "../types/RefFragment"
import { GithubLabelFragment, GithubLabel } from "./Labels"

export const GithubRef: React.FC<
  BranchNameProps & {
    frag: RefFragment
    onSelectItem?: (frag: RefFragment) => void
  }
> = ({ frag, onSelectItem }) => {
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
    associatedPullRequests(first: 2) {
      nodes {
        number
        title
        url
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
      }
    }
  }
  ${GithubLabelFragment}
`
