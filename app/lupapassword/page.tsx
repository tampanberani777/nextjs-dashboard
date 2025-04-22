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

    alert('Password berhasil direset!')
  }

  return (
    <div className="w-full max-w-sm p-6 mx-auto mt-20 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

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
          <label htmlFor="newPassword" className="block mb-1 font-semibold">Password Baru</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Masukan password baru"
            value={formData.newPassword}
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
            placeholder="Konfirmasi password baru"
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
            placeholder="Masukkan captcha"
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
          Reset Password
        </button>
      </form>
    </div>
  )
}
