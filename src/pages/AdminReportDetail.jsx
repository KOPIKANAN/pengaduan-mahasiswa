import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminReportDetail({ report, onBack, onUpdateStatus }) {
  if (!report) return null;

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header with Back Arrow and Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900 stroke-[2.5]" />
          </button>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Detail Laporan
          </h1>
        </div>

        {/* Main Card with rounded gray outline */}
        <div className="border border-gray-300 rounded-3xl p-6 sm:p-10 bg-white shadow-sm space-y-8">
          
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Metadata */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                  ID TIKET
                </p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-wide">
                  {report.ticketId}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                  KATEGORI
                </p>
                <p className="text-xl font-black uppercase text-gray-900">
                  {report.category || report.title}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                  TANGGAL KEJADIAN
                </p>
                <p className="text-base font-extrabold text-gray-900">
                  {report.formattedDate || report.date}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                  LOKASI
                </p>
                <p className="text-base font-extrabold uppercase text-gray-900">
                  {report.location}
                </p>
              </div>
            </div>

            {/* Right Column: Status & Attachment */}
            <div className="flex flex-col items-start md:items-end space-y-6">
              {/* Status Badge */}
              <div className="w-full md:w-auto flex justify-start md:justify-end">
                <span className="px-6 py-2 rounded-full text-xs font-black bg-brand-yellow text-gray-900 uppercase shadow-sm">
                  {report.adminStatus || report.status || 'MENUNGGU VERIFIKASI'}
                </span>
              </div>

              {/* Photo Attachment */}
              <div className="w-full sm:w-72">
                <p className="text-xs font-black uppercase text-gray-900 tracking-wider mb-2 text-left">
                  FOTO LAMPIRAN
                </p>
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-black/10 border border-gray-200 shadow-sm">
                  <img
                    src={report.image}
                    alt="Lampiran Pengaduan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Description Box */}
          <div>
            <p className="text-xs font-black uppercase text-gray-900 tracking-wider mb-2">
              DESKRIPSI MASALAH
            </p>
            <div className="bg-brand-teal text-white p-6 rounded-2xl shadow-sm text-sm sm:text-base font-medium leading-relaxed">
              {report.description}
            </div>
          </div>

          {/* Admin Action Bar (Interactive state updates) */}
          <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-gray-500">
              Update Status Tindak Lanjut:
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onUpdateStatus(report.id, 'Diproses', 'DIPROSES')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold text-xs transition-all"
              >
                <Clock className="w-4 h-4" />
                <span>Proses</span>
              </button>
              <button
                onClick={() => onUpdateStatus(report.id, 'Selesai', 'SELESAI')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Selesaikan</span>
              </button>
              <button
                onClick={() => onUpdateStatus(report.id, 'Ditolak', 'DITOLAK')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-100 text-red-800 hover:bg-red-200 font-bold text-xs transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>Tolak</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
