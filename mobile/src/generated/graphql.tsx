import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Battery = {
   __typename?: 'Battery',
  value?: Maybe<Scalars['Float']>,
  createdAt?: Maybe<Scalars['String']>,
};

/** Creates a patch. */
export type CreatePatchInput = {
  bleId?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['Int']>,
};

export type CreatePatchPayload = {
   __typename?: 'CreatePatchPayload',
  /** The patch created. */
  patch?: Maybe<Patch>,
};

/** Creates a reading for a given patch. */
export type CreateReadingInput = {
  patchId?: Maybe<Scalars['Int']>,
  patchBleId?: Maybe<Scalars['ID']>,
  uri?: Maybe<Scalars['String']>,
};

export type CreateReadingPayload = {
   __typename?: 'CreateReadingPayload',
  /** The patch created. */
  reading?: Maybe<Reading>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updatePatch?: Maybe<UpdatePatchPayload>,
  createPatch?: Maybe<CreatePatchPayload>,
  createReading?: Maybe<CreateReadingPayload>,
  version?: Maybe<Scalars['String']>,
};


export type MutationUpdatePatchArgs = {
  input: UpdatePatchInput
};


export type MutationCreatePatchArgs = {
  input: CreatePatchInput
};


export type MutationCreateReadingArgs = {
  input: CreateReadingInput
};

export type Patch = {
   __typename?: 'Patch',
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
  battery?: Maybe<Battery>,
  batteryActivity?: Maybe<Array<Battery>>,
  firmwareVersion?: Maybe<Scalars['String']>,
  appVersion?: Maybe<Scalars['String']>,
  mobileDevice?: Maybe<Scalars['String']>,
  readingCount?: Maybe<Scalars['Int']>,
  readings?: Maybe<Array<Reading>>,
};

export type Query = {
   __typename?: 'Query',
  version?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>
};

export type Reading = {
   __typename?: 'Reading',
  id: Scalars['Int'],
  createdAt?: Maybe<Scalars['String']>,
  uri?: Maybe<Scalars['String']>,
};

/** Updates patch of provided ID. */
export type UpdatePatchInput = {
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
};

export type UpdatePatchPayload = {
   __typename?: 'UpdatePatchPayload',
  /** The patch updated. */
  patch?: Maybe<Patch>,
};

export type User = {
   __typename?: 'User',
  patches: Array<Patch>,
  patch?: Maybe<Patch>,
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};


export type UserPatchArgs = {
  id: Scalars['Int']
};

export type CreateReadingMutationVariables = {
  input: CreateReadingInput
};


export type CreateReadingMutation = (
  { __typename?: 'Mutation' }
  & { createReading: Maybe<(
    { __typename?: 'CreateReadingPayload' }
    & { reading: Maybe<(
      { __typename?: 'Reading' }
      & Pick<Reading, 'uri'>
    )> }
  )> }
);

export type GetViewer2QueryVariables = {};


export type GetViewer2Query = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type GetViewerQueryVariables = {};


export type GetViewerQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'firstName' | 'lastName'>
  )> }
);


export const CreateReadingDocument = gql`
    mutation CreateReading($input: CreateReadingInput!) {
  createReading(input: $input) {
    reading {
      uri
    }
  }
}
    `;
export type CreateReadingMutationFn = ApolloReactCommon.MutationFunction<CreateReadingMutation, CreateReadingMutationVariables>;
export type CreateReadingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateReadingMutation, CreateReadingMutationVariables>, 'mutation'>;

    export const CreateReadingComponent = (props: CreateReadingComponentProps) => (
      <ApolloReactComponents.Mutation<CreateReadingMutation, CreateReadingMutationVariables> mutation={CreateReadingDocument} {...props} />
    );
    
export type CreateReadingProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateReadingMutation, CreateReadingMutationVariables> & TChildProps;
export function withCreateReading<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateReadingMutation,
  CreateReadingMutationVariables,
  CreateReadingProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateReadingMutation, CreateReadingMutationVariables, CreateReadingProps<TChildProps>>(CreateReadingDocument, {
      alias: 'createReading',
      ...operationOptions
    });
};

/**
 * __useCreateReadingMutation__
 *
 * To run a mutation, you first call `useCreateReadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReadingMutation, { data, loading, error }] = useCreateReadingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReadingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReadingMutation, CreateReadingMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateReadingMutation, CreateReadingMutationVariables>(CreateReadingDocument, baseOptions);
      }
export type CreateReadingMutationHookResult = ReturnType<typeof useCreateReadingMutation>;
export type CreateReadingMutationResult = ApolloReactCommon.MutationResult<CreateReadingMutation>;
export type CreateReadingMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReadingMutation, CreateReadingMutationVariables>;
export const GetViewer2Document = gql`
    query GetViewer2 {
  viewer {
    username
    id
  }
}
    `;
export type GetViewer2ComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetViewer2Query, GetViewer2QueryVariables>, 'query'>;

    export const GetViewer2Component = (props: GetViewer2ComponentProps) => (
      <ApolloReactComponents.Query<GetViewer2Query, GetViewer2QueryVariables> query={GetViewer2Document} {...props} />
    );
    
export type GetViewer2Props<TChildProps = {}> = ApolloReactHoc.DataProps<GetViewer2Query, GetViewer2QueryVariables> & TChildProps;
export function withGetViewer2<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetViewer2Query,
  GetViewer2QueryVariables,
  GetViewer2Props<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetViewer2Query, GetViewer2QueryVariables, GetViewer2Props<TChildProps>>(GetViewer2Document, {
      alias: 'getViewer2',
      ...operationOptions
    });
};

/**
 * __useGetViewer2Query__
 *
 * To run a query within a React component, call `useGetViewer2Query` and pass it any options that fit your needs.
 * When your component renders, `useGetViewer2Query` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewer2Query({
 *   variables: {
 *   },
 * });
 */
export function useGetViewer2Query(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewer2Query, GetViewer2QueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewer2Query, GetViewer2QueryVariables>(GetViewer2Document, baseOptions);
      }
export function useGetViewer2LazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewer2Query, GetViewer2QueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewer2Query, GetViewer2QueryVariables>(GetViewer2Document, baseOptions);
        }
export type GetViewer2QueryHookResult = ReturnType<typeof useGetViewer2Query>;
export type GetViewer2LazyQueryHookResult = ReturnType<typeof useGetViewer2LazyQuery>;
export type GetViewer2QueryResult = ApolloReactCommon.QueryResult<GetViewer2Query, GetViewer2QueryVariables>;
export const GetViewerDocument = gql`
    query GetViewer {
  viewer {
    id
    username
    firstName
    lastName
  }
}
    `;
export type GetViewerComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetViewerQuery, GetViewerQueryVariables>, 'query'>;

    export const GetViewerComponent = (props: GetViewerComponentProps) => (
      <ApolloReactComponents.Query<GetViewerQuery, GetViewerQueryVariables> query={GetViewerDocument} {...props} />
    );
    
export type GetViewerProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetViewerQuery, GetViewerQueryVariables> & TChildProps;
export function withGetViewer<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetViewerQuery,
  GetViewerQueryVariables,
  GetViewerProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetViewerQuery, GetViewerQueryVariables, GetViewerProps<TChildProps>>(GetViewerDocument, {
      alias: 'getViewer',
      ...operationOptions
    });
};

/**
 * __useGetViewerQuery__
 *
 * To run a query within a React component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
      }
export function useGetViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
        }
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>;
export type GetViewerLazyQueryHookResult = ReturnType<typeof useGetViewerLazyQuery>;
export type GetViewerQueryResult = ApolloReactCommon.QueryResult<GetViewerQuery, GetViewerQueryVariables>;