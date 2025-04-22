import React from 'react'
import Link from 'next/link'

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Kiri: Form Register */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white">
        {children}
      </div>

      {/* Kanan: Welcome Panel */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#312c49] to-[#1e1f29] text-white items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-purple-300">Join the Darkness</h2>
          <p className="text-gray-300">Sudah punya akun?</p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-purple-700 text-white px-5 py-2 rounded font-semibold transition shadow"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
