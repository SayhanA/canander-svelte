import mongoose from 'mongoose';

const casteSchema = new mongoose.Schema({
    name: String,
    description: String,
    religionId: String
});

export const Caste = mongoose.models.Caste || mongoose.model('Caste', casteSchema);
