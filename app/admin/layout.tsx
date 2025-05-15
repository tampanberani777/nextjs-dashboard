import React from 'react'

export const metadata = {
  title: 'Admin Dashboard',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode aaa
}) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 min-h-screen">
      <nav className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Admin Dashboard</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
