import React, { useState } from 'react';

export default function LoginPage({ onLogin, goToRegister }) {
  const [email, setEmail] = useState('dimasmahardika@mhs.unjaya.ac.id');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-[#2d2828] flex items-center justify-center p-4 md:p-8">
      {/* Container Frame */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100">
        
        {/* Left Side: Campus Hallway Image */}
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

        {/* Right Side: Form Content */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-14 py-10 md:py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
            Selamat Datang di <span className="text-brand-dark">Unjaya Voice</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email anda"
                required
                className="w-full px-5 py-3.5 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password anda"
                required
                className="w-full px-5 py-3.5 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            <div className="pt-2 flex flex-col items-center">
              <button
                type="submit"
                className="w-full max-w-[240px] py-2.5 px-8 rounded-xl border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold text-base transition-all duration-200 shadow-sm hover:shadow"
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

          {/* Divider */}
          <div className="mt-6 mb-4 flex items-center justify-center">
            <span className="text-xs text-gray-400 font-semibold tracking-wider">- OR -</span>
          </div>

          {/* Google OAuth Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => onLogin('dimasmahardika@mhs.unjaya.ac.id')}
              className="flex items-center space-x-3 px-6 py-2 border border-gray-400 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Daftar dengan Google</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
