// @ts-nocheck
import { json } from '@sveltejs/kit';
import fs from 'fs/promises';

const FILE_PATH = 'static/religions.json';

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

export async function GET() {
	return json(await readData());
}

export async function POST({ request }) {
	const religions = await readData();
	const newReligion = await request.json();

	newReligion.id = Date.now();
	religions.push(newReligion);

	await writeData(religions);
	return json({ message: 'Religion added successfully', religion: newReligion });
}

export async function DELETE({ request }) {
	const { id } = await request.json();
	let religions = await readData();

	religions = religions.filter((religion) => religion.id !== id);
	await writeData(religions);

	return json({ message: 'Religion deleted successfully' });
}

export async function PATCH({ request }) {
	const updatedReligion = await request.json();
	let religions = await readData();

	religions = religions.map((religion) =>
		religion.id === updatedReligion.id ? updatedReligion : religion
	);
	await writeData(religions);

	return json({ message: 'Religion updated successfully', religion: updatedReligion });
}
