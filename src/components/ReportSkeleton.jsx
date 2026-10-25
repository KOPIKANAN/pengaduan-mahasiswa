// ReportSkeleton.jsx
export default function ReportSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4 bg-white rounded-card p-4 border border-gray-100">
          <div className="w-24 h-24 bg-gray-200 rounded-2xl" />
          <div className="flex-1 space-y-3 py-2">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}