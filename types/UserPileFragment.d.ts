/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserPileFragment
// ====================================================

export interface UserPileFragment_issues_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  readonly endCursor: string | null;
}

export interface UserPileFragment_issues_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface UserPileFragment_issues_nodes_repository {
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
  readonly owner: UserPileFragment_issues_nodes_repository_owner;
}

export interface UserPileFragment_issues_nodes {
  readonly __typename: "Issue";
  readonly id: string;
  /**
   * The HTTP URL for this issue
   */
  readonly url: any;
  /**
   * Identifies the issue number.
   */
  readonly number: number;
  /**
   * Identifies the issue title.
   */
  readonly title: string;
  /**
   * Identifies the body of the issue.
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
   * `true` if the object is closed (definition of closed may depend on type)
   */
  readonly closed: boolean;
  /**
   * The repository associated with this node.
   */
  readonly repository: UserPileFragment_issues_nodes_repository;
}

export interface UserPileFragment_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: UserPileFragment_issues_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(UserPileFragment_issues_nodes | null)> | null;
}

export interface UserPileFragment_pullRequests_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  readonly endCursor: string | null;
}

export interface UserPileFragment_pullRequests_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface UserPileFragment_pullRequests_nodes_repository {
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
  readonly owner: UserPileFragment_pullRequests_nodes_repository_owner;
}

export interface UserPileFragment_pullRequests_nodes {
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
   * The repository associated with this node.
   */
  readonly repository: UserPileFragment_pullRequests_nodes_repository;
}

export interface UserPileFragment_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: UserPileFragment_pullRequests_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(UserPileFragment_pullRequests_nodes | null)> | null;
}

export interface UserPileFragment {
  readonly __typename: "User";
  readonly id: string;
  /**
   * The HTTP URL for this user
   */
  readonly url: any;
  /**
   * The user's public profile name.
   */
  readonly name: string | null;
  /**
   * The username used to login.
   */
  readonly login: string;
  /**
   * A list of issues associated with this user.
   */
  readonly issues: UserPileFragment_issues;
  /**
   * A list of pull requests associated with this user.
   */
  readonly pullRequests: UserPileFragment_pullRequests;
}
