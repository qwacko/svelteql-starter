import type { GraphqlContext } from '../graphqlServer/types/yogaContext';
import { GraphQLYogaError } from '@graphql-yoga/common';

export const authCheck = (context: GraphqlContext) => {
	//Throw error if not logged in
	if (!context?.locals?.lucia?.user?.user_id) {
		throw new GraphQLYogaError('User Not Logged In');
	}

	return context.locals.user;
};
