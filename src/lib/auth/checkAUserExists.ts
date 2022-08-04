import { db } from '../database/db';

export const checkAUserExists = async () => {
	const users = await db.users.findMany({ take: 1 });

	if (users.length > 0) {
		return true;
	}
	return false;
};
