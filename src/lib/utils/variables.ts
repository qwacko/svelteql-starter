export const variables = {
	allowSignup: String(import.meta.env.VITE_ALLOW_SIGNUP).toLowerCase() === 'true',
	graphQLURL: String(import.meta.env.VITE_GRAPHQL_URI)
};
