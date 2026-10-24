const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Permintaan gagal (${res.status})`);
  return res.json();
}

export const getReports = async () => [...(await request('/reports'))].reverse();
export const createReport = (data) => request('/reports', { method: 'POST', body: JSON.stringify(data) });
export const updateReport = (id, data) => request(`/reports/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteReport = (id) => request(`/reports/${id}`, { method: 'DELETE' });