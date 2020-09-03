/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GithubItemFragmentMilestone
// ====================================================

export interface GithubItemFragmentMilestone {
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
}
