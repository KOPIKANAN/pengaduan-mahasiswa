import React, { useState, useRef } from 'react';
import { LogOut, Eye, EyeOff, Check, Camera } from 'lucide-react';

export default function UserProfile({ user, role, onUpdateUser, onSignOut }) {
  const [name, setName] = useState(user?.name || 'Dimas Mahardika');
  const [email, setEmail] = useState(user?.email || 'dimasmahardika@mhs.unjaya.ac.id');
  const [password, setPassword] = useState('password123');
  const [avatar, setAvatar] = useState(user?.avatar || '/images/avatar.png');
  const [showPassword, setShowPassword] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Fungsi untuk mengganti foto dari galeri/file komputer
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Mengubah foto avatar seketika dengan foto yang dipilih
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      avatar, // Menyimpan foto profil baru
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 min-h-screen bg-white flex flex-col p-6 sm:p-10 overflow-y-auto">
      {/* Top Bar with Sign Out Button */}
      <div className="flex justify-end pb-4">
        <button
          onClick={onSignOut}
          className="flex items-center space-x-2 bg-brand-red hover:bg-red-700 active:scale-95 text-white font-bold text-sm px-6 py-2.5 rounded-2xl shadow-sm transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-300 w-full mb-8" />

      {/* Profile Form Card */}
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        
        {/* Avatar Section dengan Fitur Ganti Foto dari Galeri/File */}
        <div className="relative mb-3 group">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow-md bg-gray-50">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces';
              }}
            />
          </div>

          {/* Tombol Kamera untuk Memilih Foto dari File Laptop */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Ganti Foto Profil dari Galeri/File"
            className="absolute bottom-0 right-0 w-9 h-9 bg-brand-dark hover:bg-brand-teal text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 border-2 border-white cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Input File Tersembunyi */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <p className="text-xs text-gray-500 mb-1 cursor-pointer hover:text-brand-dark font-medium" onClick={() => fileInputRef.current?.click()}>
          Klik ikon kamera untuk ganti foto dari file
        </p>

        {/* User Titles */}
        <h2 className="text-2xl font-black text-gray-900 tracking-tight text-center">
          {name}
        </h2>
        <p className="text-sm text-gray-600 font-semibold mb-6 capitalize text-center">
          {role === 'admin' ? 'Petugas Admin Kampus' : 'Mahasiswa'}
        </p>

        {/* Form Fields Sesuai Desain Figma */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border border-gray-400 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border border-gray-400 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 bg-white text-gray-800 rounded-xl border border-gray-400 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="flex items-center justify-center space-x-2 text-xs text-emerald-700 font-semibold bg-emerald-50 py-2.5 rounded-xl border border-emerald-200">
              <Check className="w-4 h-4" />
              <span>Perubahan profil dan foto berhasil disimpan!</span>
            </div>
          )}

          {/* Centered CTA Button Sesuai Desain Figma */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-brand-dark hover:bg-[#0b5953] active:scale-95 text-white font-extrabold text-base px-10 py-3.5 rounded-2xl shadow-md transition-all duration-200"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}