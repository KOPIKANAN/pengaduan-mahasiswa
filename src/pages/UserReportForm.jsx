import React, { useState } from 'react';
import { Paperclip, ChevronDown, CheckCircle2, Calendar, X } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function UserReportForm({ onSubmitReport, onCancel }) {
  const [category, setCategory] = useState('');
  // Default tanggal ke hari ini (format YYYY-MM-DD)
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketCreated, setTicketCreated] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    setFileName('');
    setFilePreview(null);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    const cleanLocation = location.trim();
    const cleanDescription = description.trim();

    if (!category || !cleanLocation || !cleanDescription) return;

    setIsSubmitting(true);

    // Format tanggal ke format bahasa Indonesia (contoh: 24 September 2026)
    const formattedDateObj = new Date(date);
    const formattedDateStr = formattedDateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newTicketId = Math.floor(10000000000 + Math.random() * 90000000000).toString();

    setTimeout(() => {
      const newReport = {
        id: Date.now().toString(),
        ticketId: newTicketId,
        title: category.toUpperCase(),
        category: category,
        date: date,
        formattedDate: formattedDateStr,
        location: location,
        description: description,
        image: filePreview || '/images/ac.png',
        status: 'Diproses',
        adminStatus: 'MENUNGGU VERIFIKASI',
        timeline: [
          { step: 'Laporan Dibuat', time: 'Baru saja', done: true },
          { step: 'Diverifikasi Sarpras', time: 'Menunggu antrean', done: false }
        ]
      };

      onSubmitReport(newReport);
      setIsSubmitting(false);
      setTicketCreated(newTicketId);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Teal Header Banner Sesuai Figma */}
        <div className="w-full bg-brand-teal text-white py-5 px-6 rounded-3xl text-center shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            Isi Detail Laporan
          </h1>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-3xl p-8 text-center space-y-4 animate-fade-in shadow-sm">
            <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-600" />
            <h3 className="text-2xl font-black">Laporan Berhasil Terkirim!</h3>
            <p className="text-sm text-emerald-800">
              Tiket pengaduan Anda telah tercatat dengan nomor ID: <br />
              <span className="font-extrabold text-lg text-brand-dark bg-white px-4 py-1 rounded-full inline-block mt-2 border border-emerald-300">
                #{ticketCreated}
              </span>
            </p>
            <p className="text-xs text-gray-500">Anda dapat memantau status tindak lanjut pada menu Riwayat Pelaporan.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Kategori Laporan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori Laporan
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full appearance-none px-5 py-4 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium cursor-pointer"
                >
                  <option value="" disabled>Pilih kategori laporan</option>
                  {CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-600">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Tanggal Kejadian Menggunakan Fitur Date Picker Interaktif */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal Kejadian
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]} // Mencegah memilih tanggal di masa depan
                  required
                  className="w-full px-5 py-4 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium cursor-pointer"
                />
                <div className="absolute right-4 pointer-events-none text-gray-500">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lokasi
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Masukkan lokasi temuan (Contoh: Gedung A Lantai 2, Ruang Lab 3)"
                required
                className="w-full px-5 py-4 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Deskripsi
                </label>
                <span className="text-xs text-gray-400 font-medium">
                  {description.length}/500 karakter
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi temuan secara jelas dan rinci"
                required
                className="w-full px-5 py-4 bg-brand-inputBg text-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium placeholder:text-gray-400 resize-none"
              />
            </div>

            {/* Lampiran dengan Fitur Upload File Asli & Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lampiran
              </label>
              <label className="relative flex items-center justify-between w-full px-5 py-4 bg-brand-inputBg text-gray-500 rounded-2xl cursor-pointer hover:bg-gray-300/80 transition-all">
                <span className="text-sm font-medium truncate">
                  {fileName || 'Pilih foto temuan (PDF, PNG, JPG - Maks. 5MB)'}
                </span>
                <Paperclip className="w-5 h-5 text-gray-700 shrink-0 ml-2" />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Preview Gambar Lampiran yang Dipilih */}
              {filePreview && (
                <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img src={filePreview} alt="Preview" className="w-14 h-14 object-cover rounded-xl border border-gray-300" />
                    <span className="text-xs text-gray-700 font-semibold truncate">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-600 transition-colors"
                    title="Hapus foto"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button Sesuai Desain Figma */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-dark hover:bg-[#0b5953] active:scale-95 text-white font-bold text-base px-10 py-3.5 rounded-2xl shadow-md transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Mengirim laporan...' : 'Kirim laporan'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}