import api from './api';

export async function getArtists() {
  const response = await api.get('/api/artists/');
  return response.data;
}

export async function getArtist(id) {
  const response = await api.get(`/api/artists/${id}/`);
  return response.data;
}

export async function createArtist(data) {
  const response = await api.post('/api/artists/', data);
  return response.data;
}

export async function updateArtist(id, data) {
  const response = await api.patch(`/api/artists/${id}/`, data);
  return response.data;
}

export async function deleteArtist(id) {
  await api.delete(`/api/artists/${id}/`);
}
