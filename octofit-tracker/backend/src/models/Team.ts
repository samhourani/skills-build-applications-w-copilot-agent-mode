import { Schema, model, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  captain: string;
  points: number;
  members: string[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    points: { type: Number, default: 0 },
    members: [{ type: String }],
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);
