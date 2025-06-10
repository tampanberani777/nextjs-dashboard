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

    // Cek data statis dulu
    if (username === 'admin123' && password === '12345') {
      router.push('/admin')
      return
    } else if (username === 'user123' && password === '12345') {
      router.push('/')
      return
    }

    // Cek data dari localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    )

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } else {
      alert('Username atau password salah!')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gaming.jpg')" }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-60 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <input
              id="username"
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full p-2 pr-10 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-2.5 right-3 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Ingat saya
            </label>
            <Link href="/lupapassword" className="text-blue-400 hover:underline">
              Lupa password?
            </Link>
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
              type="text"
              placeholder="Masukkan captcha"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-400"
              value={inputCaptcha}
              onChange={(e) => setInputCaptcha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center space-y-2 text-sm">
          <p>
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-400 hover:underline">
              Daftar di sini
            </Link>
          </p>
          <p>
            <Link href="/" className="text-gray-300 hover:underline">
              Lanjutkan tanpa akun
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
