const shimmer = 'animate-pulse bg-gray-200 rounded'

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full">
      <div className="flex gap-4 px-4 py-3 border-b border-gray-200">
        {[40, 120, 80, 70, 90, 80].map((w, i) => (
          <div key={i} className={`${shimmer} h-4`} style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-4 border-b border-gray-100">
          {[40, 120, 80, 70, 90, 80].map((w, j) => (
            <div key={j} className={`${shimmer} h-4`} style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className={`${shimmer} h-6 w-48`} />
      <div className={`${shimmer} h-4 w-full`} />
      <div className={`${shimmer} h-4 w-3/4`} />
      <div className={`${shimmer} h-4 w-1/2`} />
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className={`${shimmer} h-3 w-20 mb-3`} />
          <div className={`${shimmer} h-8 w-16`} />
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton