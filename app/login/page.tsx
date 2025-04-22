'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash, FaRedo } from 'react-icons/fa'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [inputCaptcha, setInputCaptcha] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const generateCaptcha = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputCaptcha !== captcha) {
      alert('Captcha salah!')
      generateCaptcha()
      return
    }

    if (username === 'admin123' && password === '12345') {
      router.push('/admin')
    } else if (username === 'user123' && password === '12345') {
      router.push('/')
    } else {
      alert('Username atau password salah!')
    }
  }

  return (
    <div className="w-full max-w-sm p-6 mx-auto mt-20 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-semibold">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Masukan username"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukan password"
              className="w-full border border-gray-300 p-2 rounded pr-10 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute top-2 right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="ml-2 text-sm">Ingat saya</span>
          </label>
          <Link href="/lupapassword" className="text-sm text-blue-600 hover:underline">
            Lupa password?
          </Link>
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
    type="text"
    placeholder="Masukan captcha"
    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
    value={inputCaptcha}
    onChange={(e) => setInputCaptcha(e.target.value)}
    required
  />
</div>


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
