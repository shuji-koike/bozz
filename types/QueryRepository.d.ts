/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryRepository
// ====================================================

export interface QueryRepository_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryRepository_repository_labels_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface QueryRepository_repository_labels_nodes {
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
  readonly issues: QueryRepository_repository_labels_nodes_issues;
}

export interface QueryRepository_repository_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryRepository_repository_labels_nodes | null)> | null;
}

export interface QueryRepository_repository_refs_nodes_target {
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

export interface QueryRepository_repository_refs_nodes_associatedPullRequests_nodes_labels_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface QueryRepository_repository_refs_nodes_associatedPullRequests_nodes_labels_nodes {
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
  readonly issues: QueryRepository_repository_refs_nodes_associatedPullRequests_nodes_labels_nodes_issues;
}

export interface QueryRepository_repository_refs_nodes_associatedPullRequests_nodes_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryRepository_repository_refs_nodes_associatedPullRequests_nodes_labels_nodes | null)> | null;
}

export interface QueryRepository_repository_refs_nodes_associatedPullRequests_nodes {
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
   * A list of labels associated with the object.
   */
  readonly labels: QueryRepository_repository_refs_nodes_associatedPullRequests_nodes_labels | null;
}

export interface QueryRepository_repository_refs_nodes_associatedPullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryRepository_repository_refs_nodes_associatedPullRequests_nodes | null)> | null;
}

export interface QueryRepository_repository_refs_nodes {
  readonly __typename: "Ref";
  /**
   * The ref name.
   */
  readonly name: string;
  /**
   * The object the ref points to. Returns null when object does not exist.
   */
  readonly target: QueryRepository_repository_refs_nodes_target | null;
  /**
   * A list of pull requests with this ref as the head ref.
   */
  readonly associatedPullRequests: QueryRepository_repository_refs_nodes_associatedPullRequests;
}

export interface QueryRepository_repository_refs {
  readonly __typename: "RefConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryRepository_repository_refs_nodes | null)> | null;
}

export interface QueryRepository_repository {
  readonly __typename: "Repository";
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The SSH URL to clone this repository
   */
  readonly sshUrl: any;
  /**
   * The User owner of the repository.
   */
  readonly owner: QueryRepository_repository_owner;
  /**
   * A list of labels associated with the repository.
   */
  readonly labels: QueryRepository_repository_labels | null;
  /**
   * Fetch a list of refs from the repository
   */
  readonly refs: QueryRepository_repository_refs | null;
}

export interface QueryRepository {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  readonly repository: QueryRepository_repository | null;
}

export interface QueryRepositoryVariables {
  readonly owner: string;
  readonly name: string;
}
