<script>
	// @ts-nocheck
	import { addToast } from '../stores/toastStore';


	let { castes, handleEdit, fetchCastes } = $props();

	async function handleDelete(id) {
		try {
			const response = await fetch('api/castes', {
				method: 'DELETE',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ id })
			});
			fetchCastes();
			if (response.status === 404) {
				return addToast('error', 'Failed to delete caste!');
			}
			addToast('success', 'Caste deleted successfully.');

			console.log({ response });
		} catch (error) {
			addToast('error', 'Failed to delete caste!');
		}
	}
</script>

<section class="mt-8">
	<h2 class="mb-4 text-center text-xl font-bold text-gray-900">Saved Religions</h2>

	<div class="overflow-x-auto">
		<table class="w-full rounded-lg border border-gray-300 shadow-lg">
			<thead class="bg-gray-200 text-left text-gray-700">
				<tr class="border-b border-gray-300">
					<th class="p-3"><input type="checkbox" class="h-5 w-5" /></th>
					<th class="p-3">Name</th>
					<th class="p-3">Description</th>
					<!-- <th class="p-3">Active</th> -->
					<th class="p-3 text-center">Actions</th>
				</tr>
			</thead>

			<tbody class="divide-y divide-gray-300">
				{#each castes as caste}
					<tr class="hover:bg-gray-100">
						<td class="p-3"><input type="checkbox" class="h-5 w-5" /></td>
						<td class="p-3 font-semibold">{caste.name}</td>
						<td class="max-w-xs truncate p-3">{caste.description}</td>
						<!-- <td class="p-3">{caste.isActive ? '✅ Yes' : '❌ No'}</td> -->
						<td class="flex justify-center space-x-2 p-3">
							<button
								onclick={() => handleEdit(caste)}
								class="rounded-md bg-yellow-500 px-3 py-1 text-sm text-white">Edit</button
							>
							<button
								onclick={() => handleDelete(caste._id)}
								class="rounded-md bg-red-500 px-3 py-1 text-sm text-white">Delete</button
							>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="5" class="p-3 text-center text-gray-500">No religions added yet.</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
