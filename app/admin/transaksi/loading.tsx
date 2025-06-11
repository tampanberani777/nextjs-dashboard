export default function Loading() {
  return (
    <div className="p-4">
      {/* Judul halaman */}
      <div className="h-10 w-1/3 bg-gray-700 rounded mb-6 animate-pulse"></div>

      {/* Input search & tombol tambah */}
      <div className="flex gap-4 mb-4">
        <div className="w-full max-w-sm h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-40 h-10 bg-blue-700 rounded animate-pulse"></div>
      </div>

      {/* Tabel transaksi */}
      <div className="overflow-x-auto bg-gray-800 rounded shadow">
        <table className="min-w-full divide-y divide-gray-700 text-sm text-gray-100">
          <thead className="bg-gray-700">
            <tr>
              {['ID', 'Produk', 'Pembeli', 'Tanggal', 'Total', 'Aksi'].map((col, i) => (
                <th key={i} className="px-4 py-2 text-center uppercase text-xs font-semibold text-gray-300">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-4 py-3 text-center">
                  <div className="h-4 bg-gray-600 rounded w-16 mx-auto animate-pulse"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-4 bg-gray-600 rounded w-20 mx-auto animate-pulse"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-4 bg-gray-600 rounded w-28 mx-auto animate-pulse"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-4 bg-gray-600 rounded w-24 mx-auto animate-pulse"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="h-4 bg-gray-600 rounded w-28 mx-auto animate-pulse"></div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <div className="h-8 w-14 bg-yellow-500 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-red-500 rounded animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-10 h-8 bg-gray-600 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
