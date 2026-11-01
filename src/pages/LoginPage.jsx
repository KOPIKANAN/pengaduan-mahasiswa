// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { findUserByEmail, hashPassword } from '../services/userApi';

export default function LoginPage({ onLogin, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const ADMIN_EMAIL_KHUSUS = 'admin@univ.ac.id';
      const ADMIN_PASSWORD_KHUSUS = 'iniadmin#123';

      // 1. CEK JIKA INI AKUN ADMIN KHUSUS
      if (trimmedEmail === ADMIN_EMAIL_KHUSUS.toLowerCase()) {
        if (password.trim() === ADMIN_PASSWORD_KHUSUS) {
          onLogin({ name: 'Admin Sarpras Kampus', email: trimmedEmail });
          return;
        } else {
          setError('Password Admin salah!');
          setIsSubmitting(false);
          return;
        }
      }

      // 2. JIKA BUKAN ADMIN, LANJUTKAN CEK KE DATABASE MAHASISWA
      const found = await findUserByEmail(trimmedEmail);
      const hash = await hashPassword(password.trim());

      if (found && found.passwordHash === hash) {
        onLogin({ name: found.name, email: found.email });
      } else {
        setError('Email atau password salah, atau akun belum terdaftar!');
      }
    } catch {
      setError('Gagal menghubungi server. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2d2828] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative bg-gray-200 min-h-[280px] md:min-h-full overflow-hidden">
          <img
            src="/images/hallway.png"
            alt="Campus Hallway"
            className="w-full h-full object-cover object-center absolute inset-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
            Login
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-14 py-10 md:py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
            Selamat Datang di <span className="text-brand-dark">SiLapor</span>
          </h1>

          {/* Pesan Error jika login gagal */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email anda"
                required
                className="w-full px-5 py-3.5 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password anda"
                required
                className="w-full px-5 py-3.5 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium"
              />
            </div>

            <div className="pt-2 flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-[240px] py-2.5 px-8 rounded-xl border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold text-base transition-all duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Memproses...' : 'Masuk'}
              </button>

              <p className="mt-4 text-xs text-gray-500 font-medium">
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={goToRegister}
                  className="text-brand-dark font-bold hover:underline cursor-pointer"
                >
                  Daftar
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}