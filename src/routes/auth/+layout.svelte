<script lang="ts">
	import type { PageData } from './$types';
    import { getFlash } from 'sveltekit-flash-message';
    import { page } from '$app/stores';
	import '../../app.postcss';

	export let data: any;
	let user: PageData['user'];
	$: user = data.user;

    const flash = getFlash(page);
	//$: console.log('+layout.svelte root flash: ' + JSON.stringify($flash));
	$: if ($flash) {
		switch ($flash.type) {
			case 'success':
				console.log('flash.message.success: ' + $flash.message);

				break;
			case 'error':
				console.log('flash.message.error: ' + $flash.message);

				break;
		}
	}
</script>

<slot />