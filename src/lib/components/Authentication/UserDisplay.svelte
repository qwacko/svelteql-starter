<script lang="ts">
	import { onDestroy } from 'svelte';
	import { autoRefreshTokens, signOut } from 'lucia-sveltekit/client';
	import { session } from '$app/stores';
	import Button from '../Basic/Button.svelte';
	import { goto } from '$app/navigation';

	$: unsubscribe = autoRefreshTokens(session, (e) => console.log(e));

	onDestroy(() => {
		unsubscribe();
	});

	let loading: boolean = false;
	const signoutAndRedirect = async () => {
		loading = true;
		await signOut();
		goto('/users/login');
		loading = false;
	};
</script>

<div class="drop-shadow-m m-2 w-min rounded-md border border-gray-400 bg-white p-2">
	{#if $session.lucia}
		<div class="flex w-min flex-row items-center justify-center gap-3">
			<div class="flex whitespace-nowrap">{$session.lucia.user.email}</div>
			<div class="flex">
				<Button
					{loading}
					defaultText="Sign Out"
					loadingText="Signing Out"
					on:click={signoutAndRedirect} />
			</div>
		</div>
	{:else}
		<Button {loading} defaultText="Login" />
	{/if}
</div>
