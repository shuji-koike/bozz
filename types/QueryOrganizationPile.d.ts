/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryOrganizationPile
// ====================================================

export interface QueryOrganizationPile_organization_repositories_nodes_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryOrganizationPile_organization_repositories_nodes {
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
  readonly owner: QueryOrganizationPile_organization_repositories_nodes_owner;
}

export interface QueryOrganizationPile_organization_repositories {
  readonly __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryOrganizationPile_organization_repositories_nodes | null)> | null;
}

export interface QueryOrganizationPile_organization_membersWithRole_pageInfo {
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

export interface QueryOrganizationPile_organization_membersWithRole_nodes_issues_pageInfo {
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

export interface QueryOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository {
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
  readonly owner: QueryOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository_owner;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_issues_nodes {
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
  readonly repository: QueryOrganizationPile_organization_membersWithRole_nodes_issues_nodes_repository;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: QueryOrganizationPile_organization_membersWithRole_nodes_issues_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryOrganizationPile_organization_membersWithRole_nodes_issues_nodes | null)> | null;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_pageInfo {
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

export interface QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository {
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
  readonly owner: QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository_owner;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes {
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
  readonly repository: QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes_repository;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests_nodes | null)> | null;
}

export interface QueryOrganizationPile_organization_membersWithRole_nodes {
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
  readonly issues: QueryOrganizationPile_organization_membersWithRole_nodes_issues;
  /**
   * A list of pull requests associated with this user.
   */
  readonly pullRequests: QueryOrganizationPile_organization_membersWithRole_nodes_pullRequests;
}

export interface QueryOrganizationPile_organization_membersWithRole {
  readonly __typename: "OrganizationMemberConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: QueryOrganizationPile_organization_membersWithRole_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryOrganizationPile_organization_membersWithRole_nodes | null)> | null;
}

export interface QueryOrganizationPile_organization {
  readonly __typename: "Organization";
  readonly id: string;
  /**
   * The HTTP URL for this organization.
   */
  readonly url: any;
  /**
   * The organization's public profile name.
   */
  readonly name: string | null;
  /**
   * The organization's login name.
   */
  readonly login: string;
  /**
   * A list of repositories that the user owns.
   */
  readonly repositories: QueryOrganizationPile_organization_repositories;
  /**
   * A list of users who are members of this organization.
   */
  readonly membersWithRole: QueryOrganizationPile_organization_membersWithRole;
}

export interface QueryOrganizationPile {
  /**
   * Lookup a organization by login.
   */
  readonly organization: QueryOrganizationPile_organization | null;
}

export interface QueryOrganizationPileVariables {
  readonly login: string;
  readonly limit?: number | null;
  readonly after?: string | null;
}
