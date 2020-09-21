/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Whether or not a PullRequest can be merged.
 */
export enum MergeableState {
  CONFLICTING = "CONFLICTING",
  MERGEABLE = "MERGEABLE",
  UNKNOWN = "UNKNOWN",
}

/**
 * Possible directions in which to order a list of items when provided an `orderBy` argument.
 */
export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * The review status of a pull request.
 */
export enum PullRequestReviewDecision {
  APPROVED = "APPROVED",
  CHANGES_REQUESTED = "CHANGES_REQUESTED",
  REVIEW_REQUIRED = "REVIEW_REQUIRED",
}

/**
 * Properties by which repository connections can be ordered.
 */
export enum RepositoryOrderField {
  CREATED_AT = "CREATED_AT",
  NAME = "NAME",
  PUSHED_AT = "PUSHED_AT",
  STARGAZERS = "STARGAZERS",
  UPDATED_AT = "UPDATED_AT",
}

/**
 * Ordering options for repository connections
 */
export interface RepositoryOrder {
  readonly field: RepositoryOrderField;
  readonly direction: OrderDirection;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
