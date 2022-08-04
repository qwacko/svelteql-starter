<script lang="ts">
	import Button from '$lib/components/Basic/Button.svelte';
	import Input from '$lib/components/Basic/Input.svelte';
	import toastsStore from '$lib/components/Toasts/toastsStore';

	import { goto } from '$app/navigation';
	let email: string;
	let password: string;
	let loading: boolean = false;

	const login = async () => {
		loading = true;
		const result = await fetch('/api/auth/firstUser', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		});

		if (result.ok) {
			toastsStore.addToast({
				duration: 2000,
				title: 'First User Created',
				description: 'Login as newly created user'
			});
			goto('/users/login');
		} else {
			const resultText = await result.json();
			toastsStore.addToast({
				duration: 0,
				title: 'User Creation Error',
				description: resultText.error ? resultText.error : JSON.stringify(resultText)
			});
		}
		loading = false;
	};
</script>

<form on:submit|preventDefault={login}>
	<div class="m-6 flex flex-col gap-4">
		<div class="mb-2 flex text-left text-xl font-bold">Create First User</div>

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
			defaultText="Create User"
			loadingText="Creating..." />
	</div>
</form>
