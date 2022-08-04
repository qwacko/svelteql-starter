import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/auth/lucia';
import { variables } from '$lib/utils/variables';

export const POST: RequestHandler = async ({ request }) => {
	if (!variables.allowSignup) {
		return { status: 400 };
	}

	const { email, password } = await request.json();

	console.log({ email, password });
	if (!email || !password) {
		return {
			status: 400
		};
	}

	try {
		const createUser = await auth.createUser('email', email, {
			password: password.toLowerCase(),
			user_data: {
				email,
				admin: false
			}
		});
		return {
			status: 302,
			headers: {
				'set-cookie': createUser.cookies,
				location: '/'
			}
		};
	} catch (e) {
		const error = e as Error;
		console.log(e);
		if (
			error.message === 'AUTH_DUPLICATE_IDENTIFIER_TOKEN' ||
			error.message === 'AUTH_DUPLICATE_USER_DATA'
		) {
			return {
				status: 400,
				body: JSON.stringify({
					error: 'Email already in use.'
				})
			};
		}
		return {
			status: 500,
			body: JSON.stringify({
				error: 'Unknown error.'
			})
		};
	}
};
