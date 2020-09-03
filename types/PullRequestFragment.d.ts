/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PullRequestReviewDecision } from "./globalTypes";

// ====================================================
// GraphQL fragment: PullRequestFragment
// ====================================================

export interface PullRequestFragment_commits {
  readonly __typename: "PullRequestCommitConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface PullRequestFragment_comments {
  readonly __typename: "IssueCommentConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface PullRequestFragment_reviews_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface PullRequestFragment_reviews_nodes_comments_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface PullRequestFragment_reviews_nodes_comments_nodes {
  readonly __typename: "PullRequestReviewComment";
  /**
   * Returns whether or not a comment has been minimized.
   */
  readonly isMinimized: boolean;
}

export interface PullRequestFragment_reviews_nodes_comments {
  readonly __typename: "PullRequestReviewCommentConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: PullRequestFragment_reviews_nodes_comments_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(PullRequestFragment_reviews_nodes_comments_nodes | null)> | null;
}

export interface PullRequestFragment_reviews_nodes {
  readonly __typename: "PullRequestReview";
  /**
   * A list of review comments for the current pull request review.
   */
  readonly comments: PullRequestFragment_reviews_nodes_comments;
}

export interface PullRequestFragment_reviews {
  readonly __typename: "PullRequestReviewConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: PullRequestFragment_reviews_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(PullRequestFragment_reviews_nodes | null)> | null;
}

export interface PullRequestFragment {
  readonly __typename: "PullRequest";
  readonly id: string;
  /**
   * The HTTP URL for this pull request.
   */
  readonly url: any;
  /**
   * Identifies the pull request number.
   */
  readonly number: number;
  /**
   * Identifies the pull request title.
   */
  readonly title: string;
  /**
   * The body as Markdown.
   */
  readonly body: string;
  /**
   * Identifies the date and time when the object was created.
   */
  readonly createdAt: any;
  /**
   * Identifies the date and time when the object was closed.
   */
  readonly closedAt: any | null;
  /**
   * `true` if the pull request is closed
   */
  readonly closed: boolean;
  /**
   * Identifies if the pull request is a draft.
   */
  readonly isDraft: boolean;
  /**
   * The number of additions in this pull request.
   */
  readonly additions: number;
  /**
   * The number of deletions in this pull request.
   */
  readonly deletions: number;
  /**
   * The current status of this pull request with respect to code review.
   */
  readonly reviewDecision: PullRequestReviewDecision | null;
  /**
   * A list of commits present in this pull request's head branch not present in the base branch.
   */
  readonly commits: PullRequestFragment_commits;
  /**
   * A list of comments associated with the pull request.
   */
  readonly comments: PullRequestFragment_comments;
  /**
   * A list of reviews associated with the pull request.
   */
  readonly reviews: PullRequestFragment_reviews | null;
}
