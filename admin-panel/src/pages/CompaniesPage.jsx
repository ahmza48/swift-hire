import { useCallback, useEffect, useState } from 'react';
import { getRecords } from '../api/records.js';
import { deletePerson } from '../api/people.js';
import { deleteCompany, cleanupOrphanCompanies } from '../api/companies.js';
import { useAuth } from '../context/AuthContext.jsx';
import Alert from '../components/Alert.jsx';
import EditRecordModal from '../components/EditRecordModal.jsx';
import { getErrorMessage } from '../utils/errors.js';
import { getId } from '../utils/ids.js';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}

export default function CompaniesPage() {
  const { isAdmin } = useAuth();
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editingRecord, setEditingRecord] = useState(null);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getRecords({ search, page, limit: 20 });
      setRecords(data.records);
      setPagination(data.pagination);
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load records.'));
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(loadRecords, 300);
    return () => clearTimeout(timer);
  }, [loadRecords]);

  async function handleDelete(record) {
    const confirmed = window.confirm('Delete this person record?');
    if (!confirmed) return;

    setError('');
    setSuccess('');

    try {
      const result = await deletePerson(getId(record.personId));
      setSuccess(
        result.companyRemoved
          ? 'Person deleted. Company also removed from database.'
          : 'Person deleted.',
      );
      loadRecords();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to delete record.'));
    }
  }

  async function handleDeleteCompany(record) {
    const confirmed = window.confirm(
      'Delete this company and all related jobs and people?',
    );
    if (!confirmed) return;

    setError('');
    setSuccess('');

    try {
      await deleteCompany(getId(record.companyId));
      setSuccess('Company and all related records deleted from database.');
      loadRecords();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to delete company.'));
    }
  }

  async function handleCleanupOrphans() {
    const confirmed = window.confirm(
      'Remove orphaned companies from the database? (Companies with no people attached)',
    );
    if (!confirmed) return;

    setError('');
    setSuccess('');

    try {
      const result = await cleanupOrphanCompanies();
      setSuccess(result.message);
      loadRecords();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to clean up database.'));
    }
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Companies</h1>
          <p className="mt-1 text-sm text-slate-600">
            All records entered by every worker ({pagination.total} total)
          </p>
        </div>

        <input
          type="search"
          placeholder="Search company or person..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
        {isAdmin && (
          <button
            type="button"
            onClick={handleCleanupOrphans}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Clean Database
          </button>
        )}
      </div>

      {error && <div className="mb-4"><Alert message={error} /></div>}
      {success && <div className="mb-4"><Alert type="success" message={success} /></div>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-3">Company</th>
              <th className="px-3 py-3">Website</th>
              <th className="px-3 py-3">Company LinkedIn</th>
              <th className="px-3 py-3">Job Title</th>
              <th className="px-3 py-3">Job URL</th>
              <th className="px-3 py-3">Person</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Person LinkedIn</th>
              <th className="px-3 py-3">Added By</th>
              <th className="px-3 py-3">Date</th>
              {isAdmin && <th className="px-3 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={isAdmin ? 11 : 10} className="px-3 py-8 text-center text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 11 : 10} className="px-3 py-8 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={getId(record.personId)} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-3">{record.companyName}</td>
                  <td className="px-3 py-3">{record.companyWebsite}</td>
                  <td className="max-w-[160px] break-all px-3 py-3">{record.companyLinkedIn}</td>
                  <td className="px-3 py-3">{record.jobTitle}</td>
                  <td className="max-w-[160px] break-all px-3 py-3">{record.jobUrl}</td>
                  <td className="px-3 py-3">{record.personName}</td>
                  <td className="px-3 py-3">{record.email || record.email1}</td>
                  <td className="max-w-[160px] break-all px-3 py-3">{record.personLinkedIn}</td>
                  <td className="px-3 py-3">{record.addedBy}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatDate(record.dateAdded)}</td>
                  {isAdmin && (
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingRecord(record)}
                          className="text-left text-xs font-medium text-slate-700 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(record)}
                          className="text-left text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete Person
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompany(record)}
                          className="text-left text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete Company + All Data
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-600">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {editingRecord && (
        <EditRecordModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSaved={() => {
            setEditingRecord(null);
            loadRecords();
          }}
        />
      )}
    </section>
  );
}
