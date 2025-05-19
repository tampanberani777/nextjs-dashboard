import { sql } from '@/app/lib/data'
import Image from 'next/image'

interface Produk {
  id_produk: string
  nama_produk: string
  harga: number
  foto: string
  deskripsi: string
}


export default async function CatalogPage() {
 const products = await sql<Produk[]>`
  SELECT id_produk, nama_produk, harga, foto, deskripsi
  FROM produk
  ORDER BY harga ASC
`


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Katalog Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada produk tersedia.
          </div>
        )}
        {products.map((product) => (
          <div
            key={product.id_produk}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={product.foto}
              alt={product.nama_produk}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-2">{product.nama_produk}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.deskripsi}</p>
              <div className="mt-auto">
                <span className="block text-blue-600 font-bold text-lg mb-2">
                  Rp {product.harga.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
