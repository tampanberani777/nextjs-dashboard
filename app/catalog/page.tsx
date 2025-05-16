import pool from '@/lib/db';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Supaya SSR, bukan cache

export default async function ProdukPage() {
  const res = await pool.query(`
    SELECT id_produk AS id, nama_produk AS name, harga AS price, foto AS image, deskripsi AS description
    FROM produk
  `);
  const products = res.rows;

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white">
      <h1 className="text-2xl font-bold mb-4">Katalog Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="bg-black bg-opacity-50 rounded-xl shadow-xl p-6 flex flex-col items-center"
          >
            <div className="w-full h-40 flex items-center justify-center mb-2">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain max-h-full rounded"
              />
            </div>

            <h2 className="text-lg font-bold text-center">{product.name}</h2>
            <p className="text-gray-300 mb-2">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
