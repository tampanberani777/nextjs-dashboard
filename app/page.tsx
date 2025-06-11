import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/app/lib/fetchData";

function formatRupiah(num: number) {
  return "Rp " + num.toLocaleString("id-ID");
}

export default async function HomePage() {
  const products = await fetchProducts(4); // Ambil 4 produk unggulan

  return (
    <div className="min-h-screen px-4 py-10 sm:px-8">
      {/* Pengenalan Toko */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-white">
          Selamat Datang di Rangga Gaming Store!
        </h1>
        <p className="text-lg text-gray-300">
          Toko Gaming dengan harga terjangkau dan berkualitas
        </p>
      </section>

      {/* Banner Promosi */}
      <section className="mb-12">
        <div className="relative w-full h-60 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/toko/dalemtoko.jpg"
            alt="Banner Promo"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </section>

      {/* Produk Unggulan */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Produk Unggulan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id_produk}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col text-black"
            >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={product.foto ?? "/default.jpg"}
                  alt={product.nama_produk}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{product.nama_produk}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.deskripsi}</p>
              <span className="text-red-600 font-bold mt-auto">
                {formatRupiah(product.harga)}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/catalog"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Lihat Semua Produk →
          </Link>
        </div>
      </section>
    </div>
  );
}
