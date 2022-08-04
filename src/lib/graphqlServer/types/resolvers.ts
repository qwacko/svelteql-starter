import type {
	Resolvers,
	QueryResolvers,
	MutationResolvers
} from '$lib/graphqlServer/types/generated-resolvers';
import type { GraphqlContext } from './yogaContext';

export type GraphqlResolvers = Resolvers<GraphqlContext>;
export type GraphqlQueryResolvers = QueryResolvers<GraphqlContext>;
export type GraphqlMutationResolvers = MutationResolvers<GraphqlContext>;
