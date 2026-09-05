import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobs.js';
import Alert from '../components/Alert.jsx';
import { getErrorMessage } from '../utils/errors.js';

export default function AddJobStepPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId, company } = location.state || {};

  const [jobTitle, setJobTitle] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!companyId) {
    return <Navigate to="/add-company" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const job = await createJob({ companyId, jobTitle, jobUrl });
      navigate('/add-company/people', {
        state: {
          companyId,
          company,
          jobId: job._id,
          job,
        },
      });
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to save job.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-xl rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">Step 2 of 3</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">Job</h1>

      <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
        <p className="font-medium">{company?.companyName}</p>
        {company?.website && <p className="mt-1">{company.website}</p>}
        <p className="mt-1 break-all">{company?.linkedinUrl}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && <Alert message={error} />}

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-700">
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            required
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="jobUrl" className="block text-sm font-medium text-slate-700">
            Job URL
          </label>
          <input
            id="jobUrl"
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Next'}
        </button>
      </form>
    </section>
  );
}
