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

export interface QueryRepository_repository {
  readonly __typename: "Repository";
  /**
   * The User owner of the repository.
   */
  readonly owner: QueryRepository_repository_owner;
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * A list of labels associated with the repository.
   */
  readonly labels: QueryRepository_repository_labels | null;
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
