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
> = ({ frag, onSelectItem, ...props }) => {
  return (
    <>
      <BranchName
        {...props}
        title={frag.name}
        onClick={() => onSelectItem?.(frag)}>
        {frag.name}
      </BranchName>
      <CounterLabel>
        <a href={frag.target?.commitUrl}>{frag.target?.oid.slice(0, 7)}</a>
      </CounterLabel>
      <span>
        {nodes(frag.associatedPullRequests).map(e => (
          <span key={e.number}>
            <a href={e.url}>#{e.number}</a>
            {e.title}
            {nodes(e.labels).map(e => (
              <GithubLabel key={e.name} frag={e}></GithubLabel>
            ))}
          </span>
        ))}
      </span>
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
