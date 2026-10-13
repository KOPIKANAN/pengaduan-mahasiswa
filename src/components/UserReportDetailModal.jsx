import React from 'react';
import { X, ArrowLeft } from 'lucide-react';

export default function UserReportDetailModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 animate-scale-in my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-800" />
            </button>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Detail Laporan #{report.ticketId}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Kategori</p>
                <p className="text-lg font-black text-gray-900">{report.category || report.title}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Tanggal Kejadian</p>
                <p className="text-sm font-bold text-gray-800">{report.formattedDate || report.date}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Lokasi</p>
                <p className="text-sm font-bold text-gray-800">{report.location}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Status Pengaduan</p>
                <span className="inline-block mt-1 px-4 py-1 rounded-full text-xs font-black bg-brand-light text-gray-900">
                  {report.status}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Foto Bukti Lampiran</p>
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-900 uppercase mb-2">Deskripsi Masalah</p>
            <div className="bg-brand-teal text-white p-5 rounded-2xl text-sm font-medium leading-relaxed">
              {report.description}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
