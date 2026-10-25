// src/components/UserHomeSkeleton.jsx
export default function UserHomeSkeleton() {
  return (
    <div className="flex-1 min-h-screen bg-gray-100 flex flex-col overflow-y-auto animate-pulse" aria-busy="true">
      {/* Top Banner Skeleton */}
      <div className="relative h-64 sm:h-72 w-full bg-gray-300" />

      {/* Main Content Card Skeleton */}
      <div className="relative -mt-16 sm:-mt-20 max-w-6xl w-full mx-auto px-4 sm:px-8 pb-12 flex-1">
        <div className="bg-white rounded-t-[40px] rounded-b-3xl shadow-xl p-6 sm:p-10 border border-gray-100 space-y-8">
          
          {/* Hero Greeting Section Skeleton */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 sm:py-6">
            <div className="md:w-5/12 flex justify-center">
              <div className="w-80 h-72 sm:w-96 sm:h-80 bg-gray-200 rounded-full" />
            </div>
            <div className="md:w-7/12 text-center md:text-left space-y-5 w-full">
              <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto md:mx-0" />
              <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto md:mx-0" />
              <div className="h-12 bg-gray-200 rounded-2xl w-44 mx-auto md:mx-0 mt-4" />
            </div>
          </div>

          {/* Stat Cards Grid Skeleton (4 Kotak Statistik) */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center space-y-3 h-32">
                <div className="w-24 h-4 bg-gray-200 rounded" />
                <div className="w-16 h-8 bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}