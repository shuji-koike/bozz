/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RepositoriesFragmentConnection
// ====================================================

export interface RepositoriesFragmentConnection_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface RepositoriesFragmentConnection_nodes_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface RepositoriesFragmentConnection_nodes {
  readonly __typename: "Repository";
  readonly id: string;
  /**
   * The HTTP URL for this repository
   */
  readonly url: any;
  /**
   * The name of the repository.
   */
  readonly name: string;
  /**
   * The repository's name with owner.
   */
  readonly nameWithOwner: string;
  /**
   * Indicates if the repository is unmaintained.
   */
  readonly isArchived: boolean;
  /**
   * Identifies if the repository is a fork.
   */
  readonly isFork: boolean;
  /**
   * Identifies if the repository is private.
   */
  readonly isPrivate: boolean;
  /**
   * The User owner of the repository.
   */
  readonly owner: RepositoriesFragmentConnection_nodes_owner;
}

export interface RepositoriesFragmentConnection {
  readonly __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: RepositoriesFragmentConnection_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(RepositoriesFragmentConnection_nodes | null)> | null;
}
