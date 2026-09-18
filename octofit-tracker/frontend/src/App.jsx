import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-section container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="eyebrow">Workout community</p>
            <h1 className="display-4 fw-bold mb-3">Octofit Tracker</h1>
            <p className="lead text-secondary mb-4">
              Track activities, grow teams, and turn everyday fitness into a competitive,
              motivating routine.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <button type="button" className="btn btn-primary btn-lg px-4">
                Join challenge
              </button>
              <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                View leaderboard
              </button>
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
        </div>
      </section>
    </main>
  )
}

export default App
