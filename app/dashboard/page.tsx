'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AuthService, User } from '@/lib/auth'
import { courseModules, courseMetadata } from '@/data/courseDataV3'

// Admin email whitelist - keep in sync with admin/page.tsx
const ADMIN_EMAILS = ['tim@servicephysics.com', 'maria@servicephysics.com', 'brian@servicephysics.com', 'steve@servicephysics.com', 'timothy.cashman@gmail.com']

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const initDashboard = async () => {
      const currentUser = AuthService.getUser()
      if (!currentUser) {
        router.push('/')
        return
      }

      await AuthService.syncFromSupabase()

      const syncedUser = AuthService.getUser()
      setUser(syncedUser)
      setProgress(AuthService.getCourseProgress())

      if (syncedUser?.email) {
        setIsAdmin(ADMIN_EMAILS.includes(syncedUser.email.toLowerCase()))
      }
    }

    initDashboard()
  }, [router])

  const handleLogout = async () => {
    await AuthService.logout()
    router.push('/')
  }

  if (!user) return null

  const totalActivities = courseModules.reduce((acc, module) => acc + module.activities.length, 0)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/images/sp-logo.png"
                alt="Service Physics"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl text-surface-800 font-display">
                  {courseMetadata.title}
                </h1>
                <p className="text-sm text-surface-500 font-sans">
                  Welcome back, <span className="font-semibold text-primary-600">{user.name}</span>
                  {isAdmin && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-700">
                      Admin
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-3 py-2 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-colors font-medium text-sm font-sans flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn-secondary font-sans"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        {/* Welcome Banner */}
        <Link
          href="/welcome"
          className="block mb-8 card p-5 hover:border-primary-300 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-display text-surface-800">Welcome to Problem Solving</h3>
                <p className="text-surface-500 text-sm font-sans">Learn course objectives and tips to succeed</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-surface-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Progress Card */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-display text-surface-800 mb-1">Your Progress</h2>
              <div className="flex items-center gap-4 text-sm text-surface-500 font-sans">
                <span>{courseModules.length} modules</span>
                <span className="w-px h-3.5 bg-surface-200" />
                <span>{totalActivities} activities</span>
                <span className="w-px h-3.5 bg-surface-200" />
                <span>7-8 hours</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-sans font-bold text-primary-600">
                {progress}%
              </div>
              <p className="text-xs text-surface-400 font-sans mt-0.5">Complete</p>
            </div>
          </div>
          <div className="w-full bg-surface-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-600 h-2 rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Course Complete Button */}
          {progress >= 80 && (
            <div className="mt-5">
              <Link
                href="/complete"
                className={`w-full flex items-center justify-center gap-3 px-5 py-3.5 ${
                  progress >= 100
                    ? 'bg-success-500 hover:bg-success-700'
                    : 'bg-accent-500 hover:bg-accent-600'
                } text-white font-semibold rounded-lg transition-colors font-sans text-sm`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .982-3.172M12 3.75a3 3 0 0 0-3 3v.75h6v-.75a3 3 0 0 0-3-3Z" />
                </svg>
                <span>{progress >= 100 ? 'Celebrate Your Completion & Schedule Session' : 'View Progress Summary & Schedule Session'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Course Modules */}
        <div className="space-y-4">
          {courseModules.map((module, moduleIndex) => (
            <div key={module.id} className="card overflow-hidden animate-slide-in" style={{ animationDelay: `${moduleIndex * 0.05}s` }}>
              <Link href={`/module/${module.id}`} className="block">
                <div className="p-5 flex items-start gap-4">
                  {/* Module number badge */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-sans font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: module.colorHex }}
                  >
                    {moduleIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-0.5 font-sans">
                      Module {moduleIndex + 1}
                    </p>
                    <h3 className="text-lg font-display text-surface-800 mb-1">{module.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-surface-500 font-sans">
                      <span>{module.timeEstimateMinutes} min</span>
                      <span className="text-surface-300">|</span>
                      <span>{module.activities.length} activities</span>
                    </div>
                  </div>
                  {module.accessLevel === 'free' ? (
                    <span className="badge badge-free font-sans flex-shrink-0">Free</span>
                  ) : (
                    <span className="badge badge-premium font-sans flex-shrink-0">Premium</span>
                  )}
                </div>
              </Link>

              <div className="px-5 pb-5">
                {(() => {
                  const completedCount = module.activities.filter(a => {
                    const p = AuthService.getProgress(a.id)
                    return p?.completed || false
                  }).length
                  const totalCount = module.activities.length
                  const moduleProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-sans">
                        <span className="text-surface-500">{completedCount} of {totalCount} completed</span>
                        <span className="font-semibold text-surface-600">{moduleProgress}%</span>
                      </div>
                      <div className="w-full bg-surface-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary-500 h-1.5 rounded-full transition-[width] duration-500"
                          style={{ width: `${moduleProgress}%` }}
                        />
                      </div>
                      <Link
                        href={`/module/${module.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors font-sans"
                      >
                        <span>{completedCount === 0 ? 'Start Module' : completedCount === totalCount ? 'Review Module' : 'Continue Module'}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  )
                })()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
