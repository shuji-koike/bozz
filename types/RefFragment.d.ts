/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MergeableState } from "./globalTypes";

// ====================================================
// GraphQL fragment: RefFragment
// ====================================================

export interface RefFragment_target {
  readonly __typename: "Blob" | "Commit" | "Tag" | "Tree";
  /**
   * The Git object ID
   */
  readonly oid: any;
  /**
   * The HTTP URL for this Git object
   */
  readonly commitUrl: any;
}

export interface RefFragment_associatedPullRequests_nodes_baseRef_target {
  readonly __typename: "Blob" | "Commit" | "Tag" | "Tree";
  /**
   * The Git object ID
   */
  readonly oid: any;
  /**
   * The HTTP URL for this Git object
   */
  readonly commitUrl: any;
}

export interface RefFragment_associatedPullRequests_nodes_baseRef {
  readonly __typename: "Ref";
  /**
   * The ref name.
   */
  readonly name: string;
  /**
   * The ref's prefix, such as `refs/heads/` or `refs/tags/`.
   */
  readonly prefix: string;
  /**
   * The object the ref points to. Returns null when object does not exist.
   */
  readonly target: RefFragment_associatedPullRequests_nodes_baseRef_target | null;
}

export interface RefFragment_associatedPullRequests_nodes_labels_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface RefFragment_associatedPullRequests_nodes_labels_nodes {
  readonly __typename: "Label";
  /**
   * Identifies the label name.
   */
  readonly name: string;
  /**
   * A brief description of this label.
   */
  readonly description: string | null;
  /**
   * Identifies the label color.
   */
  readonly color: string;
  /**
   * A list of issues associated with this label.
   */
  readonly issues: RefFragment_associatedPullRequests_nodes_labels_nodes_issues;
}

export interface RefFragment_associatedPullRequests_nodes_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(RefFragment_associatedPullRequests_nodes_labels_nodes | null)> | null;
}

export interface RefFragment_associatedPullRequests_nodes_comments {
  readonly __typename: "IssueCommentConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface RefFragment_associatedPullRequests_nodes_reviews_nodes_author {
  readonly __typename: "Bot" | "EnterpriseUserAccount" | "Mannequin" | "Organization" | "User";
  /**
   * A URL pointing to the actor's public avatar.
   */
  readonly avatarUrl: any;
  /**
   * The username of the actor.
   */
  readonly login: string;
  /**
   * The HTTP URL for this actor.
   */
  readonly url: any;
}

export interface RefFragment_associatedPullRequests_nodes_reviews_nodes_comments {
  readonly __typename: "PullRequestReviewCommentConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface RefFragment_associatedPullRequests_nodes_reviews_nodes {
  readonly __typename: "PullRequestReview";
  /**
   * The actor who authored the comment.
   */
  readonly author: RefFragment_associatedPullRequests_nodes_reviews_nodes_author | null;
  /**
   * A list of review comments for the current pull request review.
   */
  readonly comments: RefFragment_associatedPullRequests_nodes_reviews_nodes_comments;
}

export interface RefFragment_associatedPullRequests_nodes_reviews {
  readonly __typename: "PullRequestReviewConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(RefFragment_associatedPullRequests_nodes_reviews_nodes | null)> | null;
}

export interface RefFragment_associatedPullRequests_nodes {
  readonly __typename: "PullRequest";
  /**
   * Identifies the pull request number.
   */
  readonly number: number;
  /**
   * Identifies the pull request title.
   */
  readonly title: string;
  /**
   * The HTTP URL for this pull request.
   */
  readonly url: any;
  /**
   * Identifies if the pull request is a draft.
   */
  readonly isDraft: boolean;
  /**
   * Whether or not the pull request can be merged based on the existence of merge conflicts.
   */
  readonly mergeable: MergeableState;
  /**
   * Identifies the base Ref associated with the pull request.
   */
  readonly baseRef: RefFragment_associatedPullRequests_nodes_baseRef | null;
  /**
   * A list of labels associated with the object.
   */
  readonly labels: RefFragment_associatedPullRequests_nodes_labels | null;
  /**
   * A list of comments associated with the pull request.
   */
  readonly comments: RefFragment_associatedPullRequests_nodes_comments;
  /**
   * A list of reviews associated with the pull request.
   */
  readonly reviews: RefFragment_associatedPullRequests_nodes_reviews | null;
}

export interface RefFragment_associatedPullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(RefFragment_associatedPullRequests_nodes | null)> | null;
}

export interface RefFragment {
  readonly __typename: "Ref";
  /**
   * The ref name.
   */
  readonly name: string;
  /**
   * The ref's prefix, such as `refs/heads/` or `refs/tags/`.
   */
  readonly prefix: string;
  /**
   * The object the ref points to. Returns null when object does not exist.
   */
  readonly target: RefFragment_target | null;
  /**
   * A list of pull requests with this ref as the head ref.
   */
  readonly associatedPullRequests: RefFragment_associatedPullRequests;
}
