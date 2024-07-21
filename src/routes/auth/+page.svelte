<script lang="ts">
	import { goto } from '$app/navigation';
	import { constants } from '$lib/constants';

    // automatically forward to sign in page
	goto('/auth/sign-in');
</script>

<svelte:head>
	<title>{constants.APP_NAME}</title>
	<meta
		name="description"
		content="Streamlines the job search process by tracking job postings from various career pages and matching users with roles that align with their skills and preferences. "
	/>
</svelte:head>