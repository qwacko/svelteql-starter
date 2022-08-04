import { browser } from '$app/env';
import { goto } from '$app/navigation';

export const privateRoute = async (session: App.Session) => {
	if (!session.lucia) {
		return {
			status: 302,
			redirect: '/users/login'
		};
	}
	return {};
};

export const privateRouteLocals = async (locals: App.Locals) => {
	if (!locals.lucia) {
		return {
			status: 302,
			headers: { Location: '/users/login' }
		};
	}
	return {};
};

export const loggedOutRoute = async (session: App.Session) => {
	if (session.lucia) {
		if (browser) {
			goto('/');
			return {};
		} else {
			return {
				status: 302,
				redirect: '/'
			};
		}
	}
	return {};
};

export const loggedOutRouteLocals = async (locals: App.Locals) => {
	if (locals.lucia) {
		return {
			status: 302,
			headers: { Location: '/' }
		};
	}
	return {};
};
