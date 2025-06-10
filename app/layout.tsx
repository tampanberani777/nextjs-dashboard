'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import AcmeLogo from '@/app/ui/logorangga';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/profile/anggota', label: 'Profile' },
    { href: '/testimoni', label: 'Testimoni' },
  ];

  const showNav = pathname === '/';

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {showNav ? (
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white">
            {/* ✅ SAMA PERSIS seperti katalog */}
            <header className="flex justify-between items-center p-4 border-b border-gray-500">
              <AcmeLogo />
              <nav className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hover:text-red-500 transition-colors ${
                      pathname === link.href ? 'text-red-500 font-semibold' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link href="/login">
                <UserCircleIcon className="w-8 h-8 hover:text-red-500" />
              </Link>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="text-center p-4 border-t border-gray-500">
              <div className="mb-2">© 2025 RANGGA GAMING STORE.</div>
              <div className="flex justify-center gap-6 text-2xl text-gray-300">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 hover:scale-110 transition-all">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener norefer-rer" className="hover:text-blue-500 hover:scale-110 transition-all">
                  <FaFacebook />
                </a>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 hover:scale-110 transition-all">
                  <FaWhatsapp />
                </a>
              </div>
            </footer>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
