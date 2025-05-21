'use client'
import { useState, useEffect } from "react"
import { fetchTransactions, Transaction } from "@/app/lib/fetchData"

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID")
}

export default function TransaksiPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTransactions(50) // Ambil 50 transaksi terbaru
      .then(data => {
        setTransactions(data)
        setLoading(false)
      })
      .catch(err => {
        setError("Gagal memuat data transaksi")
        setLoading(false)
      })
  }, [])

  const filtered = transactions.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.product_id.toLowerCase().includes(search.toLowerCase()) ||
    t.buyer.toLowerCase().includes(search.toLowerCase()) ||
    t.date.includes(search)
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
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
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map(t => (
                <tr key={t.id}>
                  <td className="px-6 py-4">{t.id}</td>
                  <td className="px-6 py-4">{t.product_id}</td>
                  <td className="px-6 py-4">{t.buyer}</td>
                  <td className="px-6 py-4">{t.date}</td>
                  <td className="px-6 py-4">{formatRupiah(t.total)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
