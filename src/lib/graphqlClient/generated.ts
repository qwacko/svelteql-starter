import client from "./client";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, MutationOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: any;
  Duration: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: User;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  testResult?: Maybe<TestResult>;
  user?: Maybe<User>;
};


export type QueryTestResultArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type TestResult = {
  __typename?: 'TestResult';
  id: Scalars['ID'];
  requestTime: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  admin: Scalars['Boolean'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GetTestDataQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTestDataQuery = { __typename?: 'Query', testResult?: { __typename?: 'TestResult', id: string, title: string, requestTime: string } | null };

export type UserDisplayedDataFragment = { __typename?: 'User', id: string, name: string, email: string, admin: boolean };

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, admin: boolean } | null };

export type UpdateUserNameMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateUserNameMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, admin: boolean } };

export const UserDisplayedDataFragmentDoc = gql`
    fragment UserDisplayedData on User {
  id
  name
  email
  admin
}
    `;
export const GetTestDataDoc = gql`
    query GetTestData($id: String!) {
  testResult(id: $id) {
    id
    title
    requestTime
  }
}
    `;
export const GetUserDataDoc = gql`
    query GetUserData {
  user {
    ...UserDisplayedData
  }
}
    ${UserDisplayedDataFragmentDoc}`;
export const UpdateUserNameDoc = gql`
    mutation UpdateUserName($id: String!, $name: String!) {
  updateUser(id: $id, input: {name: $name}) {
    ...UserDisplayedData
  }
}
    ${UserDisplayedDataFragmentDoc}`;
export const GetTestData = (
            options: Omit<
              WatchQueryOptions<GetTestDataQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetTestDataQuery> & {
              query: ObservableQuery<
                GetTestDataQuery,
                GetTestDataQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetTestDataDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetTestDataQuery> & {
                query: ObservableQuery<
                  GetTestDataQuery,
                  GetTestDataQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const GetUserData = (
            options: Omit<
              WatchQueryOptions<GetUserDataQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetUserDataQuery> & {
              query: ObservableQuery<
                GetUserDataQuery,
                GetUserDataQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetUserDataDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetUserDataQuery> & {
                query: ObservableQuery<
                  GetUserDataQuery,
                  GetUserDataQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const UpdateUserName = (
            options: Omit<
              MutationOptions<any, UpdateUserNameMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<UpdateUserNameMutation, UpdateUserNameMutationVariables>({
              mutation: UpdateUserNameDoc,
              ...options,
            });
            return m;
          }