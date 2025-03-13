<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { addToast } from '../stores/toastStore';

	let { religionId, religionName, castId, castName, castDes, handleEdit, fetchCastes, resetForm } =
		$props();

	let id = $state(castId);
	let name = $state(castName);
	let description = $state(castDes);

	$effect(() => {
		if (castId !== id) {
			id = castId;
			name = castName;
			description = castDes;
		}
	});

	async function handleSubmit(event) {
		event.preventDefault();
		const data = { name, description, religionId };

		let response;
		if (id) {
			data.id = id;
			response = await fetch('/api/castes', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (response.ok) {
				resetForm();
				await fetchCastes();
				addToast('success', 'Caste saved successfully');
			} else {
				addToast('error', 'Failed to save caste!');
			}
		} else {
			console.log('Data  form CasteForm line:37', data);
			response = await fetch('/api/castes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (response.ok) {
				resetForm();
				await fetchCastes();
				addToast('success', 'Caste updated successfully');
			} else {
				addToast('error', 'Failed to update caste!');
			}
		}

		id = '';
		name = '';
		description = '';
	}
</script>

<section class="form mt-6">
	<div class="flex w-fit items-center justify-between">
		<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
			Caste Manager for {religionName}
		</h2>
	</div>

	<form onsubmit={handleSubmit} class="flex flex-col space-y-4">
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input
				id="name"
				type="text"
				name="name"
				bind:value={name}
				class="mt-1 block rounded-md border p-2 focus:ring focus:ring-blue-300"
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
				class="mt-1 block rounded-md border p-2 focus:ring focus:ring-blue-300"
				required
			/>
		</div>

		<div class="flex gap-5">
			<button
				type="submit"
				class="w-[400px] rounded-md bg-blue-600 py-3 text-white transition hover:bg-blue-700"
			>
				{#if id}
					Update Caste
				{:else}
					Save
				{/if}
			</button>
			<button
				type="button"
				onclick={() => handleEdit({ id: '', name: '', description: '' })}
				class="w-full rounded-md bg-[#ec6dd2] py-2 text-white transition"
			>
				Cancel
			</button>
		</div>
	</form>
</section>
