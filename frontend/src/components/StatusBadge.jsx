export function StatusBadge({ status }) {
  const styles = {
    'Compliant':      'bg-green-100 text-green-800',
    'Non-Compliant':  'bg-red-100 text-red-800',
    'In Progress':    'bg-yellow-100 text-yellow-800',
    'Not Applicable': 'bg-gray-100 text-gray-600',
  }

  const style = styles[status] || 'bg-gray-100 text-gray-600'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status || 'Unknown'}
    </span>
  )
}

export function ScoreBadge({ score }) {
  const getStyle = (s) => {
    if (s >= 80) return 'bg-green-100 text-green-800'
    if (s >= 50) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStyle(score)}`}>
      {score ?? 'N/A'}
    </span>
  )
}

export default StatusBadge