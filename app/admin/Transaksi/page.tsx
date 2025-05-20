import { fetchTransactions } from "@/app/lib/fetchData";

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

export default async function TransactionsPage() {
  const transactions = await fetchTransactions();

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Riwayat Transaksi</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... tabel transaksi sama seperti sebelumnya */}
        </table>
      </div>
    </div>
  );
}
