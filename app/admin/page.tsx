'use client'
import Link from "next/link"

const products = [
  { id_produk: "P1", nama_produk: "Headset Gaming 1x", harga: 400000, foto: "/products/headset 1.jpg", deskripsi: "Headset gaming berkualitas..." },
  { id_produk: "P10", nama_produk: "Controller PS4", harga: 480000, foto: "/products/controller 2.jpg", deskripsi: "Controller PS4 ergonomis..." },
  { id_produk: "P11", nama_produk: "Keyboard Blue Switch", harga: 300000, foto: "/products/keyboard1.jpg", deskripsi: "Keyboard tactile dan clicky..." },
  { id_produk: "P12", nama_produk: "Keyboard Red Switch", harga: 224000, foto: "/products/keyboard 2.jpg", deskripsi: "Keyboard linear dan smooth..." },
  { id_produk: "P13", nama_produk: "Mouse Wireless Lgi", harga: 110000, foto: "/products/mouse 1.jpg", deskripsi: "Mouse wireless presisi..." },
  { id_produk: "P14", nama_produk: "Mouse", harga: 100000, foto: "/products/mouse 2.jpg", deskripsi: "Mouse basic untuk kebutuhan umum." },
  { id_produk: "P15", nama_produk: "Mouse Wireless", harga: 300000, foto: "/products/mouse 3.jpg", deskripsi: "Mouse wireless hemat baterai." },
  { id_produk: "P2", nama_produk: "Headset Gaming 2y", harga: 500000, foto: "/products/headset 2.jpg", deskripsi: "Headset dengan suara jernih." },
  { id_produk: "P3", nama_produk: "Headset Wireless 2r", harga: 1100000, foto: "/products/headset 3.jpg", deskripsi: "Headset wireless dengan bass mantap." },
  { id_produk: "P4", nama_produk: "Xbox xr", harga: 7000000, foto: "/products/xbox x.jpg", deskripsi: "Konsol next-gen dengan grafis tinggi." },
  { id_produk: "P5", nama_produk: "Sony Playstation 5", harga: 8500000, foto: "/products/ps5.jpg", deskripsi: "Konsol PS5 dengan performa tinggi." },
  { id_produk: "P6", nama_produk: "Xbox Series S 512GB", harga: 5700000, foto: "/products/xbox s.jpg", deskripsi: "Xbox ringkas untuk gaming modern." },
  { id_produk: "P7", nama_produk: "Virtual Reality", harga: 5000000, foto: "/products/vr.jpg", deskripsi: "Headset VR immersive dengan tracking akurat." },
  { id_produk: "P8", nama_produk: "Nitendo Switch", harga: 4000000, foto: "/products/nitendo.jpg", deskripsi: "Konsol portable dari Nintendo." },
  { id_produk: "P9", nama_produk: "Controller PS5", harga: 550000, foto: "/products/controller 1.jpg", deskripsi: "Controller original PS5." },
]

const transactions = [
  { id: "T001", product_id: "P1", buyer: "John tol", date: "2025-05-20", total: 400000 },
  { id: "T002", product_id: "P3", buyer: "Jane Smith", date: "2025-05-21", total: 1100000 },
  { id: "T003", product_id: "P1", buyer: "Alice", date: "2025-05-22", total: 400000 },
  { id: "T004", product_id: "P2", buyer: "Bob", date: "2025-05-23", total: 500000 },
  { id: "T005", product_id: "P1", buyer: "Charlie", date: "2025-05-24", total: 400000 },
]

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID")
}

export default function AdminDashboard() {
  const totalProducts = products.length
  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0)
  const productCount: Record<string, number> = {}
  transactions.forEach((t) => {
    productCount[t.product_id] = (productCount[t.product_id] || 0) + 1
  })
  let bestSellerId = ""
  let bestSellerCount = 0
  for (const [pid, count] of Object.entries(productCount)) {
    if (count > bestSellerCount) {
      bestSellerId = pid
      bestSellerCount = count
    }
  }
  const bestSellerProduct = products.find((p) => p.id_produk === bestSellerId)
  const bestSeller = bestSellerProduct
    ? `${bestSellerProduct.nama_produk} (${bestSellerCount}x)`
    : "-"

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Preview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow text-center text-gray-900">
          <h3 className="text-xl font-medium mb-2">Total Produk</h3>
          <p className="text-4xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center text-gray-900">
          <h3 className="text-xl font-medium mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold">{formatRupiah(totalRevenue)}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center text-gray-900">
          <h3 className="text-xl font-medium mb-2">Produk Terlaris</h3>
          <p className="text-4xl font-bold">{bestSeller}</p>
        </div>
      </div>

      {/* Preview Produk */}
      <h3 className="text-2xl font-semibold mb-4">Preview Produk</h3>
      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(p => (
              <tr key={p.id_produk}>
                <td className="px-6 py-4">{p.id_produk}</td>
                <td className="px-6 py-4">{p.nama_produk}</td>
                <td className="px-6 py-4">{formatRupiah(p.harga)}</td>
                <td className="px-6 py-4">
                  <img src={p.foto} alt={p.nama_produk} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{p.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/admin/produk" className="inline-block mt-2 text-blue-400 hover:underline">Lihat semua produk</Link>
      </div>

      {/* Preview Transaksi */}
      <h3 className="text-2xl font-semibold mb-4">Preview Transaksi</h3>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Transaksi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Pembeli</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Transaksi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 5).map(t => (
              <tr key={t.id}>
                <td className="px-6 py-4">{t.id}</td>
                <td className="px-6 py-4">{t.product_id}</td>
                <td className="px-6 py-4">{t.buyer}</td>
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4">{formatRupiah(t.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/admin/transaksi" className="inline-block mt-2 text-blue-400 hover:underline">Lihat semua transaksi</Link>
      </div>
    </div>
  )
}
