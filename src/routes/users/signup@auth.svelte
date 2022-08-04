<script lang="ts">
	import { goto } from '$app/navigation';
	import toastsStore from '$lib/components/Toasts/toastsStore';

	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import { resultKeyNameFromField } from '@apollo/client/utilities';

	let email: string;
	let password: string;
	let loading: boolean = false;

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
				title: 'User Created'
			});
			goto('/users/login');
		} else {
			const resultText = await result.json();
			toastsStore.addToast({
				duration: 0,
				title: 'Create User Error',
				description: resultText.error ? resultText.error : JSON.stringify(resultText)
			});
		}
		loading = false;
	};
</script>

<form on:submit|preventDefault={login}>
	<div class="m-6 flex flex-col gap-4">
		<div class="mb-2 flex text-left text-xl font-bold">Signup</div>

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
			defaultText="Sign Up"
			loadingText="Sign Up..." />
	</div>
</form>
