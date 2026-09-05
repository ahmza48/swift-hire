import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompany } from '../api/companies.js';
import Alert from '../components/Alert.jsx';
import { getErrorMessage } from '../utils/errors.js';

export default function AddCompanyStepPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const company = await createCompany({ companyName, website, linkedinUrl });
      navigate('/add-company/job', {
        state: {
          companyId: company._id,
          company,
        },
      });
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to save company.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-xl rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">Step 1 of 3</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">Company</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && <Alert message={error} />}

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-slate-700">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-slate-700">
            Company Website
          </label>
          <input
            id="website"
            type="text"
            placeholder="https://example.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-slate-700">
            Company LinkedIn URL *
          </label>
          <input
            id="linkedinUrl"
            type="text"
            required
            placeholder="https://linkedin.com/company/your-company"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
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
