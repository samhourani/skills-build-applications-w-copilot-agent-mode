export const mockUsers = [
  {
    name: 'Ava Martinez',
    email: 'ava@example.com',
    username: 'ava',
    fitnessLevel: 'advanced',
    teamId: 'blue-bears',
    totalPoints: 1320,
    streak: 12,
  },
  {
    name: 'Noah Kim',
    email: 'noah@example.com',
    username: 'noah',
    fitnessLevel: 'intermediate',
    teamId: 'red-raptors',
    totalPoints: 1185,
    streak: 9,
  },
  {
    name: 'Mia Patel',
    email: 'mia@example.com',
    username: 'mia',
    fitnessLevel: 'beginner',
    teamId: 'green-gators',
    totalPoints: 940,
    streak: 7,
  },
];

export const mockTeams = [
  {
    name: 'Blue Bears',
    captain: 'ava',
    points: 4200,
    members: ['ava', 'leo', 'sophia'],
  },
  {
    name: 'Red Raptors',
    captain: 'noah',
    points: 3890,
    members: ['noah', 'zane', 'maya'],
  },
  {
    name: 'Green Gators',
    captain: 'mia',
    points: 3560,
    members: ['mia', 'eli', 'nora'],
  },
];

export const mockActivities = [
  {
    userId: 'ava',
    type: 'running',
    durationMinutes: 40,
    caloriesBurned: 510,
    date: new Date('2026-09-10T07:15:00.000Z'),
    notes: 'Morning 5k pace',
  },
  {
    userId: 'noah',
    type: 'strength',
    durationMinutes: 35,
    caloriesBurned: 420,
    date: new Date('2026-09-09T18:30:00.000Z'),
    notes: 'Upper body day',
  },
  {
    userId: 'mia',
    type: 'walking',
    durationMinutes: 25,
    caloriesBurned: 170,
    date: new Date('2026-09-08T06:45:00.000Z'),
    notes: 'Recovery walk',
  },
];

export const mockLeaderboard = [
  { userId: 'ava', username: 'ava', score: 1320, rank: 1 },
  { userId: 'noah', username: 'noah', score: 1185, rank: 2 },
  { userId: 'mia', username: 'mia', score: 940, rank: 3 },
];

export const mockWorkouts = [
  {
    title: 'Speed Intervals',
    focus: 'cardio',
    difficulty: 'advanced',
    durationMinutes: 30,
    description: 'Short bursts of sprinting with active recovery for quick aerobic gains.',
  },
  {
    title: 'Core Stability Circuit',
    focus: 'core',
    difficulty: 'moderate',
    durationMinutes: 25,
    description: 'Planks, dead bugs, and bridges to improve posture and balance.',
  },
  {
    title: 'Mobility Reset',
    focus: 'recovery',
    difficulty: 'beginner',
    durationMinutes: 20,
    description: 'Gentle movement and stretching to reduce stiffness and recover faster.',
  },
];
