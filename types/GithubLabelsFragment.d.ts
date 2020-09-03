/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GithubLabelsFragment
// ====================================================

export interface GithubLabelsFragment_labels_nodes {
  readonly __typename: "Label";
  /**
   * Identifies the label name.
   */
  readonly name: string;
  /**
   * Identifies the label color.
   */
  readonly color: string;
}

export interface GithubLabelsFragment_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubLabelsFragment_labels_nodes | null)> | null;
}

export interface GithubLabelsFragment {
  readonly __typename: "Issue" | "PullRequest";
  /**
   * A list of labels associated with the object.
   */
  readonly labels: GithubLabelsFragment_labels | null;
}
