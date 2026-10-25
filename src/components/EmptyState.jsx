// EmptyState.jsx
export default function EmptyState({ onReset }) {
  return (
    <div className="text-center py-12 space-y-3">
      <p className="text-lg font-bold text-gray-800">Yah, laporan tidak ditemukan 🔍</p>
      <p className="text-sm text-gray-500">Coba kata kunci lain atau hapus filter.</p>
      <button onClick={onReset} className="px-5 py-2 rounded-pill bg-brand-dark text-white text-sm font-bold">
        Reset pencarian
      </button>
    </div>
  );
}