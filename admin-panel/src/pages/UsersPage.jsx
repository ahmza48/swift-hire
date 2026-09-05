import { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../api/users.js';
import Alert from '../components/Alert.jsx';
import { getErrorMessage } from '../utils/errors.js';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function loadUsers() {
    setLoading(true);
    setError('');
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load users.'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreate(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await createUser(form);
      setForm({ name: '', email: '', password: '' });
      loadUsers();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to create worker.'));
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(user) {
    try {
      await updateUser(user.id, { isActive: !user.isActive });
      loadUsers();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to update worker.'));
    }
  }

  async function changePassword(user) {
    const password = window.prompt(`Enter new password for ${user.name}:`);
    if (!password) return;

    try {
      await updateUser(user.id, { password });
      alert('Password updated.');
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to change password.'));
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(`Delete worker ${user.name}?`);
    if (!confirmed) return;

    try {
      await deleteUser(user.id);
      loadUsers();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to delete worker.'));
    }
  }

  return (
    <section className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
      <p className="mt-1 text-sm text-slate-600">Manage worker accounts</p>

      {error && <div className="mt-4"><Alert message={error} /></div>}

      <form onSubmit={handleCreate} className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">Add Worker</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? 'Adding...' : 'Add Worker'}
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No workers yet.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => toggleActive(user)}
                        className="text-xs font-medium text-slate-700 hover:underline"
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => changePassword(user)}
                        className="text-xs font-medium text-slate-700 hover:underline"
                      >
                        Change Password
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
