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
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-primary-700 to-primary-800 text-white">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/images/sp-logo-white.png"
              alt="Service Physics"
              width={72}
              height={72}
              className="drop-shadow-lg"
            />
            <span className="text-sm font-semibold tracking-wider uppercase text-primary-300">
              Professional Development
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Service Physics
            <span className="block text-primary-300">Problem Solving 101</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-200 mb-10 leading-relaxed font-sans">
            Master the art of problem-solving with proven frameworks, practical tools, and real-world applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-sans font-bold mb-1">7</div>
              <div className="text-primary-300 text-sm font-sans">Comprehensive Modules</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-sans font-bold mb-1">31</div>
              <div className="text-primary-300 text-sm font-sans">Learning Activities</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-3xl font-sans font-bold mb-1">7-8</div>
              <div className="text-primary-300 text-sm font-sans">Hours of Content</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 font-sans">
            <span className="text-sm text-primary-200 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">Improvement Kata</span>
            <span className="text-sm text-primary-200 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">PDCA Cycles</span>
            <span className="text-sm text-primary-200 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">Lean Principles</span>
            <span className="text-sm text-primary-200 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">Visual Management</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-surface-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="card p-10">
            <div className="text-center mb-8">
              <Image
                src="/images/sp-logo.png"
                alt="Service Physics"
                width={56}
                height={56}
                className="mx-auto mb-4 rounded-xl"
              />
              <h2 className="text-2xl text-surface-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-surface-500 font-sans text-sm">Start your learning journey today</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-surface-700 mb-2 font-sans">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none text-surface-800 font-sans"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-surface-700 mb-2 font-sans">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none text-surface-800 font-sans"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Learning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-surface-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-surface-500 font-sans">
                  Enter your name and email to access the course content.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-surface-400 font-sans">
            Used by operations teams at leading organizations
          </p>
        </div>
      </div>
    </div>
  )
}
