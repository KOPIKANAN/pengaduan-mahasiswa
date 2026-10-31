const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`Permintaan gagal (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// Password tidak disimpan polos: diubah menjadi hash SHA-256 di peramban
export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function findUserByEmail(email) {
  try {
    const list = await request(`/users?email=${encodeURIComponent(email)}`);
    return list.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  } catch (e) {
    if (e.status === 404) return null; // MockAPI bisa membalas 404 saat filter tidak menemukan apa pun
    throw e;
  }
}

export const createUser = (data) => request('/users', { method: 'POST', body: JSON.stringify(data) });
export const updateUser = (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });