'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthService, User } from '@/lib/auth'
import { courseData, courseMetadata } from '@/data/courseData'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const currentUser = AuthService.getUser()
    if (!currentUser) {
      router.push('/')
    } else {
      setUser(currentUser)
      setProgress(AuthService.getCourseProgress())
    }
  }, [router])

  const handleLogout = () => {
    AuthService.logout()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-soft border-b border-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {courseMetadata.title}
                  </h1>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Welcome back, <span className="font-semibold text-primary-600">{user.name}</span>!
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Progress Card */}
        <div className="card p-8 mb-8 hover:shadow-soft-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Progress</h2>
              <p className="text-gray-600">Keep learning to unlock more content</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {progress}%
              </div>
              <p className="text-sm text-gray-500 mt-1">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-primary-600 to-primary-700 h-4 rounded-full transition-all duration-500 ease-out shadow-md"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="text-2xl font-bold text-primary-700">{courseData.length}</div>
              <div className="text-sm text-gray-600 mt-1">Sections</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-700">
                {courseData.reduce((acc, section) => acc + section.activities.length, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Activities</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="text-2xl font-bold text-amber-700">8-10h</div>
              <div className="text-sm text-gray-600 mt-1">Duration</div>
            </div>
          </div>
        </div>

        {/* Course Sections */}
        <div className="space-y-6">
          {courseData.map((section, sectionIndex) => (
            <div key={section.id} className="card overflow-hidden hover:shadow-soft-lg animate-slide-in" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <div className="section-header">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
                      Section {sectionIndex + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1.5">
                      {section.title}
                    </h3>
                  </div>
                  {section.accessLevel === 'free' ? (
                    <span className="badge badge-free">
                      Free
                    </span>
                  ) : (
                    <span className="badge badge-premium">
                      Premium
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {section.activities.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-8">
                    No activities available yet. Check back soon!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {section.activities.map((activity, activityIndex) => {
                      const activityProgress = AuthService.getProgress(activity.id)
                      const isCompleted = activityProgress?.completed || false

                      return (
                        <Link
                          key={activity.id}
                          href={`/course/${section.id}/${activity.id}`}
                          className="activity-card"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                              isCompleted
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600'
                            }`}>
                              {isCompleted ? (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="font-bold text-lg">{activityIndex + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors text-lg">
                                {activity.title}
                              </h4>
                              <div className="flex items-center space-x-4 mt-1.5">
                                <span className="text-sm text-gray-600 font-medium">
                                  {activity.type === 'ebook' && '📚 E-book'}
                                  {activity.type === 'video' && '🎥 Video'}
                                  {activity.type === 'reading' && '📖 Reading'}
                                  {activity.type === 'quiz' && '✏️ Quiz'}
                                  {activity.type === 'coaching' && '💡 Coaching'}
                                </span>
                                {activity.duration && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-500">
                                      {activity.duration}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <svg
                            className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
