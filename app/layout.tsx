'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import AcmeLogo from '@/app/ui/logorangga';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/profile/anggota', label: 'Profile' },
    { href: '/testimoni', label: 'Testimoni' },
  ];

  const showNav = pathname === '/';

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: tambahkan logika logout dari localStorage/session di sini
    alert('Berhasil logout!');
    window.location.href = '/login';
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {showNav ? (
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white">
            <header className="flex justify-between items-center p-4 border-b border-gray-500 relative">
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

              {/* Profile Icon & Dropdown */}
              <div className="relative" ref={profileRef}>
                <UserCircleIcon
                  className="w-8 h-8 hover:text-red-500 cursor-pointer"
                  onClick={() => setShowProfile(!showProfile)}
                />
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="https://i.pravatar.cc/50"
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-base">Akbar</div>
                        <div className="text-sm text-gray-500">akbar@gmail.com</div>
                        <div className="text-sm text-gray-500">08123456789</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="text-center p-4 border-t border-gray-500">
              <div className="mb-2">© 2025 RANGGA GAMING STORE.</div>
              <div className="flex justify-center gap-6 text-2xl text-gray-300">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 hover:scale-110 transition-all">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:scale-110 transition-all">
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
