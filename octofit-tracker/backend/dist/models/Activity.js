import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);
