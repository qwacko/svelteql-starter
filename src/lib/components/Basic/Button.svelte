<script lang="ts">
	import Spinner from './Spinner.svelte';

	export let loading: boolean = false;
	export let defaultText: string = 'Button';
	export let loadingText: string = 'Loading...';

	export let displayType: 'default' = 'default';
	export let type: 'submit' | 'reset' | 'button' = 'button';
</script>

<button
	{type}
	class="flex justify-center rounded-md border {displayType === 'default'
		? 'border-blue-200 bg-blue-100 stroke-blue-800 p-2 hover:border-blue-800 hover:bg-blue-500 hover:stroke-white hover:text-white'
		: ''}"
	on:click
	on:focus
	on:blur
	on:dblclick
	on:mouseover
	on:mouseenter
	on:mouseleave>
	<div class="flex flex-row items-center ">
		<Spinner class="mr-2 h-6 w-6" hidden={!loading} />
		<div class="flex truncate text-center font-bold">
			{#if loading}{loadingText}{:else}{defaultText}{/if}
		</div>
	</div>
</button>
