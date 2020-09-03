/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryMilestones
// ====================================================

export interface QueryMilestones_repository_owner {
  readonly __typename: "Organization" | "User";
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryMilestones_repository_milestones_nodes_issues_nodes_assignees_nodes {
  readonly __typename: "User";
  /**
   * A URL pointing to the user's public avatar.
   */
  readonly avatarUrl: any;
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryMilestones_repository_milestones_nodes_issues_nodes_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes_issues_nodes_assignees_nodes | null)> | null;
}

export interface QueryMilestones_repository_milestones_nodes_issues_nodes_labels_nodes {
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

export interface QueryMilestones_repository_milestones_nodes_issues_nodes_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes_issues_nodes_labels_nodes | null)> | null;
}

export interface QueryMilestones_repository_milestones_nodes_issues_nodes {
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
   * A list of Users assigned to this object.
   */
  readonly assignees: QueryMilestones_repository_milestones_nodes_issues_nodes_assignees;
  /**
   * A list of labels associated with the object.
   */
  readonly labels: QueryMilestones_repository_milestones_nodes_issues_nodes_labels | null;
}

export interface QueryMilestones_repository_milestones_nodes_issues {
  readonly __typename: "IssueConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes_issues_nodes | null)> | null;
}

export interface QueryMilestones_repository_milestones_nodes_pullRequests_nodes_assignees_nodes {
  readonly __typename: "User";
  /**
   * A URL pointing to the user's public avatar.
   */
  readonly avatarUrl: any;
  /**
   * The username used to login.
   */
  readonly login: string;
}

export interface QueryMilestones_repository_milestones_nodes_pullRequests_nodes_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes_pullRequests_nodes_assignees_nodes | null)> | null;
}

export interface QueryMilestones_repository_milestones_nodes_pullRequests_nodes_labels_nodes {
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

export interface QueryMilestones_repository_milestones_nodes_pullRequests_nodes_labels {
  readonly __typename: "LabelConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes_pullRequests_nodes_labels_nodes | null)> | null;
}

export interface QueryMilestones_repository_milestones_nodes_pullRequests_nodes {
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
   * A list of Users assigned to this object.
   */
  readonly assignees: QueryMilestones_repository_milestones_nodes_pullRequests_nodes_assignees;
  /**
   * A list of labels associated with the object.
   */
  readonly labels: QueryMilestones_repository_milestones_nodes_pullRequests_nodes_labels | null;
}

export interface QueryMilestones_repository_milestones_nodes_pullRequests {
  readonly __typename: "PullRequestConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes_pullRequests_nodes | null)> | null;
}

export interface QueryMilestones_repository_milestones_nodes {
  readonly __typename: "Milestone";
  readonly id: string;
  /**
   * The HTTP URL for this milestone
   */
  readonly url: any;
  /**
   * Identifies the number of the milestone.
   */
  readonly number: number;
  /**
   * Identifies the title of the milestone.
   */
  readonly title: string;
  /**
   * Identifies the date and time when the object was created.
   */
  readonly createdAt: any;
  /**
   * Identifies the due date of the milestone.
   */
  readonly dueOn: any | null;
  /**
   * A list of issues associated with the milestone.
   */
  readonly issues: QueryMilestones_repository_milestones_nodes_issues;
  /**
   * A list of pull requests associated with the milestone.
   */
  readonly pullRequests: QueryMilestones_repository_milestones_nodes_pullRequests;
}

export interface QueryMilestones_repository_milestones {
  readonly __typename: "MilestoneConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(QueryMilestones_repository_milestones_nodes | null)> | null;
}

export interface QueryMilestones_repository {
  readonly __typename: "Repository";
  /**
   * Identifies the primary key from the database.
   */
  readonly databaseId: number | null;
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
  readonly owner: QueryMilestones_repository_owner;
  /**
   * A list of milestones associated with the repository.
   */
  readonly milestones: QueryMilestones_repository_milestones | null;
}

export interface QueryMilestones {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  readonly repository: QueryMilestones_repository | null;
}

export interface QueryMilestonesVariables {
  readonly owner: string;
  readonly name: string;
  readonly first?: number | null;
}
