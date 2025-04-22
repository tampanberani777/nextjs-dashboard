'use client'

import { useState, useEffect } from 'react'
import { FaRedo } from 'react-icons/fa'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nomorTelp: '',
    password: '',
    confirmPassword: '',
    captchaInput: '',
  })
  const [captcha, setCaptcha] = useState('')

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.captchaInput !== captcha) {
      alert('Captcha salah!')
      generateCaptcha()
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak sama!')
      return
    }

    alert('Registrasi berhasil!')
  }

  return (
    <div className="w-full max-w-sm p-6 mx-auto mt-20 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="username" className="block mb-1 font-semibold">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Masukan username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Masukan email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="nomorTelp" className="block mb-1 font-semibold">Nomor Telepon</label>
          <input
            id="nomorTelp"
            name="nomorTelp"
            type="tel"
            placeholder="Masukan nomor telepon"
            value={formData.nomorTelp}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Masukan password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-semibold">Konfirmasi Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Ulangi password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Captcha:</label>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 px-4 py-2 font-bold rounded text-black">
              {captcha}
            </span>
            <button
              type="button"
              onClick={generateCaptcha}
              className="text-blue-600 hover:text-blue-800 transition"
              aria-label="refresh captcha"
            >
              <FaRedo />
            </button>
          </div>
          <input
            name="captchaInput"
            type="text"
            placeholder="Masukan captcha"
            value={formData.captchaInput}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  )
}
