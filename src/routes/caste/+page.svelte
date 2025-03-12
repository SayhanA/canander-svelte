<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import CastesForm from '../../components/CastesForm.svelte';
	import CastesTable from '../../components/CastesTable.svelte';
	import { Toaster } from 'svelte-french-toast';

	// @ts-nocheck

	let religionId = 'Unknown ID';
	let religionName = 'Unknown Religion';
	let id = '';
	let name = '';
	let description = '';
	let castes = [];

	// Extract parameters from URL
	if (typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);
		religionId = params.get('religionId') || 'Unknown ID';
		religionName = decodeURIComponent(params.get('religionName') || 'Unknown Religion');
	}

	async function fetchCastes() {
		const response = await fetch(`/api/castes?religionId=${religionId}`);
		castes = await response.json();
	}

	function handleEdit(caste) {
		id = caste.id;
		name = caste.name;
		description = caste.description;
	}

	onMount(fetchCastes);
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

	<CastesForm
		{religionId}
		{religionName}
		castId={id}
		castName={name}
		castDes={description}
		{handleEdit}
	/>

	{#if id === ''}
		<CastesTable {castes} {handleEdit} />
	{/if}
</main>
