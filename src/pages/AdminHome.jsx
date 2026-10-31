// src/pages/AdminHome.jsx
import React from 'react';
import UserHomeSkeleton from '../components/UserHomeSkeleton';
import ErrorState from '../components/ErrorState';

export default function AdminHome({ user, reports, isLoading, loadError, onRetry }) {
  // Langsung gunakan skeleton milik user yang sudah ada
  if (isLoading) {
    return <UserHomeSkeleton />;
  }
  if (loadError) {
    return <ErrorState message={loadError} onRetry={onRetry} />;
  }

  const isGuest = !user || user.name === 'Pengunjung';

  const countMasuk = isGuest ? 0 : reports.length;
  const countDiproses = isGuest ? 0 : reports.filter(r => (r.status || '').toLowerCase() === 'diproses').length;
  const countDitolak = isGuest ? 0 : reports.filter(r => (r.status || '').toLowerCase() === 'ditolak').length;
  const countSelesai = isGuest ? 0 : reports.filter(r => (r.status || '').toLowerCase() === 'selesai').length;

  const padZero = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex-1 min-h-screen bg-gray-100 flex flex-col overflow-y-auto">
      {/* Top Banner: University Building */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-800">
        <img
          src="/images/university.png"
          alt="University Campus"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Main Content Card overlapping the building */}
      <div className="relative -mt-16 sm:-mt-20 max-w-6xl w-full mx-auto px-4 sm:px-8 pb-12 flex-1">
        <div className="bg-white rounded-t-[40px] rounded-b-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
          
          {/* Hero Greeting Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 sm:py-6">
            {/* Illustration */}
            <div className="md:w-5/12 flex justify-center">
              <div className="relative w-80 h-72 sm:w-96 sm:h-80 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#e0f4f2] rounded-full filter blur-xl opacity-70 transform -translate-y-2"></div>
                <img
                  src="/images/hero_illustration.png"
                  alt="Admin Sarpras"
                  className="relative z-10 w-full h-full object-contain drop-shadow-md scale-110 sm:scale-125"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://illustrations.popertee.com/business-woman-with-megaphone.png';
                  }}
                />
              </div>
            </div>

            {/* Greeting */}
            <div className="md:w-7/12 text-center md:text-left space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-loose">
                Selamat Pagi<br />
                <span className="text-gray-900 block mt-2">{user?.name || 'Admin Sarpras Kampus'}</span>
              </h1>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Masuk
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countMasuk)}
              </span>
            </div>

            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Diproses
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countDiproses)}
              </span>
            </div>

            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Ditolak
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countDitolak)}
              </span>
            </div>

            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Selesai
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countSelesai)}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}