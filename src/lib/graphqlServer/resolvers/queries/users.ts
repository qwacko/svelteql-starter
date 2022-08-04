// export const users = () => {};
import { db } from '$lib/database/db';
import type { GraphqlQueryResolvers } from '$lib/graphqlServer/types/resolvers';
import { GraphQLYogaError } from '@graphql-yoga/common';
import { authCheck } from '$lib/auth/authCheck';

export const user: GraphqlQueryResolvers['user'] = async (_, __, context) => {
	authCheck(context);

	const userInfo = await db.users.findUnique({
		where: { id: context?.locals?.lucia?.user?.user_id || '' }
	});

	//Catchall Error for no user being found. Shouldn't ever happen.
	if (!userInfo) {
		throw new GraphQLYogaError('Error Retrieving User Info');
	}

	return userInfo;
};
