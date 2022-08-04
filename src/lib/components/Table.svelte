<script lang="ts">
	import Autocomplete from './Autocomplete/Autocomplete.svelte';
</script>

<div class="border-1 m-3 w-min rounded-xl border  border-black bg-white text-sm drop-shadow-lg">
	<table class="border-spacing">
		<thead>
			<tr class="border-b-2 border-b-black bg-gray-100">
				<th class="p-3 text-center first:rounded-tl-xl last:rounded-tr-xl hover:bg-gray-200">
					Sel
				</th>
				<th
					class="flex w-full flex-row place-content-center gap-2 p-3 first:rounded-tl-xl last:rounded-tr-xl hover:bg-gray-200"
				>
					<div class="h-min place-content-center">Date</div>
					<div class="flex">
						<button class="aspect-square rounded-full border border-gray-200 p-2">
							<div class="h-3 w-3 place-content-center text-center">⧩</div>
						</button>
					</div>
				</th>
				<th class="p-3 text-center first:rounded-tl-xl last:rounded-tr-xl hover:bg-gray-200">
					Account
				</th>
				<th class="p-3 text-center first:rounded-tl-xl last:rounded-tr-xl hover:bg-gray-200">
					Amount
				</th>
			</tr>
		</thead>
		<tbody>
			<tr class="focus-within:bg-blue-50 hover:bg-blue-50">
				<td class="focus-within:ring-1 hover:ring-1">
					<input type="checkbox" class="m-3 drop-shadow-sm checked:bg-blue-500 hover:ring-1" />
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input type="date" class="whitespace-nowrap bg-transparent p-3 outline-0" />
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input
						type="search"
						value="Savings"
						placeholder="Account Name"
						class="text-ellipsis whitespace-nowrap bg-transparent p-3 text-center outline-0"
					/>
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input
						type="text"
						value="$231,520,456.68"
						class="w-32 whitespace-nowrap bg-transparent p-3 text-right outline-0"
					/>
				</td>
			</tr>
			<tr class="focus-within:bg-blue-50 hover:bg-blue-50">
				<td class="focus-within:ring-1 hover:ring-1">
					<input
						type="checkbox"
						disabled
						class="m-3 drop-shadow-sm checked:bg-blue-500 hover:ring-1"
					/>
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input type="date" disabled class="whitespace-nowrap bg-transparent p-3 outline-0" />
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input
						type="search"
						value="Disabled"
						disabled
						placeholder="Account Name"
						class="whitespace-nowrap bg-transparent p-3 text-center outline-0"
					/>
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input
						type="text"
						value="$152.68"
						class="w-32 whitespace-nowrap bg-transparent p-3 text-right outline-0"
					/>
				</td>
			</tr>
			<tr class="focus-within:bg-blue-50 hover:bg-blue-50">
				<td class="first:rounded-bl-xl last:rounded-br-xl focus-within:ring-1 hover:ring-1">
					<input type="checkbox" class="m-3 drop-shadow-sm checked:bg-blue-500 hover:ring-1" />
				</td>
				<td class="first:rounded-bl-xl last:rounded-br-xl focus-within:ring-1 hover:ring-1">
					<input type="date" class="whitespace-nowrap bg-transparent p-3 outline-0" />
				</td>
				<td
					class="relative first:rounded-bl-xl last:rounded-br-xl focus-within:ring-1 hover:ring-1"
				>
					<Autocomplete
						getValues={async (search) => {
							console.log(search);
							return [];
						}}
						getString={() => 'AC Title'}
						selectedValue={{ id: 'thieid', data: {} }}
						let:slotValue
					>
						List - {JSON.stringify(slotValue)}
						<div slot="groupSlot" let:thisValue>Item{JSON.stringify(thisValue)}</div>
					</Autocomplete>

					<!-- <input
						type="search"
						disabled
						value="Savings"
						placeholder="Account Name"
						class="whitespace-nowrap bg-transparent p-3 text-center outline-0 focus:bg-blue-50"
					/>
					<div
						class="absolute top-0 w-full rounded-b-md border border-gray-300 bg-white shadow-2xl ring-1"
					>
						<input
							type="search"
							value="Savings"
							placeholder="Account Name"
							class="whitespace-nowrap bg-transparent p-3 text-center outline-0 focus:bg-blue-50 hover:bg-blue-50"
						/>
						<div class="max-h-96 overflow-y-scroll rounded-b-md">
							<div
								tabindex="0"
								class="m-0 whitespace-nowrap border-0 border-b-2 p-0 last:border-b-0 hover:bg-blue-50 focus:bg-blue-50"
							>
								This
							</div>
							<div
								tabindex="0"
								class="m-0 whitespace-nowrap border-0 border-b-2 p-0 last:border-b-0 hover:bg-blue-50"
							>
								That
							</div>
							<div
								tabindex="0"
								class="m-0 whitespace-nowrap border-0 border-b-2 p-0 last:border-b-0 hover:bg-blue-50"
							>
								The Other
							</div>
						</div>
					</div> -->
				</td>
				<td class="focus-within:ring-1 hover:ring-1">
					<input
						type="text"
						value="$152.68"
						class="w-32 whitespace-nowrap bg-transparent p-3 text-right outline-0"
					/>
				</td>
			</tr>
		</tbody>
	</table>
</div>
