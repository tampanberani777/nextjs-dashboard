'use client'

import { useState, useEffect } from 'react'
import { FaRedo } from 'react-icons/fa'

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
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

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Password tidak sama!')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: any) => u.username === formData.username)

    if (userIndex === -1) {
      alert('Username tidak ditemukan!')
      return
    }

    users[userIndex].password = formData.newPassword
    localStorage.setItem('users', JSON.stringify(users))

    alert('Password berhasil direset!')
    window.location.href = '/login'
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
    >
      <div className="w-full max-w-md bg-black bg-opacity-60 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <input
              id="username"
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
            <label htmlFor="newPassword" className="block mb-1 font-medium">Password Baru</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Masukan password baru"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">Konfirmasi Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi password baru"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Captcha:</label>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-4 py-2 bg-gray-700 rounded font-bold tracking-widest">
                {captcha}
              </span>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-blue-300 hover:text-blue-500 transition"
                aria-label="refresh captcha"
              >
                <FaRedo />
              </button>
            </div>
            <input
              name="captchaInput"
              type="text"
              placeholder="Masukkan captcha"
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
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
