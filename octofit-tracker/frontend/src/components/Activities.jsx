import { useEffect, useState } from 'react';

import { fetchCollection } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        setLoading(true);
        const data = await fetchCollection('activities');

        if (active) {
          setItems(data);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load activities.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">Recent activity</p>
            <h2 className="h3 mb-0">Activities</h2>
          </div>
        </div>

        {loading && <p className="text-muted mb-0">Loading activities…</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted text-center py-4">
                      No activities recorded yet.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={`${item.userId ?? 'activity'}-${index}`}>
                      <td>{item.userId ?? 'Unknown user'}</td>
                      <td>{item.type ?? 'Workout'}</td>
                      <td>{item.durationMinutes ?? 0} min</td>
                      <td>{item.caloriesBurned ?? 0}</td>
                      <td>{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
