import { fetchTransactions, Transaction } from '@/app/lib/fetchData';
import TransaksiTable from './TransaksiTable';

export default async function TransaksiPage() {
  const transactions: Transaction[] = await fetchTransactions();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>
      <TransaksiTable/>
    </div>
  );
}
