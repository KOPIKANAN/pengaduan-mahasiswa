// src/pages/AdminReportList.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import AdminReportListSkeleton from '../components/AdminReportListSkeleton';

export default function AdminReportList({ reports, onSelectReport, isLoading }) {
  // Jika sedang memuat data, tampilkan skeleton
  if (isLoading) {
    return <AdminReportListSkeleton rows={6} />;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const ITEMS_PER_PAGE = 10;

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

  const resetFilter = () => {
    setSearchQuery('');
    setStatusFilter('Semua');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const currentReports = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusBadge = (report) => {
    const status = (report.adminStatus || report.status || '').toUpperCase();
    if (status.includes('SELESAI')) {
      return (
        <span className="inline-block px-2.5 sm:px-5 py-1 rounded-full text-[10px] sm:text-xs font-black bg-brand-green text-gray-900 shadow-sm whitespace-nowrap">
          SELESAI
        </span>
      );
    }
    if (status.includes('TOLAK') || status.includes('DITOLAK')) {
      return (
        <span className="inline-block px-2.5 sm:px-5 py-1 rounded-full text-[10px] sm:text-xs font-black bg-brand-red text-white shadow-sm whitespace-nowrap">
          DITOLAK
        </span>
      );
    }
    return (
      <span className="inline-block px-2.5 sm:px-5 py-1 rounded-full text-[10px] sm:text-xs font-black bg-brand-yellow text-gray-900 shadow-sm whitespace-nowrap">
        MENUNGGU
      </span>
    );
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-4 sm:p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Daftar Laporan
          </h1>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari ID tiket atau kategori..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 text-gray-800 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-brand-teal placeholder:text-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Semua', 'Diproses', 'Selesai', 'Ditolak'].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                statusFilter === s ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="border border-brand-teal rounded-2xl overflow-x-auto shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-full">
            <thead>
              <tr className="bg-brand-teal text-white text-[11px] sm:text-xs uppercase font-extrabold tracking-wider">
                <th className="py-3 sm:py-4 px-2 sm:px-6 text-center w-10 sm:w-16">No</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">ID TIKET</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">KATEGORI LAPORAN</th>
                <th className="py-3 sm:py-4 px-2 sm:px-6 text-center">STATUS</th>
                <th className="py-3 sm:py-4 px-2 sm:px-6 text-center w-20 sm:w-28">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-bold text-gray-900 bg-white">
              {currentReports.map((report, idx) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 sm:py-4 px-2 sm:px-6 text-center text-gray-700">{startIndex + idx + 1}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 font-extrabold text-gray-900 tracking-wide whitespace-nowrap">{report.ticketId}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 font-black uppercase text-gray-800">{report.category || report.title}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">{getStatusBadge(report)}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
                    <button
                      onClick={() => onSelectReport(report)}
                      className="font-black text-gray-900 hover:text-brand-dark tracking-wide uppercase text-xs hover:underline cursor-pointer whitespace-nowrap"
                    >
                      DETAIL
                    </button>
                  </td>
                </tr>
              ))}
              {currentReports.length === 0 && (
                <tr><td colSpan={5}><EmptyState onReset={resetFilter} /></td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] sm:text-xs text-gray-500 font-medium text-right">
          Menampilkan {currentReports.length > 0 ? startIndex + 1 : 0} - {startIndex + currentReports.length} dari {filteredReports.length} laporan
        </div>
      </div>
    </div>
  );
}