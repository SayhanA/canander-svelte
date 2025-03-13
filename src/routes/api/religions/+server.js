// @ts-nocheck
import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/db';
import { Religion } from '$lib/model/Religion';

export async function GET() {
	await connectDB();

	try {
		const religions = await Religion.find();
		return json(religions);
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function POST({ request }) {
    await connectDB();

    try {
        const rawData = await request.text();
        const newReligion = JSON.parse(rawData);
        console.log('New Religion:', newReligion);

        const religion = new Religion(newReligion);
        console.log('Religion:', religion);
        
        await religion.save();
        return json({ message: 'Religion added successfully', religion });
    } catch (error) {
        console.error('Error saving religion:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE({ request }) {
	await connectDB();

	try {
		const { id } = await request.json();
		if (!id) return json({ error: 'ID is required' }, { status: 400 });

		const deletedReligion = await Religion.findByIdAndDelete(id);
		if (!deletedReligion) return json({ error: 'Religion not found' }, { status: 404 });

		return json({ message: 'Religion deleted successfully' });
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PATCH({ request }) {
	await connectDB();

	try {
		const updatedReligion = await request.json();
		console.log('Updated Religion:', updatedReligion);

		const religion = await Religion.findByIdAndUpdate(updatedReligion.id, updatedReligion, {
			new: true
		});

		if (!religion) return json({ message: 'Religion not found' }, { status: 404 });

		return json({ message: 'Religion updated successfully', religion });
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
