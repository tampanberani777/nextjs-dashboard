import { fetchProducts, fetchTransactions } from "../lib/fetchData";
import Link from "next/link";

// Tipe data sesuai tabel Neon
interface Product {
  id_produk: string;
  nama_produk: string;
  harga: number;
}

interface Transaction {
  id: string;
  product_id: string;
  buyer: string;
  date: string;
  total: number;
}

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default async function AdminDashboard() {
  // Ambil data dari Neon
  const products: Product[] = await fetchProducts();
  const transactions: Transaction[] = await fetchTransactions();

  // Analitik
  const totalProducts = products.length;
  const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.total), 0);

  // Hitung produk terlaris
  const productCount: Record<string, number> = {};
  transactions.forEach((t) => {
    productCount[t.product_id] = (productCount[t.product_id] || 0) + 1;
  });
  let bestSellerId = "";
  let bestSellerCount = 0;
  for (const [pid, count] of Object.entries(productCount)) {
    if (count > bestSellerCount) {
      bestSellerId = pid;
      bestSellerCount = count;
    }
  }
  const bestSeller = products.find((p) => p.id_produk === bestSellerId)?.nama_produk
    ? `${products.find((p) => p.id_produk === bestSellerId)?.nama_produk} ${bestSellerCount}x`
    : "-";

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 min-h-screen p-6 text-gray-100">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav className="flex flex-col space-y-4">
          <span className="text-left px-4 py-2 rounded bg-gray-600 font-semibold">Katalog Produk</span>
          <span className="text-left px-4 py-2 rounded hover:bg-gray-700">Riwayat Transaksi</span>
          <span className="text-left px-4 py-2 rounded hover:bg-gray-700">Invoices</span>
          <span className="text-left px-4 py-2 rounded hover:bg-gray-700">Customer</span>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {/* Tombol kembali ke halaman utama */}
        <div className="mb-6">
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>

        {/* Analitik */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Analitik</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-medium mb-2">Total Produk</h3>
              <p className="text-4xl font-bold">{totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-medium mb-2">Total Revenue</h3>
              <p className="text-4xl font-bold">{formatRupiah(totalRevenue)}</p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-medium mb-2">Produk Terlaris</h3>
              <p className="text-4xl font-bold">{bestSeller}</p>
            </div>
          </div>

          {/* Tabel Produk */}
          <h3 className="text-2xl font-semibold mb-4">Ringkasan Katalog Produk</h3>
          <div className="overflow-x-auto bg-white rounded shadow mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p.id_produk}>
                    <td className="px-6 py-4 whitespace-nowrap">{p.id_produk}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{p.nama_produk}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatRupiah(Number(p.harga))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabel Transaksi */}
          <h3 className="text-2xl font-semibold mb-4">Ringkasan Riwayat Transaksi</h3>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Transaksi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Pembeli</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Transaksi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Harga</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{t.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.product_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.buyer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatRupiah(Number(t.total))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
    
  );
}
