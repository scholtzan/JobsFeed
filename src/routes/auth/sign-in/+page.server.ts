import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/dashboard');
	}
	const form = await superValidate(event, signInSchema);
	return {
		form
	};
};


export const actions = {
	default: async (event) => {
    }
}