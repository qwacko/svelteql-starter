import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/auth/lucia';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();
	console.log({ email, password });

	if (!email || !password) {
		console.log('Error 1');
		return {
			status: 400,
			body: JSON.stringify({
				error: 'Missing Email or Password'
			})
		};
	}
	try {
		const authenticateUser = await auth.authenticateUser('email', email.toLowerCase(), password);
		return {
			status: 302,
			headers: {
				'set-cookie': authenticateUser.cookies,
				Location: '/'
			}
		};
	} catch (e) {
		console.log('Error 2');
		console.log({ e });
		const error = e as Error;
		if (
			error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
			error.message === 'AUTH_INVALID_PASSWORD'
		) {
			return {
				status: 400,
				body: JSON.stringify({
					error: 'Incorrect email or password.'
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
