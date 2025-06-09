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
  transactions.forEach(t => {
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

  const bestSellerProduct = products.find(p => p.id_produk === bestSellerId)
  const bestSeller = bestSellerProduct
    ? `${bestSellerProduct.nama_produk} (${bestSellerCount}x)`
    : "-"

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Preview</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Produk" value={totalProducts.toString()} />
        <StatCard title="Total Revenue" value={formatRupiah(totalRevenue)} />
        <StatCard title="Produk Terlaris" value={bestSeller} />
      </div>

      {/* Tabel Produk */}
      <Section title="Preview Produk" link="/admin/produk" linkLabel="Lihat semua produk">
        <Table
          headers={["ID Produk", "Nama Produk", "Harga", "Gambar", "Deskripsi"]}
          rows={products.map(p => [
            p.id_produk,
            p.nama_produk,
            formatRupiah(p.harga),
            <img
              key={p.id_produk}
              src={p.foto}
              alt={p.nama_produk}
              className="w-16 h-16 object-cover rounded"
            />,
            p.deskripsi
          ])}
        />
      </Section>

      {/* Tabel Transaksi */}
      <Section title="Preview Transaksi" link="/admin/transaksi" linkLabel="Lihat semua transaksi">
        <Table
          headers={["ID Transaksi", "ID Produk", "Nama Pembeli", "Tanggal Transaksi", "Total Harga"]}
          rows={transactions.map(t => [
            t.id,
            t.product_id,
            t.buyer,
            t.date,
            formatRupiah(t.total)
          ])}
        />
      </Section>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center text-gray-900">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

function Section({
  title,
  link,
  linkLabel,
  children
}: {
  title: string
  link: string
  linkLabel: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {children}
      </div>
      <Link href={link} className="inline-block mt-2 text-blue-500 hover:underline">
        {linkLabel}
      </Link>
    </div>
  )
}

function Table({
  headers,
  rows
}: {
  headers: string[]
  rows: (string | number | JSX.Element)[][]
}) {
  return (
    <table className="min-w-full text-left text-sm text-gray-800">
      <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-500">
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="px-6 py-3">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cols, i) => (
          <tr key={i} className="border-t hover:bg-gray-50 transition">
            {cols.map((col, j) => (
              <td key={j} className="px-6 py-4">{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
