<script lang="ts">
	import { goto } from '$app/navigation';

	import toastsStore from '$lib/components/Toasts/toastsStore';

	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';

	let email: string;
	let password: string;

	let loading = false;

	const login = async () => {
		loading = true;
		const result = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (result.ok) {
			toastsStore.addToast({
				duration: 2000,
				type: 'success',
				title: 'Logged In'
			});
			goto('/');
		} else {
			const responseText = await result.json();
			console.log({ responseText, result });
			toastsStore.addToast({
				duration: 0,
				type: 'error',
				title: 'Login Error',
				description: responseText.error ? responseText.error : JSON.stringify(responseText)
			});
		}
		loading = false;
	};
</script>

<form on:submit|preventDefault={login}>
	<div class="m-6 flex flex-col gap-4">
		<div class="mb-2 flex text-left text-xl font-bold">Login</div>
		<Input id="email" name="email" type="text" placeholder="Email Address" bind:value={email} />
		<Input
			type="password"
			id="password"
			name="password"
			placeholder="Password"
			bind:value={password} />
		<Button
			displayType="default"
			type="submit"
			{loading}
			defaultText="Login"
			loadingText="Logging In..." />
	</div>
</form>
