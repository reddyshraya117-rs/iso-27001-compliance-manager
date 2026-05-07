export function SkeletonCard() {
  return (
    <div className="animate-pulse border border-gray-200 rounded-xl p-4 bg-white">
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="animate-pulse flex gap-4 px-4 py-3 border-t border-gray-100">
      <div className="h-4 bg-gray-200 rounded w-8"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="animate-pulse p-6 max-w-3xl mx-auto">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="flex items-end gap-3 h-48">
        {[60, 80, 45, 90, 55, 70].map((h, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-t flex-1"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}