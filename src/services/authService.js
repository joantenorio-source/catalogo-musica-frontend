import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// Inicia sesión: pide el token al backend y lo guarda en localStorage
export async function login(username, password) {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);

  const response = await axios.post(`${API_URL}/o/token/`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { access_token, refresh_token } = response.data;

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  return response.data;
}

// Cierra sesión: borra los tokens guardados
export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

// Devuelve el access_token actual (o null si no hay)
export function getToken() {
  return localStorage.getItem('access_token');
}

// True si hay un token guardado (usuario "logueado")
export function isLogged() {
  return !!localStorage.getItem('access_token');
}