import { gql } from "@apollo/client"
import { BranchName, BranchNameProps, CounterLabel } from "@primer/components"
import React from "react"
import { RefFragment } from "../types/RefFragment"
import { GithubLabelFragment, GithubLabel } from "./Labels"
import { nodes } from "~/src/util"

export const GithubRef: React.FC<
  BranchNameProps & {
    frag: RefFragment
  }
> = ({ frag, ...props }) => {
  return (
    <>
      <BranchName title={frag.name} {...props}>
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
    target {
      oid
      commitUrl
    }
    associatedPullRequests(first: 2) {
      nodes {
        number
        title
        url
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
