<script lang="ts">
	import { slide } from 'svelte/transition';
	import { clickOutside } from '../../clickOutside';
	import { handleFocusLeave } from '../../handleFocusLeave';

	let expanded: boolean = false;

	type InputValue = { id: string; data: any };

	export let getValues: (search: string) => Promise<InputValue[]>;
	export let getString: (value: InputValue) => string;
	export let selectedValue: InputValue;

	let value: string = 'Account Name';
	let currentValues: InputValue[] = [];

	$: !expanded && (value = getString(selectedValue));

	let input: HTMLElement;
	let items: HTMLElement[] = [];

	const updateValues = async (newSearch: string) => {
		currentValues = await getValues(newSearch);
	};
	$: updateValues(value);
</script>

<div>
	<slot name="groupSlot" thisValue={selectedValue}>{JSON.stringify(selectedValue)}</slot>
	<div
		class=" absolute top-0 w-full {expanded
			? ''
			: 'text-transparent bg-transparent hover:bg-blue-50 hover:text-black'}  border border-gray-300 bg-white shadow-2xl ring-1"
		use:handleFocusLeave={() => (expanded = false)}
		use:clickOutside
		on:click_outside={() => (expanded = false)}
	>
		<input
			bind:this={input}
			type="search"
			{value}
			on:input={(e) => (value = e.currentTarget.value)}
			placeholder="Account Name"
			class="whitespace-nowrap bg-transparent p-3 text-center outline-0 focus:bg-blue-50 hover:bg-blue-50"
			on:focus={() => (expanded = true)}
			on:keydown={(e) => {
				console.log({ e });
				if (e.key === 'ArrowDown') {
					items[0].focus();
				}
			}}
		/>
		{#if expanded}
			<div class="max-h-96 overflow-y-scroll rounded-b-md " transition:slide={{ duration: 200 }}>
				<slot slotValue={selectedValue}>
					{JSON.stringify(selectedValue)}</slot
				>
				<div
					bind:this={items[0]}
					on:keydown={(e) => {
						if (e.key === 'ArrowDown') {
							items[1].focus();
						}

						if (e.key === 'ArrowUp') {
							input.focus();
						}
					}}
					tabindex="-1"
					class="outline-0 m-0 whitespace-nowrap border-0 border-b-2 p-0 last:border-b-0 hover:bg-blue-50 focus:bg-blue-50"
				>
					<slot slotValue={{ id: 'dddd', data: {} }}>
						{JSON.stringify({ id: 'dddd', data: {} })}
					</slot>
				</div>
				<div
					bind:this={items[1]}
					on:keydown={(e) => {
						if (e.key === 'ArrowDown') {
							items[2].focus();
						}

						if (e.key === 'ArrowUp') {
							items[0].focus();
						}
					}}
					tabindex="-1"
					class="outline-0 m-0 whitespace-nowrap border-0 border-b-2 p-0 last:border-b-0 hover:bg-blue-50 focus:bg-blue-50"
				>
					That
				</div>
				<div
					bind:this={items[2]}
					on:keydown={(e) => {
						if (e.key === 'ArrowUp') {
							items[1].focus();
						}
					}}
					tabindex="-1"
					class="outline-0 m-0 whitespace-nowrap border-0 border-b-2 p-0 last:border-b-0 hover:bg-blue-50 focus:bg-blue-50"
				>
					The Other
				</div>
			</div>
		{/if}
	</div>
</div>
