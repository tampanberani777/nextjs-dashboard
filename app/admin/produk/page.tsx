import { sql } from '../../lib/neondb';
import ProdukTable from './ProdukTable';

function formatRupiah(num: number) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

export default async function ProdukPage() {
  const products = await sql`
    SELECT id_produk, nama_produk, harga, foto, deskripsi
    FROM produk
    ORDER BY id_produk ASC
  `;

  // Kirim data ke client component
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Katalog Produk</h1>
      <ProdukTable products={products} />
    </div>
  );
}
