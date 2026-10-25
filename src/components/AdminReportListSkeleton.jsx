// src/components/AdminReportListSkeleton.jsx
import React from 'react';

export default function AdminReportListSkeleton({ rows = 5 }) {
  return (
    <div className="flex-1 min-h-screen bg-white p-4 sm:p-6 md:p-10 flex flex-col justify-between animate-pulse" aria-busy="true">
      <div className="max-w-5xl mx-auto w-full space-y-5">
        
        {/* Title & Search Bar Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div className="w-48 h-8 bg-gray-200 rounded-xl" />
          <div className="w-full sm:w-72 h-9 bg-gray-100 rounded-xl" />
        </div>

        {/* Filter Buttons Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-7 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Tabel Skeleton */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-full">
            {/* Header Tabel Skeleton */}
            <thead>
              <tr className="bg-gray-200">
                <th className="py-4 px-4 text-center w-12"><div className="w-6 h-4 bg-gray-300 rounded mx-auto" /></th>
                <th className="py-4 px-6"><div className="w-20 h-4 bg-gray-300 rounded" /></th>
                <th className="py-4 px-6"><div className="w-36 h-4 bg-gray-300 rounded" /></th>
                <th className="py-4 px-6 text-center"><div className="w-16 h-4 bg-gray-300 rounded mx-auto" /></th>
                <th className="py-4 px-6 text-center w-24"><div className="w-12 h-4 bg-gray-300 rounded mx-auto" /></th>
              </tr>
            </thead>

            {/* Baris Tabel Skeleton */}
            <tbody className="divide-y divide-gray-100 bg-white">
              {Array.from({ length: rows }).map((_, idx) => (
                <tr key={idx}>
                  {/* No */}
                  <td className="py-4 px-4 text-center">
                    <div className="w-4 h-4 bg-gray-200 rounded mx-auto" />
                  </td>
                  {/* ID Tiket */}
                  <td className="py-4 px-6">
                    <div className="w-28 h-4 bg-gray-200 rounded" />
                  </td>
                  {/* Kategori Laporan */}
                  <td className="py-4 px-6">
                    <div className="w-44 h-4 bg-gray-200 rounded" />
                  </td>
                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    <div className="w-24 h-6 bg-gray-200 rounded-full mx-auto" />
                  </td>
                  {/* Aksi */}
                  <td className="py-4 px-6 text-center">
                    <div className="w-12 h-4 bg-gray-200 rounded mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ringkasan Jumlah Baris Skeleton */}
        <div className="flex justify-end pt-1">
          <div className="w-44 h-3 bg-gray-200 rounded" />
        </div>

      </div>
    </div>
  );
}