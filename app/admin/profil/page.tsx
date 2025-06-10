'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function AdminProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    // Di sini bisa tambahkan logika logout yang sesungguhnya (misalnya clear session)
    router.push('/login')
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Profil Admin</h1>

      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold">Rengga</p>
          <p className="text-gray-600">adminrengga@gmail.com</p>
          <p className="text-gray-600 mt-1">Role: Super Admin</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Informasi Tambahan</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>No. Telepon: 0812-3456-7890</li>
            <li>Alamat: Jl. Contoh No. 123, Jakarta</li>
            <li>Bergabung sejak: Januari 2024</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
