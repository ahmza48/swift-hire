import api from './axios.js';

export async function getRecords(params) {
  const { data } = await api.get('/records', { params });
  return data;
}
