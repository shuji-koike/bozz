/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LabelFragment
// ====================================================

export interface LabelFragment_issues {
  readonly __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  readonly totalCount: number;
}

export interface LabelFragment {
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
  readonly issues: LabelFragment_issues;
}
