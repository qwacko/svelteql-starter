export type userInfoNotNull = {
	id: string;
	admin: boolean;
	email: string;
	name: string;
};

export type userInfo = userInfoNotNull | null;
