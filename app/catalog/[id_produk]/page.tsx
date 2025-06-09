import { sql } from '@/app/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id_produk: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await sql.produk.findUnique({
    where: {
      id_produk: params.id_produk,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 sm:px-8 py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative w-full h-64">
            <Image
              src={product.foto ?? '/default.jpg'}
              alt={product.nama_produk}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.nama_produk}</h1>
            <p className="text-gray-700 mb-4">{product.deskripsi}</p>
            <div className="text-2xl text-red-600 font-bold mb-4">
              Rp {product.harga.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
