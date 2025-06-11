export default function Loading() {
  return (
    <div className="p-4">
      {/* Judul / Heading */}
      <div className="h-10 bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>

      {/* Search & Tombol */}
      <div className="flex gap-4 mb-4">
        <div className="h-10 bg-gray-600 rounded w-1/2 animate-pulse"></div>
        <div className="h-10 bg-blue-700 rounded w-40 animate-pulse"></div>
      </div>

      {/* Tabel Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-white/10 rounded shadow">
          <thead>
            <tr>
              {['ID Produk', 'Nama Produk', 'Harga', 'Gambar', 'Deskripsi', 'Aksi'].map((col, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(6).fill(0).map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-600 rounded w-16 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-600 rounded w-32 animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-600 rounded w-20 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 flex justify-center">
                  <div className="w-12 h-12 bg-gray-600 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-600 rounded w-40 animate-pulse"></div>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <div className="h-8 bg-yellow-400 rounded w-14 animate-pulse"></div>
                  <div className="h-8 bg-red-500 rounded w-16 animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
