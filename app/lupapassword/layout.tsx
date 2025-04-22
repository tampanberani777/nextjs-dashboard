import React from 'react'
import Link from 'next/link'

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white text-black">
        {children}
      </div>

      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#1e1f29] to-[#312c49] text-white items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Reset Password</h2>
          <p>Masukkan username dan password baru kamu.</p>
          <Link
            href="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded font-semibold transition shadow"
          >
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  )
}
