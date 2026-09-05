import api from './axios.js';

export async function cleanupOrphanCompanies() {
  const { data } = await api.post('/companies/cleanup-orphans');
  return data;
}

export async function createCompany(payload) {
  const { data } = await api.post('/companies', payload);
  return data;
}

export async function updateCompany(id, payload) {
  const { data } = await api.put(`/companies/${id}`, payload);
  return data;
}

export async function deleteCompany(id) {
  const { data } = await api.delete(`/companies/${id}`);
  return data;
}
