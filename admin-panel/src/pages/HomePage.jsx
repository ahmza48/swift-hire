import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-8">
      <h1 className="text-2xl font-semibold text-slate-900">Welcome, {user?.name}</h1>
      <p className="mt-2 text-slate-600">
        Use this tool to enter company, job, and recruiter information found on LinkedIn.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/add-company"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add Company
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
