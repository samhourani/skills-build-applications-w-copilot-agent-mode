import dotenv from 'dotenv';
import { connectDatabase } from '../config/database.js';
import { mockActivities, mockLeaderboard, mockTeams, mockUsers, mockWorkouts } from '../data/mockData.js';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
dotenv.config();
async function seedDatabase() {
    try {
        await connectDatabase();
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        await Promise.all([
            User.insertMany(mockUsers),
            Team.insertMany(mockTeams),
            Activity.insertMany(mockActivities),
            LeaderboardEntry.insertMany(mockLeaderboard),
            Workout.insertMany(mockWorkouts),
        ]);
        console.log('Database seeding complete for Octofit Tracker');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
