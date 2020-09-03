/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { __TypeKind } from "./globalTypes";

// ====================================================
// GraphQL query operation: QuerySchema
// ====================================================

export interface QuerySchema___schema_types_possibleTypes {
  readonly __typename: "__Type";
  readonly name: string | null;
}

export interface QuerySchema___schema_types {
  readonly __typename: "__Type";
  readonly kind: __TypeKind;
  readonly name: string | null;
  readonly possibleTypes: ReadonlyArray<QuerySchema___schema_types_possibleTypes> | null;
}

export interface QuerySchema___schema {
  readonly __typename: "__Schema";
  /**
   * A list of all types supported by this server.
   */
  readonly types: ReadonlyArray<QuerySchema___schema_types>;
}

export interface QuerySchema {
  readonly __schema: QuerySchema___schema;
}
