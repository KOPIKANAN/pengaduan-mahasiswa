import React from 'react';

export default function UserHome({ user, reports, goToForm }) {
  // Compute counts dynamically
  const countMasuk = reports.length;
  const countDiproses = reports.filter(r => r.status.toLowerCase() === 'diproses').length;
  const countDitolak = reports.filter(r => r.status.toLowerCase() === 'ditolak').length;
  const countSelesai = reports.filter(r => r.status.toLowerCase() === 'selesai').length;

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
              <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center">
                {/* Subtle soft backdrop circle */}
                <div className="absolute inset-0 bg-[#e0f4f2] rounded-full filter blur-xl opacity-70 transform -translate-y-2"></div>
                <img
                  src="/images/hero_illustration.png"
                  alt="Lapor Pengaduan"
                  className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://illustrations.popertee.com/business-woman-with-megaphone.png';
                  }}
                />
              </div>
            </div>

            {/* Greeting & Action */}
            <div className="md:w-7/12 text-center md:text-left space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Selamat Pagi<br />
                <span className="text-gray-900">{user?.name || 'Dimas Mahardika'}</span>
              </h1>

              <div>
                <button
                  onClick={goToForm}
                  className="bg-brand-dark hover:bg-[#0b5953] active:scale-95 text-white font-extrabold text-lg sm:text-xl px-10 py-3.5 rounded-2xl shadow-lg transition-all duration-200"
                >
                  Lapor sekarang!
                </button>
              </div>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Laporan Masuk */}
            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Masuk
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countMasuk || 2)}
              </span>
            </div>

            {/* Card 2: Laporan Diproses */}
            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Diproses
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countDiproses || 1)}
              </span>
            </div>

            {/* Card 3: Laporan Ditolak */}
            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Ditolak
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countDitolak || 0)}
              </span>
            </div>

            {/* Card 4: Laporan Selesai */}
            <div className="bg-brand-light rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base mb-2">
                Laporan Selesai
              </h3>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-wider">
                {padZero(countSelesai || 1)}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
