'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaRedo } from 'react-icons/fa'

export default function RegisterPage() {
  const [captcha, setCaptcha] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nomorTelp: '',
    password: '',
    confirmPassword: '',
    role: 'pelanggan',
    captchaInput: '',
  })

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Simpan data ke localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUser = {
      username: formData.username,
      email: formData.email,
      nomorTelp: formData.nomorTelp,
      password: formData.password,
      role: formData.role,
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registrasi berhasil!')
    window.location.href = '/login'
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gaming.jpg')" }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-60 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Masukan username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Masukan email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Nomor Telepon</label>
            <input
              name="nomorTelp"
              type="tel"
              placeholder="Masukan nomor telepon"
              value={formData.nomorTelp}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Masukan password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Konfirmasi Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
            >
              <option value="pelanggan">Pelanggan</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Captcha:</label>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-4 py-2 bg-gray-700 rounded font-bold tracking-widest">{captcha}</span>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-blue-300 hover:text-blue-500 transition"
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
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  )
}
