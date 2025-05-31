import { sql } from '../../lib/neondb';
import TransaksiTable from './TransaksiTable';

export default async function TransaksiPage() {
  const transaksi = await sql`
    SELECT id as id_transaksi, product_id as id_produk, buyer as nama_pembeli, date as tanggal_transaksi, total as total_harga
    FROM transactions
    ORDER BY id ASC
  `;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Transaksi</h1>
      <TransaksiTable transaksi={transaksi} />
    </div>
  );
}
