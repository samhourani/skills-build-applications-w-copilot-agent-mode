import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';

import { connectDatabase, databaseState } from './config/database.js';
import { Activity, type IActivity } from './models/Activity.js';
import { LeaderboardEntry, type ILeaderboardEntry } from './models/LeaderboardEntry.js';
import { Team, type ITeam } from './models/Team.js';
import { User, type IUser } from './models/User.js';
import { Workout, type IWorkout } from './models/Workout.js';
import {
  mockActivities,
  mockLeaderboard,
  mockTeams,
  mockUsers,
  mockWorkouts,
} from './data/mockData.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendBaseUrl = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

const resourceOptions = {
  users: { model: User, fallback: mockUsers },
  teams: { model: Team, fallback: mockTeams },
  activities: { model: Activity, fallback: mockActivities },
  leaderboard: { model: LeaderboardEntry, fallback: mockLeaderboard },
  workouts: { model: Workout, fallback: mockWorkouts },
} as const;

async function readResources(resource: keyof typeof resourceOptions): Promise<any[]> {
  const { model, fallback } = resourceOptions[resource];

  try {
    const documents = await (model as any).find().lean();
    if (documents.length > 0) {
      return documents as any[];
    }
    return fallback as any[];
  } catch (error) {
    console.warn(
      `Using in-memory fallback for ${resource}:`,
      error instanceof Error ? error.message : String(error),
    );
    return fallback as any[];
  }
}

async function createResource(
  resource: keyof typeof resourceOptions,
  payload: Record<string, unknown>,
): Promise<any> {
  const { model, fallback } = resourceOptions[resource];

  try {
    const created = await (model as any).create(payload);
    return created?.toObject ? created.toObject() : created;
  } catch (error) {
    const generated = {
      ...payload,
      id: `mock-${resource}-${randomUUID()}`,
    } as any;
    const items = [...(fallback as any[])];
    items.push(generated);
    return generated;
  }
}

function registerCollectionRoutes(resource: keyof typeof resourceOptions, routePath: string) {
  app.get([routePath, `${routePath}/`], async (_req: Request, res: Response) => {
    const data = await readResources(resource);
    res.json({
      resource,
      apiBaseUrl,
      source: databaseState.connected ? 'database' : 'memory',
      data,
    });
  });

  app.post([routePath, `${routePath}/`], async (req: Request, res: Response) => {
    const item = await createResource(resource, req.body);
    res.status(201).json({
      resource,
      apiBaseUrl,
      item,
    });
  });
}

app.use(
  cors({
    origin: [
      frontendBaseUrl,
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8000',
      'https://localhost:5173',
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Octofit Tracker API is running',
    database: databaseState.connected ? 'mongodb' : 'memory',
    apiBaseUrl,
    frontendBaseUrl,
  });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Octofit Tracker API',
    apiBaseUrl,
    frontendBaseUrl,
    endpoints: [
      '/api/health',
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
    ],
  });
});

registerCollectionRoutes('users', '/api/users');
registerCollectionRoutes('teams', '/api/teams');
registerCollectionRoutes('activities', '/api/activities');
registerCollectionRoutes('leaderboard', '/api/leaderboard');
registerCollectionRoutes('workouts', '/api/workouts');

app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    codespaceName,
    apiBaseUrl,
    frontendBaseUrl,
    port,
  });
});

await connectDatabase();

app.listen(port, () => {
  console.log(`Octofit Tracker API running on ${apiBaseUrl}`);
});
