// @ts-nocheck
import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/db';
import { Caste } from '$lib/model/Casts';

export async function GET({ url }) {
	await connectDB();

	try {
		const religionId = url.searchParams.get('religionId');
		if (!religionId) return json({ error: 'Missing religionId' }, { status: 400 });

		const castes = await Caste.find({ religionId });
		return json(castes);
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function POST({ request }) {
	await connectDB();

	try {
		const newCaste = await request.json();
		const caste = new Caste({ ...newCaste, id: Date.now() });

		await caste.save();
		return json({ message: 'Caste added successfully', caste });
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE({ request }) {
	await connectDB();

	try {
		const { id } = await request.json();
		const response = await Caste.deleteOne({ _id: id });
		// acknowledged: true, deletedCount: 1
		if (response.acknowledged && response.deletedCount > 0) {
			return json({ message: 'Caste deleted successfully' });
		} else {
			return json({ error: 'Caste is not found' }, { status: 400 });
		}
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PATCH({ request }) {
	await connectDB();

	try {
		const updatedCaste = await request.json();

		const caste = await Caste.findByIdAndUpdate(updatedCaste.id, updatedCaste, {
			new: true
		});

		if (!caste) return json({ message: 'Caste not found' }, { status: 404 });

		return json({ message: 'Caste updated successfully', caste });
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
