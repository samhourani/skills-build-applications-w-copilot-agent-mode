import { useEffect, useState } from 'react';

import { normalizeCollectionResponse } from '../utils/api';

const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        setLoading(true);
        const response = await fetch(workoutsApiUrl);

        if (!response.ok) {
          throw new Error('Unable to load workouts.');
        }

        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);

        if (active) {
          setItems(data);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load workouts.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">Program</p>
            <h2 className="h3 mb-0">Workouts</h2>
          </div>
        </div>

        {loading && <p className="text-muted mb-0">Loading workouts…</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12 text-muted">No workouts available.</div>
            ) : (
              items.map((workout, index) => (
                <div className="col-md-6 col-xl-4" key={`${workout.title ?? 'workout'}-${index}`}>
                  <div className="border rounded-4 p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h5 mb-0">{workout.title ?? 'Workout'}</h3>
                      <span className="badge bg-warning-subtle text-warning-emphasis">{workout.focus ?? 'General'}</span>
                    </div>
                    <p className="text-muted mb-2">{workout.description ?? 'No description provided.'}</p>
                    <div className="d-flex justify-content-between align-items-center text-sm">
                      <span className="text-muted">{workout.difficulty ?? 'Beginner'}</span>
                      <strong>{workout.durationMinutes ?? 0} min</strong>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
