import { createServer } from '@graphql-yoga/common';
import type { RequestEvent } from '@sveltejs/kit';
import { getTypeDefs } from '$lib/graphqlServer/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import * as queries from '$lib/graphqlServer/resolvers/queries';
import * as mutations from '$lib/graphqlServer/resolvers/mutations';
import type { GraphqlResolvers } from '$lib/graphqlServer/types/resolvers';
import { useDepthLimit } from '@envelop/depth-limit';

const resolvers: GraphqlResolvers = {
	...scalarResolvers,
	Query: queries,
	Mutation: mutations
};

const typeDefs = makeExecutableSchema({
	typeDefs: getTypeDefs(),
	resolvers
});

const yogaApp = createServer<RequestEvent>({
	schema: typeDefs,
	graphiql: {
		endpoint: '/api/graphql'
	},
	plugins: [useDepthLimit({ maxDepth: 4 })]
});

export const requestEventHandler = (event: RequestEvent) =>
	yogaApp.handleRequest(event.request, event);
