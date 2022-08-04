<script lang="ts">
	import toasts from './toastsStore';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const randomRows = new Array(40).map((item) => 'test');
</script>

<div class="toastHolder">
	{#each $toasts as currentToast (currentToast.id)}
		<div
			class="toastBox whole"
			class:warning={currentToast.type === 'warning'}
			class:error={currentToast.type === 'error'}
			class:info={currentToast.type === 'info'}
			class:success={currentToast.type === 'success'}
			in:fade={{}}
			out:fade={{}}
			animate:flip={{ duration: 400 }}>
			<div class="flex flex-col">
				<div class="flex flex-row items-center">
					{#if currentToast.title}
						<div class="toastBox title flex flex-grow">{currentToast.title}</div>
					{/if}

					<div
						class="flex cursor-pointer font-bold"
						class:hidden={currentToast.duration !== 0}
						on:click={currentToast.remove}>
						x
					</div>
				</div>
				{#if currentToast.description}
					<div class="flex text-sm">{currentToast.description}</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.toastHolder {
		@apply fixed right-5 bottom-5 flex flex-col-reverse;
	}
	.toastBox {
	}

	.toastBox.whole {
		@apply mb-2 mr-2 w-80 rounded-sm p-2 shadow drop-shadow-md;
	}

	.toastBox.title {
		@apply font-bold;
	}

	.toastBox.warning {
		@apply border border-yellow-500 bg-yellow-100 text-black;
	}

	.toastBox.error {
		@apply border border-red-800 bg-red-500 text-white;
	}

	.toastBox.info {
		@apply border border-blue-800 bg-blue-600 text-white;
	}

	.toastBox.success {
		@apply border border-green-800 bg-green-600 text-white;
	}
</style>
