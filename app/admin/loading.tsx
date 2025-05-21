export default function Loading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 animate-pulse bg-gray-700 rounded w-48 h-10"></h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded shadow text-center">
            <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Skeleton tabel produk */}
      <h3 className="text-2xl font-semibold mb-4 animate-pulse bg-gray-700 rounded w-48 h-8"></h3>
      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-200">
                {[...Array(5)].map((__, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-full max-w-[100px]"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skeleton tabel transaksi */}
      <h3 className="text-2xl font-semibold mb-4 animate-pulse bg-gray-700 rounded w-56 h-8"></h3>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              {[...Array(5)].map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-200">
                {[...Array(5)].map((__, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-full max-w-[100px]"></div>
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
