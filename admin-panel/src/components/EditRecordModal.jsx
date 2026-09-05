import { useState } from 'react';
import { updateCompany } from '../api/companies.js';
import { updateJob } from '../api/jobs.js';
import { updatePerson } from '../api/people.js';
import Alert from './Alert.jsx';
import { getErrorMessage } from '../utils/errors.js';
import { getId } from '../utils/ids.js';

export default function EditRecordModal({ record, onClose, onSaved }) {
  const [form, setForm] = useState({
    companyName: record.companyName || '',
    companyWebsite: record.companyWebsite || '',
    companyLinkedIn: record.companyLinkedIn || '',
    jobTitle: record.jobTitle || '',
    jobUrl: record.jobUrl || '',
    personName: record.personName || '',
    email: record.email || record.email1 || '',
    personLinkedIn: record.personLinkedIn || '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await Promise.all([
        updateCompany(getId(record.companyId), {
          companyName: form.companyName,
          website: form.companyWebsite,
          linkedinUrl: form.companyLinkedIn,
        }),
        record.jobId
          ? updateJob(getId(record.jobId), {
              jobTitle: form.jobTitle,
              jobUrl: form.jobUrl,
            })
          : Promise.resolve(),
        updatePerson(getId(record.personId), {
          name: form.personName,
          email1: form.email,
          linkedinUrl: form.personLinkedIn,
        }),
      ]);
      onSaved();
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to save changes.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Edit Record</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && <Alert message={error} />}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company Name" value={form.companyName} onChange={(v) => updateField('companyName', v)} />
            <Field label="Company Website" value={form.companyWebsite} onChange={(v) => updateField('companyWebsite', v)} />
            <Field label="Company LinkedIn" value={form.companyLinkedIn} onChange={(v) => updateField('companyLinkedIn', v)} />
            <Field label="Job Title" value={form.jobTitle} onChange={(v) => updateField('jobTitle', v)} />
            <Field label="Job URL" value={form.jobUrl} onChange={(v) => updateField('jobUrl', v)} />
            <Field label="Person Name" value={form.personName} onChange={(v) => updateField('personName', v)} />
            <Field label="Email *" value={form.email} onChange={(v) => updateField('email', v)} required />
            <Field label="Person LinkedIn" value={form.personLinkedIn} onChange={(v) => updateField('personLinkedIn', v)} />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
      />
    </div>
  );
}
