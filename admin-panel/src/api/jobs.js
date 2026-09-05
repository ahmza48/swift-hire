import api from './axios.js';

export async function createJob(payload) {
  const { data } = await api.post('/jobs', payload);
  return data;
}

export async function updateJob(id, payload) {
  const { data } = await api.put(`/jobs/${id}`, payload);
  return data;
}
