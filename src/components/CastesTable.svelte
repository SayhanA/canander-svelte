<script>
// @ts-nocheck

	let { castes, handleEdit } = $props();

    async function handleDelete(id) {
        await fetch('api/castes', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ id })
        })
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
                        <td class="p-3"><input type="checkbox" class="w-5 h-5" /></td>
                        <td class="p-3 font-semibold">{caste.name}</td>
                        <td class="p-3 max-w-xs truncate">{caste.description}</td>
                        <!-- <td class="p-3">{caste.isActive ? '✅ Yes' : '❌ No'}</td> -->
                        <td class="p-3 flex justify-center space-x-2">
                            <button onclick={() => handleEdit(caste)} class="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">Edit</button>
                            <button onclick={() => handleDelete(caste.id)} class="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Delete</button>
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
