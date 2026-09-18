import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, required: true, default: 'beginner' },
    teamId: { type: String },
    totalPoints: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
export const User = model('User', userSchema);
