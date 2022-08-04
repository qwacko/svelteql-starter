<script lang="ts">
	export let value: svelte.JSX.HTMLAttributes<HTMLInputElement>['value'];
	export let name: svelte.JSX.HTMLAttributes<HTMLInputElement>['name'];
	export let placeholder: svelte.JSX.HTMLAttributes<HTMLInputElement>['placeholder'];
	export let id: svelte.JSX.HTMLAttributes<HTMLInputElement>['id'];
	export let type: 'email' | 'password' | 'text' = 'text';
	export let displayType: 'default' = 'default';
</script>

{#if type === 'email'}
	<input
		{placeholder}
		{id}
		{name}
		type="email"
		on:focus
		on:blur
		on:click
		on:change
		class={displayType === 'default' ? 'default' : ''}
		bind:value />
{:else if type === 'password'}
	<input
		{placeholder}
		{id}
		{name}
		type="password"
		class={displayType === 'default' ? 'default' : ''}
		on:focus
		on:blur
		on:click
		on:change
		bind:value />
{:else}
	<input
		{placeholder}
		{id}
		{name}
		type="text"
		class={displayType === 'default' ? 'default' : ''}
		on:focus
		on:blur
		on:click
		on:change
		bind:value />
{/if}

<style lang="postcss">
	input.default {
		@apply flex rounded-md border border-blue-200 p-2 outline-none hover:bg-blue-50 focus:bg-blue-50;
	}
</style>
