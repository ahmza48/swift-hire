import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import AddCompanyStepPage from '../pages/AddCompanyStepPage.jsx';
import AddJobStepPage from '../pages/AddJobStepPage.jsx';
import AddPeopleStepPage from '../pages/AddPeopleStepPage.jsx';
import CompaniesPage from '../pages/CompaniesPage.jsx';
import UsersPage from '../pages/UsersPage.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="add-company" element={<AddCompanyStepPage />} />
          <Route path="add-company/job" element={<AddJobStepPage />} />
          <Route path="add-company/people" element={<AddPeopleStepPage />} />
          <Route path="companies" element={<CompaniesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<MainLayout />}>
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
