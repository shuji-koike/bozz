/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GithubAssigneesFragment
// ====================================================

export interface GithubAssigneesFragment_assignees_nodes {
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

export interface GithubAssigneesFragment_assignees {
  readonly __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  readonly nodes: ReadonlyArray<(GithubAssigneesFragment_assignees_nodes | null)> | null;
}

export interface GithubAssigneesFragment {
  readonly __typename: "Issue" | "PullRequest";
  /**
   * A list of Users assigned to this object.
   */
  readonly assignees: GithubAssigneesFragment_assignees;
}
