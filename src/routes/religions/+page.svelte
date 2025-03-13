<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import ReligionForm from '../../components/ReligionForm.svelte';

	let name = '';
	let description = '';
	let isActive = false;
	let editId = null;
	let religions = [];

	async function fetchReligions() {
		try {
			const response = await fetch('/api/religions');
			if (!response.ok) {
				throw new Error('Failed to fetch religions');
			}
			religions = await response.json();

			console.log({ religions });
		} catch (error) {}
	}

	async function handleDelete(id) {
		try {
			const response = await fetch('/api/religions', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});

			if (response.ok) {
				await fetchReligions();
			} else {
			}
		} catch (error) {}
	}

	function handleEdit(religion) {
		name = religion.name;
		description = religion.description;
		isActive = religion.isActive;
		editId = religion.id;
	}

	function resetForm() {
		name = '';
		description = '';
		isActive = false;
		editId = null;
	}

	onMount(fetchReligions);
</script>

<main class="p-8">
	<ReligionForm {name} {description} {isActive} {editId} {fetchReligions} />

	<!-- Religion Table -->
	<section class="mt-8">
		<h2 class="mb-4 text-center text-xl font-bold text-gray-900">Saved Religions</h2>

		<div class="overflow-x-auto">
			<table class="w-full rounded-lg border border-gray-300 shadow-lg">
				<thead class="bg-gray-200 text-left text-gray-700">
					<tr class="border-b border-gray-300">
						<th class="p-3"><input type="checkbox" class="h-5 w-5" /></th>
						<th class="p-3">Name</th>
						<th class="p-3">Description</th>
						<th class="p-3">Active</th>
						<th class="p-3 text-center">Actions</th>
					</tr>
				</thead>

				<tbody class="divide-y divide-gray-300">
					{#each religions as religion}
						<tr class="hover:bg-gray-100">
							<td class="p-3"><input type="checkbox" class="h-5 w-5" /></td>
							<td class="p-3 font-semibold">{religion.name}</td>
							<td class="max-w-xs truncate p-3">{religion.description}</td>
							<td class="p-3">{religion.isActive ? '✅ Yes' : '❌ No'}</td>
							<td class="flex justify-center space-x-2 p-3">
								<a
									href={`/caste?religionId=${religion._id}&religionName=${religion.name}`}
									class="rounded-md bg-purple-500 px-3 py-1 text-sm text-white"
								>
									Caste
								</a>
								<button
									on:click={() => handleEdit(religion)}
									class="rounded-md bg-yellow-500 px-3 py-1 text-sm text-white"
								>
									Edit
								</button>
								<button
									on:click={() => handleDelete(religion._id)}
									class="rounded-md bg-red-500 px-3 py-1 text-sm text-white"
								>
									Delete
								</button>
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
</main>
