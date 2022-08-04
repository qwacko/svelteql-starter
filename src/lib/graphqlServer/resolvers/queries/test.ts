import type { GraphqlQueryResolvers } from '$lib/graphqlServer/types/resolvers';

export const testResult: GraphqlQueryResolvers['testResult'] = async (_, args) => {
	const requestTime = new Date();

	//2 second delay to show loading state and how caching works.
	await new Promise((r) => setTimeout(r, 2000));

	return {
		id: args.id || 'No ID',
		title: args.id || 'No ID',
		requestTime: requestTime.toISOString()
	};
};
