import React from 'react';
import { Home, FileText, Clock, ChevronRight, X } from 'lucide-react';

export default function Sidebar({ currentTab, setTab, role, user, isOpenMobile, onCloseMobile }) {
  const isMahasiswa = role === 'mahasiswa';

  const handleMenuClick = (tab) => {
    setTab(tab);
    if (onCloseMobile) onCloseMobile(); // Otomatis tutup sidebar saat menu diklik di HP
  };

  return (
    <>
      {/* Backdrop Gelap untuk Layar HP saat Sidebar Terbuka */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Kontainer Sidebar (Fixed drawer di HP, Normal di Desktop) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 min-w-[240px] bg-brand-teal text-white flex flex-col justify-between py-6 px-4 shadow-2xl md:shadow-lg shrink-0 select-none transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Bagian Atas: Tombol Tutup di HP & Menu Navigasi */}
        <div className="space-y-4">
          {/* Header Mobile: Tombol Tutup X (Hanya tampil di HP) */}
          <div className="flex items-center justify-between pb-2 md:hidden border-b border-white/20">
            <span className="font-bold text-sm tracking-wide">Menu Navigasi</span>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {isMahasiswa ? (
              <>
                <button
                  onClick={() => handleMenuClick('home')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentTab === 'home'
                      ? 'bg-white text-brand-dark shadow-sm'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Home className={`w-5 h-5 ${currentTab === 'home' ? 'text-brand-dark' : 'text-white'}`} />
                    <span>Home</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${currentTab === 'home' ? 'text-brand-dark' : 'text-white/80'}`} />
                </button>

                <button
                  onClick={() => handleMenuClick('form')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentTab === 'form'
                      ? 'bg-white text-brand-dark shadow-sm'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FileText className={`w-5 h-5 ${currentTab === 'form' ? 'text-brand-dark' : 'text-white'}`} />
                    <span>Form Pelaporan</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${currentTab === 'form' ? 'text-brand-dark' : 'text-white/80'}`} />
                </button>

                <button
                  onClick={() => handleMenuClick('history')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentTab === 'history'
                      ? 'bg-white text-brand-dark shadow-sm'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Clock className={`w-5 h-5 ${currentTab === 'history' ? 'text-brand-dark' : 'text-white'}`} />
                    <span>Riwayat Pelaporan</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${currentTab === 'history' ? 'text-brand-dark' : 'text-white/80'}`} />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleMenuClick('admin-home')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === 'admin-home'
                    ? 'bg-white text-brand-dark shadow-sm'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Home className={`w-5 h-5 ${currentTab === 'admin-home' ? 'text-brand-dark' : 'text-white'}`} />
                  <span>Home</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${currentTab === 'admin-home' ? 'text-brand-dark' : 'text-white/80'}`} />
              </button>
            )}
          </div>
        </div>

        {/* Profil Pengguna di Pojok Bawah Kiri */}
        <div className="pt-4">
          <div className="border-t border-white/40 mb-4" />
          <button
            onClick={() => handleMenuClick('profile')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              currentTab === 'profile'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-white hover:bg-white/15'
            }`}
          >
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={user?.avatar || (role === 'admin' ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces' : '/images/avatar.png')}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border border-white/60 shrink-0 bg-white"
              />
              <div className="flex flex-col text-left min-w-0">
                <span className={`truncate text-xs font-bold leading-tight ${currentTab === 'profile' ? 'text-gray-900' : 'text-white'}`}>
                  Profil Pengguna
                </span>
                <span className={`text-[10px] font-medium leading-tight capitalize ${currentTab === 'profile' ? 'text-gray-500' : 'text-white/70'}`}>
                  {role === 'admin' ? 'Admin Sarpras' : 'Mahasiswa'}
                </span>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${currentTab === 'profile' ? 'text-gray-700' : 'text-white/80'}`} />
          </button>
        </div>
      </aside>
    </>
  );
}