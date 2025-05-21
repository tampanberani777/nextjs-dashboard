import { fetchFilteredInvoices } from '@/app/lib/data';
import Image from 'next/image'
import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import AcmeLogo from '@/app/ui/logorangga'

interface Produk {
  id_produk: string
  nama_produk: string
  harga: number
  foto: string
  deskripsi: string
}

export default async function CatalogPage() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/profile/anggota', label: 'Profile' },
    { href: '/testimoni', label: 'Testimoni' },
  ];

  // Ambil data produk dari database Neon
  const products = await sql<Produk[]>`
    SELECT id_produk, nama_produk, harga, foto, deskripsi
    FROM produk
    ORDER BY harga ASC
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-500">
        <AcmeLogo />
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-red-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/login">
          <UserCircleIcon className="w-8 h-8 hover:text-red-500" />
        </Link>
      </header>

      <main className="p-4 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              Tidak ada produk tersedia.
            </div>
          )}
          {products.map((product: Produk) => (
            <div
              key={product.id_produk}
              className="bg-black bg-opacity-50 rounded-lg p-4 shadow-xl flex flex-col items-center"
            >
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={product.foto}
                  alt={product.nama_produk}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <p className="font-semibold text-center">{product.nama_produk}</p>
              <p className="text-sm opacity-75">Rp {product.harga.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </main>

      <Link href="/catalog">
        <button className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-500">
          Lanjut Katalog
        </button>
      </Link>

      <footer className="p-4 text-center border-t border-white border-opacity-20">
        <div className="mb-2">© 2025 RANGGA GAMING STORE.</div>
        <div className="flex justify-center gap-6 text-2xl text-gray-300">
          <a
            href="https://instagram.com/yourstore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 hover:scale-110 transition-all"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/yourstore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-110 transition-all"
          >
            <FaFacebook />
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 hover:scale-110 transition-all"
          >
            <FaWhatsapp />
          </a>
        </div>
      </footer>
    </div>
  );
}
