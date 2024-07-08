import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from "$app/environment";
import { userTable, sessionTable, type SelectUser } from '$lib/server/database/schemas';
import db from '$lib/server/database/db';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'session',
		expires: false,
		attributes: {
			secure: !dev
		}
	},
	sessionExpiresIn: new TimeSpan(30, 'd'),
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			verified: attributes.verified,
			token: attributes.token
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<SelectUser, 'id'>;
	}
}
