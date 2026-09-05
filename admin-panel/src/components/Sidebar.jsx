import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function Sidebar() {
  const { isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-5">
        <h1 className="text-lg font-semibold text-slate-900">Staffing Vero</h1>
        {user && <p className="mt-1 text-xs text-slate-500">{user.name}</p>}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/add-company" className={linkClass}>
          Add Company
        </NavLink>
        <NavLink to="/companies" className={linkClass}>
          Companies
        </NavLink>
        {isAdmin && (
          <NavLink to="/users" className={linkClass}>
            Users
          </NavLink>
        )}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
