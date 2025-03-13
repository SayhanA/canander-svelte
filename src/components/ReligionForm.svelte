<script>
	// @ts-nocheck
	import { addToast } from '../stores/toastStore';

	let isLoading = $state(false);
	let { name, description, isActive, editId, fetchReligions, resetForm } = $props();

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
				body: JSON.stringify(data)
			});

			if (response.ok) {
				resetForm();
				name = '';
				description = '';
				isActive = false;
				editId = null;
				await fetchReligions();
				addToast('success', 'Religion saved successfully!.....');
			} else {
				addToast('error', 'Failed to save religion!');
			}
		} catch (error) {
			console.error('Error submitting data:', error);
			addToast('error', 'Failed to save religion!');
		} finally {
			isLoading = false;
		}
	}
</script>

<section class="mx-auto w-fit">
	<h2 class="mb-6 text-center text-2xl font-bold text-gray-900">Religion Manager</h2>

	<form onsubmit={handleSubmit} class="flex flex-col space-y-4">
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input id="name" type="text" name="name" bind:value={name} class="input" required />
		</div>

		<div>
			<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
			<input
				id="description"
				type="text"
				name="description"
				bind:value={description}
				class="input"
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

		<div>
			<button type="submit" class="btn-primary" disabled={isLoading}>
				{#if editId}
					{isLoading ? 'Updating...' : 'Update Religion'}
				{:else}
					{isLoading ? 'Saving...' : 'Save Religion'}
				{/if}
			</button>
			{#if editId}
				<button type="button" onclick={resetForm} class="btn-secondary"> Cancel </button>
			{/if}
		</div>
	</form>
</section>
