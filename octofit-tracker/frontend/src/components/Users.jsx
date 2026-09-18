import { useEffect, useState } from 'react';

import { fetchCollection } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchCollection('users');

        if (active) {
          setItems(data);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load users.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="eyebrow mb-1">Community</p>
            <h2 className="h3 mb-0">Users</h2>
          </div>
        </div>

        {loading && <p className="text-muted mb-0">Loading users…</p>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Fitness level</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted text-center py-4">
                      No user profiles available.
                    </td>
                  </tr>
                ) : (
                  items.map((user, index) => (
                    <tr key={`${user.username ?? user.email ?? 'user'}-${index}`}>
                      <td>{user.name ?? 'Unknown user'}</td>
                      <td>{user.username ?? '—'}</td>
                      <td>{user.fitnessLevel ?? '—'}</td>
                      <td>{user.teamId ?? '—'}</td>
                      <td>{user.totalPoints ?? user.points ?? 0}</td>
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

export default Users;
