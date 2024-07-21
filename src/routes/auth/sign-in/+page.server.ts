import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { getUserByEmail } from '$lib/server/database/user-model';
import { setFlash } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { userSchema } from '$lib/schemas';
import { Argon2id } from 'oslo/password';
import { zod } from 'sveltekit-superforms/adapters';

const signInSchema = userSchema.pick({
	email: true,
	password: true
});

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/postings/today');
	}

	const form = await superValidate(zod(signInSchema));
	return { form };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signInSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const email = form.data.email.toLowerCase();
			const existingUser = await getUserByEmail(email);
			if (!existingUser) {
				return setError(form, 'The email or password is incorrect.');
			}

			if (existingUser.password) {
				const validPassword = await new Argon2id().verify(
					existingUser.password,
					form.data.password
				);
				if (!validPassword) {
					return setError(form, 'The email or password is incorrect.');
				} else {
					const session = await lucia.createSession(existingUser.id, {});
					const sessionCookie = lucia.createSessionCookie(session.id);
					cookies.set(sessionCookie.name, sessionCookie.value, {
						path: '.',
						...sessionCookie.attributes
					});
					redirect(302, '/postings/today');
				}
			}
		} catch (e) {
			return setError(form, 'The email or password is incorrect.');
		}

		return { form };
	}
}