# Octofit Tracker Frontend

This Vite app renders the Octofit Tracker dashboard and talks to the backend API for users, teams, activities, leaderboard entries, and workouts.

## Environment configuration

Create a local environment file at `.env.local` in the frontend folder and define the codespace host name before running the app:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

This value is required for the codespace API URL pattern:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not defined, the app falls back to the local backend at `http://localhost:8000` to avoid generating `https://undefined-8000...` URLs.

## Local development

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

The app uses `react-router-dom` for page navigation and reads data from the backend using Vite environment variables via `import.meta.env`.
