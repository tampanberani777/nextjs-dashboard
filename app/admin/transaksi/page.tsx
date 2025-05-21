'use client'
import { useState } from "react"

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

export default function TransaksiPage() {
  const [search, setSearch] = useState("")

  const filtered = transactions.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.product_id.toLowerCase().includes(search.toLowerCase()) ||
    t.buyer.toLowerCase().includes(search.toLowerCase()) ||
    t.date.includes(search)
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>
      <input
        type="text"
        placeholder="Cari transaksi (ID, produk, pembeli, tanggal)..."
        className="mb-4 p-2 border border-gray-400 rounded w-full max-w-md text-gray-900"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            )}
            {filtered.map(t => (
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
      </div>
    </div>
  )
}
