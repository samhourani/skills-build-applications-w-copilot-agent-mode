import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
}, { timestamps: true });
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
