import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { createPeople } from '../api/people.js';
import Alert from '../components/Alert.jsx';
import { getErrorMessage } from '../utils/errors.js';

const emptyPerson = () => ({
  name: '',
  email1: '',
  linkedinUrl: '',
});

export default function AddPeopleStepPage() {
  const location = useLocation();
  const { companyId, jobId, company, job } = location.state || {};

  const [people, setPeople] = useState([
    emptyPerson(),
    emptyPerson(),
    emptyPerson(),
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!companyId || !jobId) {
    return <Navigate to="/add-company" replace />;
  }

  function updatePerson(index, field, value) {
    setPeople((current) =>
      current.map((person, i) => (i === index ? { ...person, [field]: value } : person)),
    );
  }

  function addPerson() {
    setPeople((current) => [...current, emptyPerson()]);
  }

  function removePerson(index) {
    if (people.length <= 1) return;
    setPeople((current) => current.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const filledPeople = people.filter(
      (person) => person.name.trim() || person.email1.trim() || person.linkedinUrl.trim(),
    );

    if (filledPeople.length === 0) {
      setError('Please enter at least one person.');
      setSubmitting(false);
      return;
    }

    for (const person of filledPeople) {
      if (!person.name.trim()) {
        setError('Every person must have a name.');
        setSubmitting(false);
        return;
      }
      if (!person.email1.trim()) {
        setError('Every person must have an email.');
        setSubmitting(false);
        return;
      }
    }

    try {
      await createPeople({ companyId, jobId, people: filledPeople });
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to save people.'));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="max-w-xl rounded-xl border border-slate-200 bg-white p-6">
        <Alert type="success" message="Information saved successfully." />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/add-company"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Add Another Company
          </Link>
          <Link
            to="/companies"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            View Companies
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6">
      <p className="text-sm font-medium text-slate-500">Step 3 of 3</p>
      <h1 className="mt-1 text-2xl font-semibold text-slate-900">People</h1>
      <p className="mt-1 text-sm text-slate-600">
        Add up to three or more people. Each person needs a name and one email.
      </p>

      <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
        <p className="font-medium">{company?.companyName}</p>
        <p className="mt-1">{job?.jobTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {error && <Alert message={error} />}

        {people.map((person, index) => (
          <div key={index} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">Person {index + 1}</h2>
              {people.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePerson(index)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Person Name *</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => updatePerson(index, 'name', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email *</label>
                <input
                  type="email"
                  value={person.email1}
                  onChange={(e) => updatePerson(index, 'email1', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">LinkedIn URL</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/username"
                  value={person.linkedinUrl}
                  onChange={(e) => updatePerson(index, 'linkedinUrl', e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPerson}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          + Add Another Person
        </button>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  );
}
