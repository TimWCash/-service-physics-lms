'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AuthService } from '@/lib/auth'

export default function Home() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = AuthService.getUser()
    if (user) {
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      await AuthService.login(email, name)
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Hero Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/images/sp-logo-white.png"
              alt="Service Physics"
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold">
              🎓 Professional Development
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Service Physics
            <span className="block text-primary-200">Problem Solving 101</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
            Master the art of problem-solving with proven frameworks, practical tools, and real-world applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">7</div>
              <div className="text-primary-100">Comprehensive Modules</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">31</div>
              <div className="text-primary-100">Learning Activities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold mb-2">7-8</div>
              <div className="text-primary-100">Hours of Content</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="badge bg-white/20 text-white border-white/30">✓ Improvement Kata</div>
            <div className="badge bg-white/20 text-white border-white/30">✓ PDCA Cycles</div>
            <div className="badge bg-white/20 text-white border-white/30">✓ Lean Principles</div>
            <div className="badge bg-white/20 text-white border-white/30">✓ Visual Management</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="card p-10 shadow-soft-lg">
            <div className="text-center mb-8">
              <Image
                src="/images/sp-logo.png"
                alt="Service Physics"
                width={64}
                height={64}
                className="mx-auto mb-4 rounded-2xl shadow-lg"
              />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Start your learning journey today</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600">
                  Demo mode - No password required. Just enter your name and email to explore the course content.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by professionals worldwide</p>
            <div className="flex justify-center items-center gap-6 text-gray-400">
              <div className="text-xs">🏆 Award Winning</div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="text-xs">⭐ Highly Rated</div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="text-xs">✓ Certified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
