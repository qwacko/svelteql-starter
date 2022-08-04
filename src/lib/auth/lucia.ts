import lucia from 'lucia-sveltekit';
import prisma from '@lucia-sveltekit/adapter-prisma';
import { dev } from '$app/env';
import { db } from '../database/db';

export const auth = lucia({
	adapter: prisma(db),
	secret: import.meta.env.VITE_AUTH_SECRET,
	env: dev ? 'DEV' : 'PROD'
});
