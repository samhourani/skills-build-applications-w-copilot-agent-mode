import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import db from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Octofit Tracker API is running',
    database: db.name || 'mongodb',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    message: 'Welcome to the Octofit Tracker API',
    endpoints: ['/api/health'],
  });
});

app.listen(port, () => {
  console.log(`Octofit Tracker API running on http://localhost:${port}`);
});
