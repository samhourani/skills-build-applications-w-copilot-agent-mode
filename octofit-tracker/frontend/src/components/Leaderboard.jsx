import { useEffect, useState } from 'react';

import { normalizeCollectionResponse } from '../utils/api';

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        setLoading(true);
        const response = await fetch(leaderboardApiUrl);

        if (!response.ok) {
          throw new Error('Unable to load leaderboard.');
        }

        const payload = await response.json();
        const data = normalizeCollectionResponse(payload);

        if (active) {
          setItems(data);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">Competition</p>
            <h2 className="h3 mb-0">Leaderboard</h2>
          </div>
        </div>

        {loading && <p className="text-muted mb-0">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="list-group list-group-flush">
            {items.length === 0 ? (
              <p className="text-muted mb-0">No leaderboard entries yet.</p>
            ) : (
              items.map((item, index) => (
                <div key={`${item.userId ?? 'leaderboard'}-${index}`} className="list-group-item px-0">
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <div>
                      <div className="fw-semibold">
                        #{item.rank ?? index + 1} {item.username ?? item.userId ?? 'Athlete'}
                      </div>
                      <small className="text-muted">{item.team ?? 'Independent'} team</small>
                    </div>
                    <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill px-3 py-2">
                      {item.score ?? item.totalPoints ?? 0} pts
                    </span>
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

export default Leaderboard;
