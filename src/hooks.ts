import { auth } from '$lib/auth/lucia';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { getCurrentUser } from '$lib/auth/getCurrentUserDetail';

//Gets the corrected set of information from the database, which includes all the account grouping information.
const getUserInfoHook: Handle = async ({ event, resolve }) => {
	if (event?.locals?.lucia?.user) {
		event.locals.user = await getCurrentUser(event.locals.lucia.user.user_id);
	} else {
		event.locals.user = null;
	}
	const result = await resolve(event);

	return result;
};

export const handle = sequence(auth.handleAuth, getUserInfoHook);
export const getSession = auth.getAuthSession;
