import React, { useState } from 'react';

export default function LoginPage({ onLogin, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Ambil data users dari localStorage
    const existingUsers = JSON.parse(localStorage.getItem('silapor_users')) || [];

    // Cari apakah ada user dengan email dan password yang cocok
    const foundUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Jika cocok, jalankan fungsi onLogin milik parent component
      onLogin(foundUser.email);
    } else {
      // Jika tidak ditemukan atau password salah
      setError('Email atau password salah, atau akun belum terdaftar!');
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
                className="w-full max-w-[240px] py-2.5 px-8 rounded-xl border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold text-base transition-all duration-200 shadow-sm"
              >
                Masuk
              </button>

              <p className="mt-4 text-xs text-gray-500 font-medium">
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={goToRegister}
                  className="text-brand-dark font-bold hover:underline"
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