import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Admin',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 flex flex-col justify-between min-h-screen">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin Dashboard</div>
          
          {/* Profile - clickable */}
          <Link href="/admin/profil" className="flex items-center gap-4 p-6 border-b border-gray-700 hover:bg-gray-800 transition">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Admin Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Rengga</p>
              <p className="text-sm text-gray-400">admin@email.com</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col p-6 space-y-4">
            <Link href="/admin" className="px-4 py-2 rounded hover:bg-gray-700 transition">Preview</Link>
            <Link href="/admin/produk" className="px-4 py-2 rounded hover:bg-gray-700 transition">Produk</Link>
            <Link href="/admin/transaksi" className="px-4 py-2 rounded hover:bg-gray-700 transition">Transaksi</Link>
          </nav>
        </div>
        <div className="p-6">
          <Link href="/" className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
            Kembali ke Halaman Utama
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
