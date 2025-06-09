export default function Loading() {
  return (
    <div className="animate-pulse p-4 space-y-4">
      {/* Judul */}
      <div className="h-10 bg-gray-700 rounded w-1/3 mb-6"></div>
      {/* Search & Tombol */}
      <div className="flex gap-4 mb-4">
        <div className="h-10 bg-gray-700 rounded w-1/2"></div>
        <div className="h-10 bg-blue-700 rounded w-40"></div>
      </div>
      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {['ID Transaksi', 'ID Produk', 'Nama Pembeli', 'Tanggal Transaksi', 'Total Harga', 'Aksi'].map((_, i) => (
                <th key={i} className="px-6 py-3 bg-gray-700 rounded text-left text-sm font-medium text-gray-500 uppercase">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(8).fill(0).map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                {/* ID Transaksi */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-20"></div>
                </td>
                {/* ID Produk */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-16"></div>
                </td>
                {/* Nama Pembeli */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                </td>
                {/* Tanggal Transaksi */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                </td>
                {/* Total Harga */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-28"></div>
                </td>
                {/* Aksi */}
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <div className="h-8 bg-yellow-400 rounded w-14"></div>
                  <div className="h-8 bg-red-500 rounded w-16"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
