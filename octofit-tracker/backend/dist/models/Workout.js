import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true, default: 'moderate' },
    durationMinutes: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
