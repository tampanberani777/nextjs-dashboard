import { sql } from '../../lib/neondb';
import TransaksiTable from './TransaksiTable';

export default async function TransaksiPage() {
  const transaksi = await sql`
    SELECT id_transaksi, id_produk, nama_pembeli, tanggal_transaksi, total_harga
    FROM transaksi
    ORDER BY id_transaksi ASC
  `;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Transaksi</h1>
      <TransaksiTable transaksi={transaksi} />
    </div>
  );
}
