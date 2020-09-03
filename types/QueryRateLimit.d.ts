/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryRateLimit
// ====================================================

export interface QueryRateLimit_rateLimit {
  readonly __typename: "RateLimit";
  /**
   * The maximum number of points the client is permitted to consume in a 60 minute window.
   */
  readonly limit: number;
  /**
   * The point cost for the current query counting against the rate limit.
   */
  readonly cost: number;
  /**
   * The number of points remaining in the current rate limit window.
   */
  readonly remaining: number;
  /**
   * The time at which the current rate limit window resets in UTC epoch seconds.
   */
  readonly resetAt: any;
}

export interface QueryRateLimit {
  /**
   * The client's rate limit information.
   */
  readonly rateLimit: QueryRateLimit_rateLimit | null;
}
