{/* app/admin/transaksi/page.tsx */}
import TransaksiTable from './TransaksiTable';

export default function TransaksiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>
      <TransaksiTable />
    </div>
  );
}
