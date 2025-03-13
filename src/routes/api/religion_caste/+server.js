// @ts-nocheck
import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/db';
import { Caste } from '$lib/model/Casts';

export async function GET({ url }) {
	await connectDB();

	try {
		const religionId = url.searchParams.get('religionId');

		if (!religionId) {
			return json({ error: 'Missing religionId' }, { status: 400 });
		}

		const castes = await Caste.find({ religionId });

		if (!castes.length) {
			return json({ error: 'No castes found for this religion' }, { status: 404 });
		}

		console.log('Fetched Castes:', castes);
		return json(castes);
	} catch (error) {
		console.error('Server error:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
