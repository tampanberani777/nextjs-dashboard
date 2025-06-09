

export default function Loading() {
  return (
    <div className="p-4">
      {/* Judul */}
      <div className="h-10 bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
      {/* Search & Tombol */}
      <div className="flex gap-4 mb-4">
        <div className="h-10 bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="h-10 bg-blue-700 rounded w-40 animate-pulse"></div>
      </div>
      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-white/10 rounded shadow">
          <thead>
            <tr>
              {['ID Produk', 'Nama Produk', 'Harga', 'Gambar', 'Deskripsi', 'Aksi'].map((_, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase"
                >
                  {/* Nama kolom tetap tampil */}
                  <div>{_}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(6).fill(0).map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                {/* ID Produk */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-16 animate-pulse"></div>
                </td>
                {/* Nama Produk */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-32 animate-pulse"></div>
                </td>
                {/* Harga */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-24 animate-pulse"></div>
                </td>
                {/* Gambar */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-600 rounded animate-pulse"></div>
                </td>
                {/* Deskripsi */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-600 rounded w-40 animate-pulse"></div>
                </td>
                {/* Aksi */}
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
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
