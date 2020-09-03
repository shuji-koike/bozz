import { gql } from "@apollo/client"
import {
  CheckIcon,
  CommentIcon,
  CommentDiscussionIcon,
  GitCommitIcon,
  FileDiffIcon,
} from "@primer/octicons-react"
import React from "react"
import { PullRequestFragment } from "../types/PullRequestFragment"
import { GithubItem, GithubItemFragment } from "./GithubItem"

export const PullRequestItem: React.FC<{
  frag: PullRequestFragment
}> = ({ frag }) => {
  const count = {
    comments: frag.reviews?.nodes
      ?.flatMap(e => e?.comments.nodes)
      .filter(e => !e?.isMinimized).length,
    commentsTotal: frag.reviews?.nodes
      ?.map(e => e?.comments.totalCount || 0)
      .reduce((a, e) => a + e, 0),
  }
  return (
    <GithubItem frag={frag}>
      <label>
        <GitCommitIcon />
        {frag.commits.totalCount}
      </label>
      <label>
        <FileDiffIcon />
        {!!frag.additions && <span>+{frag.additions}</span>}
        {!!frag.deletions && <span>-{frag.deletions}</span>}
      </label>
      {!!count.comments && (
        <label>
          <CommentIcon />
          {frag.comments.totalCount}
        </label>
      )}
      {!!count.commentsTotal && (
        <label>
          <CommentDiscussionIcon />
          {count.comments}/{count.commentsTotal}
        </label>
      )}
      {frag.reviewDecision === "APPROVED" && (
        <label title="PR is approved">
          <CheckIcon />
        </label>
      )}
    </GithubItem>
  )
}

export const PullRequestItemFragment = gql`
  fragment PullRequestFragment on PullRequest {
    ...GithubItemFragmentPullRequest
    additions
    deletions
    reviewDecision
    commits {
      totalCount
    }
    comments {
      totalCount
    }
    reviews(last: 10) {
      totalCount
      pageInfo {
        hasNextPage
      }
      nodes {
        comments(last: 10) {
          totalCount
          pageInfo {
            hasNextPage
          }
          nodes {
            isMinimized
          }
        }
      }
    }
  }
  ${GithubItemFragment.PullRequest}
`
