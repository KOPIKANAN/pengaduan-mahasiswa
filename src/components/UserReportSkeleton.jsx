// src/components/UserReportSkeleton.jsx
export default function UserReportSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 animate-pulse" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 rounded-3xl p-5 flex flex-col items-center justify-between shadow-sm border border-gray-200 space-y-4"
        >
          {/* Skeleton Badge Status */}
          <div className="w-28 h-6 bg-gray-300 rounded-full" />

          {/* Skeleton Gambar / Foto Laporan */}
          <div className="w-full h-44 bg-gray-300 rounded-2xl shadow-inner" />

          {/* Skeleton Judul Laporan */}
          <div className="w-3/4 h-5 bg-gray-300 rounded-md" />

          {/* Skeleton Tombol Lihat Detail */}
          <div className="w-28 h-8 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  );
}