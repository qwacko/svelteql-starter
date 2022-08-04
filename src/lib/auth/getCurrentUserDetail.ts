import { db } from '$lib/database/db';

export type userInfoNotNull = {
	id: string;
	admin: boolean;
	email: string;
	name: string;
};

export type userInfo = userInfoNotNull | null;

export const getCurrentUser = async (userId: string): Promise<userInfo> => {
	const userInfo = await db.users.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			name: true,
			admin: true
		}
	});

	if (!userInfo) {
		return null;
	}

	return userInfo;
};
