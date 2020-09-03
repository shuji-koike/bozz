/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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
 * An enum describing what kind of type a given `__Type` is.
 */
export enum __TypeKind {
  ENUM = "ENUM",
  INPUT_OBJECT = "INPUT_OBJECT",
  INTERFACE = "INTERFACE",
  LIST = "LIST",
  NON_NULL = "NON_NULL",
  OBJECT = "OBJECT",
  SCALAR = "SCALAR",
  UNION = "UNION",
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
