/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}

	interface Locals {
		lucia: {
			user: { user_id: string; name: string; email: string; admin: boolean };
			access_token: string;
			refresh_token: string;
		};
		user: import('$lib/src/auth/getCurrentUserDetails').userInfo;
	}

	interface Session {
		lucia: import('lucia-sveltekit/types').SvelteKitSession<{
			user_id: string;
			name: string;
			email: string;
			admin: boolean;
		}>;
	}
}
