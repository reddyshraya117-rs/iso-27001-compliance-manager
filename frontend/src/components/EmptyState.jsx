export default function EmptyState({
  title = "No records found",
  message = "Get started by creating your first record.",
  actionLabel = null,
  onAction = null,
  icon = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Illustration */}
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#1B4F8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">{message}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-[#1B4F8A] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}