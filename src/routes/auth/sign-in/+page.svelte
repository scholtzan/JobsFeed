<script lang="ts">
	import { userSchema } from '$lib/schemas';
	import type { SuperValidated } from 'sveltekit-superforms';
    import { setError, superValidate } from 'sveltekit-superforms/server';
    import { superForm } from "sveltekit-superforms/client"

    export let data;
    const { form, allErrors, constraints, message, enhance } = superForm(data.form);
    console.log(allErrors);

</script>


<div class="flex flex-row min-h-screen justify-center items-center">
    <div class="card bg-base-100 w-96 shadow-xl">
        <div class="card-body">
        <h2 class="card-title">Sign in</h2>
        {#each $allErrors as error}
        <div class="mb-4 text-red-600">{error.messages.join('. ')}</div>
        <p>Don't have an account yet? <a href="/auth/sign-up">Sign up here.</a></p>
        {/each}
        <form method="POST">
            <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input 
                type="email" 
                name="email" 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
            />
            </div>
            <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
                type="password" 
                name="password" 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
            />
            </div>
            <button 
            type="submit" 
            class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Login
            </button>
        </form>
        </div>
    </div>
</div>
