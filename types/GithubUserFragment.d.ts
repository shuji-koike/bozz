/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PullRequestReviewDecision } from "./globalTypes";

// ====================================================
// GraphQL fragment: GithubUserFragment
// ====================================================

export interface GithubUserFragment_issues_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface GithubUserFragment_issues_nodes {
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
}

export interface GithubUserFragment_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GithubUserFragment_issues_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_issues_nodes | null)> | null;
}

export interface GithubUserFragment_pullRequests_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface GithubUserFragment_pullRequests_nodes_commits {
  readonly __typename: "PullRequestCommitConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface GithubUserFragment_pullRequests_nodes_comments {
  readonly __typename: "IssueCommentConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface GithubUserFragment_pullRequests_nodes_reviews_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface GithubUserFragment_pullRequests_nodes_reviews_nodes_comments_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface GithubUserFragment_pullRequests_nodes_reviews_nodes_comments_nodes {
  readonly __typename: "PullRequestReviewComment";
  /**
   * Returns whether or not a comment has been minimized.
   */
  readonly isMinimized: boolean;
}

export interface GithubUserFragment_pullRequests_nodes_reviews_nodes_comments {
  readonly __typename: "PullRequestReviewCommentConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GithubUserFragment_pullRequests_nodes_reviews_nodes_comments_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_pullRequests_nodes_reviews_nodes_comments_nodes | null)> | null;
}

export interface GithubUserFragment_pullRequests_nodes_reviews_nodes {
  readonly __typename: "PullRequestReview";
  /**
   * A list of review comments for the current pull request review.
   */
  readonly comments: GithubUserFragment_pullRequests_nodes_reviews_nodes_comments;
}

export interface GithubUserFragment_pullRequests_nodes_reviews {
  readonly __typename: "PullRequestReviewConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GithubUserFragment_pullRequests_nodes_reviews_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_pullRequests_nodes_reviews_nodes | null)> | null;
}

export interface GithubUserFragment_pullRequests_nodes {
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
  readonly commits: GithubUserFragment_pullRequests_nodes_commits;
  /**
   * A list of comments associated with the pull request.
   */
  readonly comments: GithubUserFragment_pullRequests_nodes_comments;
  /**
   * A list of reviews associated with the pull request.
   */
  readonly reviews: GithubUserFragment_pullRequests_nodes_reviews | null;
}

export interface GithubUserFragment_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GithubUserFragment_pullRequests_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_pullRequests_nodes | null)> | null;
}

export interface GithubUserFragment_repositories_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface GithubUserFragment_repositories_nodes_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GithubUserFragment_repositories_nodes {
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
  readonly owner: GithubUserFragment_repositories_nodes_owner;
}

export interface GithubUserFragment_repositories {
  readonly __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GithubUserFragment_repositories_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_repositories_nodes | null)> | null;
}

export interface GithubUserFragment_organizations_nodes_repositories_pageInfo {
  readonly __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  readonly hasNextPage: boolean;
}

export interface GithubUserFragment_organizations_nodes_repositories_nodes_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface GithubUserFragment_organizations_nodes_repositories_nodes {
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
  readonly owner: GithubUserFragment_organizations_nodes_repositories_nodes_owner;
}

export interface GithubUserFragment_organizations_nodes_repositories {
  readonly __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GithubUserFragment_organizations_nodes_repositories_pageInfo;
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_organizations_nodes_repositories_nodes | null)> | null;
}

export interface GithubUserFragment_organizations_nodes {
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
  readonly repositories: GithubUserFragment_organizations_nodes_repositories;
}

export interface GithubUserFragment_organizations {
  readonly __typename: "OrganizationConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubUserFragment_organizations_nodes | null)> | null;
}

export interface GithubUserFragment {
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
  readonly issues: GithubUserFragment_issues;
  /**
   * A list of pull requests associated with this user.
   */
  readonly pullRequests: GithubUserFragment_pullRequests;
  /**
   * A list of repositories that the user owns.
   */
  readonly repositories: GithubUserFragment_repositories;
  /**
   * A list of organizations the user belongs to.
   */
  readonly organizations: GithubUserFragment_organizations;
}
