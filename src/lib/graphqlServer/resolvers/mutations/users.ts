// export const users = () => {};
import { db } from '$lib/database/db';
import type { GraphqlMutationResolvers } from '$lib/graphqlServer/types/resolvers';
import { GraphQLYogaError } from '@graphql-yoga/common';
import { authCheck } from '$lib/auth/authCheck';

export const updateUser: GraphqlMutationResolvers['updateUser'] = async (_, args, context) => {
	authCheck(context);

	const userInfo = await db.users.findUnique({
		where: { id: context?.locals?.lucia?.user?.user_id || '' }
	});

	//Catchall Error for no user being found. Shouldn't ever happen.
	if (!userInfo) {
		throw new GraphQLYogaError('Error Retrieving User Info');
	}

	const cleansedArgs = { name: args.input.name ? args.input.name : undefined };

	const updatedUser = await db.users.update({
		where: { id: context?.locals?.lucia?.user?.user_id },
		data: cleansedArgs
	});

	return updatedUser;
};
