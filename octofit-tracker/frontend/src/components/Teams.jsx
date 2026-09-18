import { useEffect, useState } from 'react';

import { fetchCollection } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        setLoading(true);
        const data = await fetchCollection('teams');

        if (active) {
          setItems(data);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load teams.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">Team overview</p>
            <h2 className="h3 mb-0">Teams</h2>
          </div>
        </div>

        {loading && <p className="text-muted mb-0">Loading teams…</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12 text-muted">No teams available.</div>
            ) : (
              items.map((team, index) => (
                <div className="col-md-6 col-xl-4" key={`${team.name ?? 'team'}-${index}`}>
                  <div className="border rounded-4 p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 mb-0">{team.name ?? 'Unnamed team'}</h3>
                      <span className="badge bg-success-subtle text-success-emphasis">{team.points ?? 0} pts</span>
                    </div>
                    <p className="text-muted mb-2">Captain: {team.captain ?? 'TBD'}</p>
                    <div>
                      <small className="text-uppercase text-muted">Members</small>
                      <div className="mt-2 d-flex flex-wrap gap-2">
                        {(team.members ?? []).map((member, memberIndex) => (
                          <span key={`${member}-${memberIndex}`} className="badge bg-light text-dark border">
                            {member}
                          </span>
                        ))}
                      </div>
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

export default Teams;
