{/* app/admin/transaksi/layout.tsx */}
import React from 'react'

export const metadata = {
  title: 'Admin Dashboard',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
