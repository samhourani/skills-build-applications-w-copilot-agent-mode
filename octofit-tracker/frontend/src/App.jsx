import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './utils/api';

const navItems = [
  { to: '/', label: 'Overview', exact: true },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function HomePage() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <>
      <section className="hero-section row align-items-center g-4 mb-5">
        <div className="col-lg-7">
          <p className="eyebrow">Workout community</p>
          <h1 className="display-4 fw-bold mb-3">Octofit Tracker</h1>
          <p className="lead text-secondary mb-4">
            Track activities, grow teams, and turn everyday fitness into a competitive,
            motivating routine.
          </p>
          <div className="d-flex gap-3 flex-wrap mb-4">
            <NavLink to="/leaderboard" className="btn btn-primary btn-lg px-4">
              View leaderboard
            </NavLink>
            <NavLink to="/workouts" className="btn btn-outline-secondary btn-lg px-4">
              Explore workouts
            </NavLink>
          </div>
          <div className="alert alert-info mb-0 d-inline-block">
            API base: <strong>{apiBaseUrl}/api/</strong>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="stats-card card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Weekly goals</span>
                <span className="badge bg-success-subtle text-success-emphasis">On track</span>
              </div>
              <div className="display-6 fw-bold mb-1">84%</div>
              <div className="progress" role="progressbar" aria-label="Weekly goal progress">
                <div className="progress-bar" style={{ width: '84%' }}></div>
              </div>
              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item px-0">
                  <span className="text-muted">Team streak</span>
                  <strong className="float-end">12 days</strong>
                </li>
                <li className="list-group-item px-0">
                  <span className="text-muted">Distance</span>
                  <strong className="float-end">48.2 km</strong>
                </li>
                <li className="list-group-item px-0">
                  <span className="text-muted">Workouts</span>
                  <strong className="float-end">18 logged</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-3">
        <div className="col-md-6 col-xl-3">
          <div className="feature-card card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Users</h2>
              <p className="text-muted mb-0">Profile strength, streaks, and performance trends.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="feature-card card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Teams</h2>
              <p className="text-muted mb-0">Create accountability and track collaborative progress.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="feature-card card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Activities</h2>
              <p className="text-muted mb-0">Review workouts and daily movement from every member.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="feature-card card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5">Workouts</h2>
              <p className="text-muted mb-0">Find structured plans and challenge mode suggestions.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <NavLink to="/" className="navbar-brand fw-bold text-primary">
              Octofit Tracker
            </NavLink>
            <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded-pill ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
