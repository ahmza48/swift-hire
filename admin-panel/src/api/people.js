import api from './axios.js';

export async function createPeople(payload) {
  const { data } = await api.post('/people/bulk', payload);
  return data;
}

export async function updatePerson(id, payload) {
  const { data } = await api.put(`/people/${id}`, payload);
  return data;
}

export async function deletePerson(id) {
  const { data } = await api.delete(`/people/${id}`);
  return data;
}
