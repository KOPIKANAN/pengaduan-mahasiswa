import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, FileText } from 'lucide-react';
import EmptyState from '../components/EmptyState';

export default function UserReportHistory({ reports, onSelectReport }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Maksimal 4 laporan per slide/halaman sesuai permintaan
  const ITEMS_PER_PAGE = 4;

  // Filter pencarian
  const filteredReports = reports.filter((report) => {
  const q = searchQuery.toLowerCase();
  const matchSearch =
    (report.title || '').toLowerCase().includes(q) ||
    (report.category || '').toLowerCase().includes(q) ||
    (report.ticketId || '').toLowerCase().includes(q);
  const matchStatus =
    statusFilter === 'Semua' || (report.status || '').toLowerCase() === statusFilter.toLowerCase();
  return matchSearch && matchStatus;
});

  // Hitung jumlah slide/halaman
  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);

  // Ambil hanya 4 data laporan untuk slide saat ini
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const currentReports = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetFilter = () => {
    setSearchQuery('');
    setStatusFilter('Semua');
    setCurrentPage(1);
  };

  const getBadgeStyle = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'selesai':
        return 'border border-emerald-600 text-emerald-800 bg-white/80';
      case 'diproses':
        return 'border border-yellow-500 text-yellow-900 bg-yellow-100/90';
      case 'ditolak':
        return 'border border-red-500 text-red-700 bg-red-100/90';
      default:
        return 'border border-gray-400 text-gray-700 bg-white/80';
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 overflow-y-auto flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        
        {/* Teal Header Banner Sesuai Figma */}
        <div className="w-full bg-brand-teal text-white py-5 px-6 rounded-3xl text-center shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
            Riwayat Pelaporan
          </h1>
        </div>

        {/* Bar Pencarian Ringkas */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Cari berdasarkan judul / ID tiket..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset ke slide 1 saat mencari
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 text-gray-800 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-brand-teal placeholder:text-gray-400 border border-transparent"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex flex-wrap gap-2">
  {['Semua', 'Diproses', 'Selesai', 'Ditolak'].map((s) => (
    <button
      key={s}
      onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
      className={`px-4 py-1.5 rounded-pill text-xs font-bold border transition ${
        statusFilter === s ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-300'
      }`}
    >
      {s}
    </button>
  ))}
</div>

          <span className="text-xs text-gray-500 font-semibold">
            Total Laporan: <strong className="text-brand-dark">{filteredReports.length}</strong>
          </span>
        </div>

        {/* Grid Maksimal 4 Laporan per Slide (2x2) Sesuai Desain Figma */}
        {currentReports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {currentReports.map((report) => (
              <div
                key={report.id}
                className="bg-brand-light rounded-3xl p-5 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Status Badge */}
                <div className="mb-3">
                  <span className={`px-5 py-1 rounded-full text-xs font-bold tracking-wide ${getBadgeStyle(report.status)}`}>
                    Status : {report.status}
                  </span>
                </div>

                {/* Problem Photo */}
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-black/10 mb-4 shadow-inner">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-black text-gray-900 text-base sm:text-lg tracking-wider text-center mb-3 uppercase line-clamp-1">
                  {report.title}
                </h3>

                {/* Action Button: Lihat Detail */}
                <button
                  onClick={() => onSelectReport(report)}
                  className="bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-bold text-xs px-6 py-2 rounded-full shadow-sm transition-all duration-150"
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState onReset={resetFilter} />
        )}
        
      </div>

      {/* Navigasi Slide / Pagination di Bagian Bawah */}
      {totalPages > 1 && (
        <div className="max-w-5xl mx-auto w-full pt-8 pb-4 flex items-center justify-center space-x-3">
          {/* Tombol Slide Sebelumnya */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={validPage === 1}
            className="flex items-center space-x-1 px-4 py-2 rounded-2xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Nomor-Nomor Slide */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-2xl text-xs font-black transition-all ${
                    validPage === pageNum
                      ? 'bg-brand-dark text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Tombol Slide Selanjutnya */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={validPage === totalPages}
            className="flex items-center space-x-1 px-4 py-2 rounded-2xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}