import { fetchTransactions, Transaction } from '@/app/lib/fetchData';

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default async function TransaksiPage() {
  const transactions: Transaction[] = await fetchTransactions();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-gray-900">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID Transaksi</th>
              <th className="px-6 py-3">ID Produk</th>
              <th className="px-6 py-3">Nama Pembeli</th>
              <th className="px-6 py-3">Tanggal Transaksi</th>
              <th className="px-6 py-3">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            ) : (
              transactions.map(t => (
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
  );
}
