import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  fitnessLevel: string;
  teamId?: string;
  totalPoints: number;
  streak: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, required: true, default: 'beginner' },
    teamId: { type: String },
    totalPoints: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
