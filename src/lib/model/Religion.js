import mongoose from 'mongoose';

const religionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});



export const Religion = mongoose.models.Religion || mongoose.model('Religion', religionSchema);
