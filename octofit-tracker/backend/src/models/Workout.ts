import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  description: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true, default: 'moderate' },
    durationMinutes: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
