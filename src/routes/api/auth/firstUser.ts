import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/auth/lucia';
import { checkAUserExists } from '$lib/auth/checkAUserExists';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return {
			status: 400
		};
	}
	try {
		const aUserExists = await checkAUserExists();
		if (aUserExists) {
			return {
				status: 400
			};
		}

		await auth.createUser('email', email, {
			password: password.toLowerCase(),
			user_data: {
				email,
				admin: true
			}
		});
		return {
			status: 200
		};
	} catch (e) {
		const error = e as Error;
		if (
			error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
			error.message === 'AUTH_INVALID_PASSWORD'
		) {
			return {
				status: 400,
				body: JSON.stringify({
					error: 'Error Creating User.'
				})
			};
		}
		// database connection error
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Unknown error.'
			})
		};
	}
};
