<script>
	import client from '$lib/graphqlClient/client';
	import { setClient } from 'svelte-apollo';
	import Toasts from '$lib/components/Toasts/Toasts.svelte';

	setClient(client);

	import '../app.css';
</script>

<slot />

<Toasts />
