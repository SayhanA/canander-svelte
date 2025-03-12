<script>
	// @ts-nocheck

	let religionId = 'Unknown ID';
	let religionName = 'Unknown Religion';
	let name = '';
	let description = '';

	// Extract parameters from URL
	if (typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);
		religionId = params.get('religionId') || 'Unknown ID';
		religionName = decodeURIComponent(params.get('religionName') || 'Unknown Religion');
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const data = { name, description, religionId };

		const response = await fetch('/api/castes.json', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (response.ok) {
			alert('Caste added successfully!');
			// Optionally, reset form fields
			name = '';
			description = '';
		} else {
			alert('Failed to add caste');
		}
	}
</script>

<svelte:head>
	<title>Calendar | Caste</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<main class="p-10">
	<section class="">
		<h1 class="text-2xl font-bold">Caste Page</h1>
		<p class="mt-2 text-gray-700">
			<strong>Selected Religion ID:</strong>
			{religionId}, <strong>{religionName}</strong>
		</p>
	</section>

	<section class="form mt-6">
		<div class="flex w-fit items-center justify-between">
			<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
				Caste Manager for {religionName}
			</h2>
		</div>

		<form on:submit={handleSubmit} class="flex w-fit flex-col space-y-4">
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

			<button
				type="submit"
				class="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700"
			>
				Save Religion
			</button>
		</form>
	</section>

	
</main>
