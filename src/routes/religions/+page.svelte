<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let name = '';
	let description = '';
	let isActive = false;
	let editId = null;
	let religions = [];
	let isLoading = false;

	async function fetchReligions() {
		try {
			const response = await fetch('/api/religions');
			if (!response.ok) {
				throw new Error('Failed to fetch religions');
			}
			religions = await response.json();
		} catch (error) {
			toast.error(error.message);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		isLoading = true;

		const data = { name, description, isActive };
		const method = editId ? 'PATCH' : 'POST';
		const url = '/api/religions';

		if (editId) {
			data.id = editId;
		}

		try {
			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				resetForm();
				await fetchReligions();
				toast.success('Successfully saved');
			} else {
				toast.error('Failed to save');
			}
		} catch (error) {
			toast.error('An error occurred');
		} finally {
			isLoading = false;
		}
	}

	async function handleDelete(id) {
		try {
			const response = await fetch('/api/religions', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (response.ok) {
				toast.success('Successfully deleted');
				await fetchReligions();
			} else {
				toast.error('Failed to delete');
			}
		} catch (error) {
			toast.error('An error occurred');
		}
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

<Toaster />

<main class="p-8">
	<section class="mx-auto w-fit">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-900">Religion Manager</h2>

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
				class="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:bg-blue-300"
				disabled={isLoading}
			>
				{#if editId}
					{isLoading ? 'Updating...' : 'Update Religion'}
				{:else}
					{isLoading ? 'Saving...' : 'Save Religion'}
				{/if}
			</button>
		</form>
	</section>

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
									href={`/caste?religionId=${religion.id}&religionName=${religion.name}`}
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
									on:click={() => handleDelete(religion.id)}
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