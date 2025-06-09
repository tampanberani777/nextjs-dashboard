import { sql } from '../lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Fungsi format rupiah
function formatRupiah(num: number) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

const PRODUCTS_PER_PAGE = 8;

export default async function CatalogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  // Ambil total produk
  const total = await sql.produk.count();
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  if (currentPage > totalPages && totalPages !== 0) {
    notFound();
  }

  // Ambil produk untuk halaman saat ini
  const products = await sql.produk.findMany({
    orderBy: { harga: 'asc' },
    skip: offset,
    take: PRODUCTS_PER_PAGE,
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 sm:px-8 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Katalog Produk</h1>

      {/* Produk Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada produk tersedia.
          </div>
        )}

        {products.map((product) => (
          <Link
            key={product.id_produk}
            href={`/catalog/${product.id_produk}`}
            className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.foto ?? '/default.jpg'}
                alt={product.nama_produk}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold mb-1">{product.nama_produk}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.deskripsi}</p>
              <div className="mt-auto">
                <span className="text-red-600 font-bold text-lg">
                  {formatRupiah(product.harga)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-4">
        {currentPage > 1 && (
          <Link
            href={`/catalog?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Sebelumnya
          </Link>
        )}
        <span className="text-gray-700 font-medium">
          Halaman {currentPage} dari {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={`/catalog?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Selanjutnya →
          </Link>
        )}
      </div>
    </div>
  );
}
