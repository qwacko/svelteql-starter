import { checkAUserExists } from '$lib/auth/checkAUserExists';
import { loggedOutRouteLocals } from '$lib/auth/privateRoute';
import type { RequestHandler } from './__types/login';

export const GET: RequestHandler = async ({ locals }) => {
	const loggedOutCheck = loggedOutRouteLocals(locals);
	const userExists = await checkAUserExists();

	//Checks if there is at least one user in the database
	//If not then redirects to firstUser page.
	if (userExists) {
		return {
			status: 302,
			headers: { Location: '/users/login' }
		};
	}

	return loggedOutCheck;
};
