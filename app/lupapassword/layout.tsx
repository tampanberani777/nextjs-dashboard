import React from 'react'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Backround gaming.jpg')" }}
    >
      <div className="w-full max-w-md p-8 bg-black bg-opacity-60 rounded-lg text-white shadow-lg">
        {children}
      </div>
    </div>
  )
}
