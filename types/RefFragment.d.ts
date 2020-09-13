/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

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
   * Identifies the base Ref associated with the pull request.
   */
  readonly baseRef: RefFragment_associatedPullRequests_nodes_baseRef | null;
  /**
   * A list of labels associated with the object.
   */
  readonly labels: RefFragment_associatedPullRequests_nodes_labels | null;
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
