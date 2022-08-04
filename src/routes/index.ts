import { privateRouteLocals } from '$lib/auth/privateRoute';
import type { RequestHandler } from './__types/index';

export const GET: RequestHandler = async ({ locals }) => privateRouteLocals(locals);
