import Link from "next/link"
import { fetchProducts, fetchTransactions } from "@/app/lib/fetchData"

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID")
}

export default async function AdminDashboard() {
  const products = await fetchProducts(5)
  const transactions = await fetchTransactions(5)

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
            {products.map(p => (
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
            {transactions.map(t => (
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
