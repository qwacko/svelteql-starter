import { variables } from '$lib/utils/variables';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

function createApolloClient() {
	const cache = new InMemoryCache();
	const client = new ApolloClient({
		uri: variables.graphQLURL,
		cache
	});
	return client;
}
const client = createApolloClient();

export default client;
