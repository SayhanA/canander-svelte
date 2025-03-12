<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let name = '';
	let description = '';
	let isActive = false;
	let religions = [];

	async function handleSubmit(event) {
		event.preventDefault();
		const data = { name, description, isActive };

		await fetch('/api/religions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		await fetchReligions();
	}

	async function fetchReligions() {
		const response = await fetch('/api/religions');
		religions = await response.json();
	}

    async function handleDelete(id) {
        await fetch('/api/religions', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        await fetchReligions();
    }

    function handleEdit(religion) {
        name = religion.name;
        description = religion.description;
        isActive = religion.isActive;
        editId = religion.id;
    }

	onMount(fetchReligions);
</script>

<main class="p-8">
	<section class="w-fit mx-auto">
		<h2 class="text-center text-2xl font-bold text-gray-900 mb-6">Religion Manager</h2>

		<form on:submit={handleSubmit} class="flex flex-col space-y-4">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input
					id="name"
					type="text"
					name="name"
					bind:value={name}
					class="mt-1 block w-full rounded-md border p-2 focus:ring focus:ring-blue-300"
					required
				/>
			</div>

			<div>
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<input
					id="description"
					type="text"
					name="description"
					bind:value={description}
					class="mt-1 block w-full rounded-md border p-2 focus:ring focus:ring-blue-300"
					required
				/>
			</div>

			<div class="flex items-center">
				<input
					id="isActive"
					type="checkbox"
					name="isActive"
					bind:checked={isActive}
					class="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring focus:ring-blue-300"
				/>
				<label for="isActive" class="ml-2 text-sm text-gray-700">Active</label>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
			>
				Save Religion
			</button>
		</form>
	</section>

	<!-- Religion Table -->
	<section class="mt-8">
		<h2 class="text-xl font-bold text-gray-900 mb-4 text-center">Saved Religions</h2>

		<div class="overflow-x-auto">
			<table class="w-full border border-gray-300 rounded-lg shadow-lg">
				<thead class="bg-gray-200 text-gray-700 text-left">
					<tr class="border-b border-gray-300">
						<th class="p-3"><input type="checkbox" class="w-5 h-5" /></th>
						<th class="p-3">Name</th>
						<th class="p-3">Description</th>
						<th class="p-3">Active</th>
						<th class="p-3 text-center">Actions</th>
					</tr>
				</thead>

				<tbody class="divide-y divide-gray-300">
					{#each religions as religion}
						<tr class="hover:bg-gray-100">
							<td class="p-3"><input type="checkbox" class="w-5 h-5" /></td>
							<td class="p-3 font-semibold">{religion.name}</td>
							<td class="p-3 max-w-xs truncate">{religion.description}</td>
							<td class="p-3">{religion.isActive ? '✅ Yes' : '❌ No'}</td>
							<td class="p-3 flex justify-center space-x-2">
                                <a href={`/caste?religionId=${religion.id}&religionName=${religion.name}`} class="bg-purple-500 text-white px-3 py-1 rounded-md text-sm">caste</a>
								<button on:click={() => handleEdit(religion)} class="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">Edit</button>
								<button on:click={() => handleDelete(religion.id)} class="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Delete</button>
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
