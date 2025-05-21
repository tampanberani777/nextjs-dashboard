export default function Loading() {
  return (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {Array(5).fill(0).map((_, i) => (
                <th key={i} className="px-6 py-3 bg-gray-700 rounded text-left text-sm font-medium text-gray-500 uppercase">
                  <div className="h-4 bg-gray-600 rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                {Array(5).fill(0).map((_, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-600 rounded w-full max-w-[100px]"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
