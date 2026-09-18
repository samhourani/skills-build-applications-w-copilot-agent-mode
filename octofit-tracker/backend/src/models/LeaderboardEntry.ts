import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  username: string;
  score: number;
  rank: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
