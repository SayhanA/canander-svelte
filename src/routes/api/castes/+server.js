// @ts-nocheck
import { json } from '@sveltejs/kit';
import fs from 'fs/promises';

const FILE_PATH = 'static/castes.json';

async function readData() {
	try {
		const data = await fs.readFile(FILE_PATH, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function writeData(data) {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
}

export async function GET({ url }) {
    try {
        const religionId = url.searchParams.get('religionId');
        if (!religionId) return json({ error: 'Missing religionId' }, { status: 400 });

        const data = await readData();
        const filteredCastes = data.filter(caste => caste.religionId === religionId);

        return json(filteredCastes);
    } catch (error) {
        console.log(error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST({ request }) {
	const castes = await readData();
	const newCaste = await request.json();

	newCaste.id = Date.now();
	castes.push(newCaste);

	await writeData(castes); 
	return json({ message: 'Caste added successfully', caste: newCaste });
}

export async function DELETE({request}) {
    const {id} = await request.json();
    let castes = await readData();

    castes = castes.filter(caste => caste.id !== id);
    await writeData(castes);

    return json({message: 'Caste deleted successfully'});
}

export async function PATCH({ request }) {
    const updatedCaste = await request.json();

    let castes = await readData();
    
    // Ensure that the ID exists in the dataset
    const index = castes.findIndex(caste => caste.id === updatedCaste.id);
    if (index === -1) {
        return json({ message: 'Caste not found' }, { status: 404 });
    }

    // Update the specific caste
    castes[index] = { ...castes[index], ...updatedCaste };

    // Write the updated list back to storage
    await writeData(castes);

    return json({ message: 'Caste updated successfully', caste: castes[index] });
}

