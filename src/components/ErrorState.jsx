// ErrorState.jsx
export default function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-12 space-y-3">
      <p className="text-lg font-bold text-gray-800">{message}</p>
      <button onClick={onRetry} className="px-5 py-2 rounded-pill bg-brand-dark text-white text-sm font-bold">
        Coba lagi ↻
      </button>
    </div>
  );
}