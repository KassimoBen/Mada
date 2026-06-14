const API = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API}${endpoint}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Une erreur est survenue');
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

async function uploadRequest(endpoint, formData, method = 'POST') {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API}${endpoint}`, { method, headers, body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Une erreur est survenue');
    return data;
  } catch (err) {
    console.error('API Upload Error:', err);
    throw err;
  }
}

export const api = {
  get: (url) => request(url),
  post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url, body) => request(url, { method: 'PUT', body: JSON.stringify(body) }),
  del: (url) => request(url, { method: 'DELETE' }),
  upload: (url, formData, method) => uploadRequest(url, formData, method),
};
