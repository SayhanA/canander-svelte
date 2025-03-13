<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	let religons = [];
	let castes = [];
	let selectedReligion = null;
	let selectedCaste = null;

	let url = 'api/religions';

	async function fetchReligionCaste() {
		try {
			const response = await fetch(url);
			const data = await response.json();
			religons = data;

			if (religons.length > 0) {
				selectedReligion = religons[0];
				await fetchCaste(selectedReligion._id);
			}
		} catch (error) {
			console.error('Error fetching religions:', error);
		}
	}

	async function fetchCaste(religionId) {
		try {
			const response = await fetch(`/api/religion_caste?religionId=${religionId}`);

			if (!response.ok) {
				throw new Error('Failed to fetch caste data');
			}

			castes = await response.json();

			if (castes.length > 0) {
				selectedCaste = castes[0];
			}
		} catch (error) {
			console.error('Error fetching caste data:', error);
			castes = [];
		}
	}

	function handleSelect(id) {
		selectedReligion = religons.find(r => r._id === id);
		fetchCaste(id);
	}

	function handleCasteSelect(id) {
		selectedCaste = castes.find(c => c._id === id);
	}

	onMount(fetchReligionCaste);
</script>

<svelte:head>
	<title>Calander | Religions Caste</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<main>
	<section>
		<div class="flex min-h-full w-full flex-col py-12 sm:px-6 lg:px-8">
			<div class="rounded bg-[rgb(20,100,111)] p-2">
				<div class="flex dark:text-white">
					<div class="w-full rounded bg-[rgb(20,100,111)] p-1">
						<div class="flex space-x-4 rounded border border-blue-500 p-3">
							<div class="flex-1">
								<label for="religion-select" class="block font-medium text-gray-900">
									Select a Religion:
								</label>
								<select
									id="religion-select"
									class="mt-2 mb-2 w-full max-w-xs rounded border bg-white px-3 py-1 dark:text-gray-900"
									on:change={(event) => handleSelect(event.target.value)}
								>
									{#each religons as religion}
										<option value={religion._id} selected={religion._id === selectedReligion?._id}>
											{religion.name}
										</option>
									{/each}
								</select>
							</div>

							<div class="flex-1">
								<label for="caste-select" class="block font-medium text-gray-900">
									Select a Caste:
								</label>
								<select
									id="caste-select"
									class="mt-2 mb-2 w-full max-w-xs rounded border bg-white px-3 py-1 dark:text-gray-900"
									disabled={castes.length === 0}
									on:change={(event) => handleCasteSelect(event.target.value)}
								>
									{#each castes as caste}
										<option value={caste._id} selected={caste._id === selectedCaste?._id}>
											{caste.name}
										</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			{#if selectedReligion}
				<div class="bg-[rgb(219 196 231)] rounded p-2">
					<h2>Selected Religion:</h2>
					<p>Religion: {selectedReligion.name}</p>
					<p>ReligionId: {selectedReligion._id}</p>

					{#if selectedCaste}
						<p>Caste: {selectedCaste.name}</p>
						<p>CasteId: {selectedCaste._id}</p>
					{/if}
				</div>
			{/if}
		</div>
	</section>
</main>

