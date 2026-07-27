import api from './api';

export async function getAlbums(search = '') {
  const response = await api.get('/api/albums/', {
    params: search ? { search } : {},
  });
  return response.data;
}

export async function getAlbum(id) {
  const response = await api.get(`/api/albums/${id}/`);
  return response.data;
}

export async function createAlbum(data) {
  const response = await api.post('/api/albums/', data);
  return response.data;
}

export async function updateAlbum(id, data) {
  const response = await api.patch(`/api/albums/${id}/`, data);
  return response.data;
}

export async function deleteAlbum(id) {
  await api.delete(`/api/albums/${id}/`);
}