<script lang="ts">
	import type { ApolloQueryResult, from } from '@apollo/client';
	import type { GetTestDataQuery } from '$lib/graphqlClient/generated';
	import type { Readable } from 'svelte/store';
	import { GetTestData } from '$lib/graphqlClient/generated';
	import Button from '../Basic/Button.svelte';

	const resultItems = ['Test Data 1', 'Test Data 2', 'Test Data 3', 'Test Data 4', 'Test Data 5'];

	let searchText = 'New Data';
	let data: Readable<ApolloQueryResult<GetTestDataQuery>>;
	$: data = GetTestData({ variables: { id: searchText }, fetchPolicy: 'cache-and-network' });

	const randomSearch = () => {
		const randomNumber = Math.round(Math.random() * (resultItems.length - 1));
		searchText = resultItems[randomNumber];
	};

	$: console.log({ data: $data });
</script>

<div
	class="m-2 flex w-min flex-col items-center gap-2 rounded-md border border-gray-400 p-2 drop-shadow-md">
	<div class="flex flex-row gap-3">
		{#if $data.data?.testResult}
			<div class="flex whitespace-nowrap">Data : {$data.data.testResult?.title}</div>
			<div class="flex whitespace-nowrap">Request Time : {$data.data.testResult?.requestTime}</div>
		{/if}
	</div>
	<Button
		loading={$data.loading}
		defaultText="Load New Data"
		loadingText="Loading New Data"
		on:click={randomSearch}
		type="button" />
</div>
