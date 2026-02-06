'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { courseModules } from '@/data/courseDataV3'

interface QuizScore {
  activityId: string
  activityName: string
  score: number
  completedAt: string
}

interface UserProgress {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
  progressCount: number
  progressPercentage: number
  completedActivities: string[]
  quizScores: QuizScore[]
}

const USERS_PER_PAGE = 20
const ADMIN_EMAILS = ['tim@servicephysics.com', 'maria@servicephysics.com', 'brian@servicephysics.com', 'steve@servicephysics.com', 'timothy.cashman@gmail.com']

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  // Pre-compute activity lookup map for O(1) lookups
  const activityLookup = useMemo(() => {
    const map = new Map<string, { title: string; type: string }>()
    courseModules.forEach(module => {
      module.activities.forEach(activity => {
        map.set(activity.id, { title: activity.title, type: activity.type })
      })
    })
    return map
  }, [])

  // Pre-compute quiz activity IDs
  const quizActivityIds = useMemo(() => {
    return new Set(
      courseModules.flatMap(module =>
        module.activities.filter(a => a.type === 'quiz').map(a => a.id)
      )
    )
  }, [])

  // Pre-compute total activities
  const totalActivities = useMemo(() => {
    return courseModules.reduce((acc, module) => acc + module.activities.length, 0)
  }, [])

  // Check if user is authorized admin
  useEffect(() => {
    const checkAuthorization = () => {
      try {
        const userStr = localStorage.getItem('sp_lms_user')
        if (!userStr) {
          setIsAuthorized(false)
          return
        }
        const user = JSON.parse(userStr)
        const email = user.email?.toLowerCase()
        setIsAuthorized(ADMIN_EMAILS.includes(email))
      } catch {
        setIsAuthorized(false)
      }
    }
    checkAuthorization()
  }, [])

  useEffect(() => {
    if (isAuthorized) {
      fetchUserProgress()
    }
  }, [isAuthorized])

  const fetchUserProgress = async () => {
    try {
      // Fetch all course progress including scores - this is the primary data source
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('user_id, activity_id, completed, score, completed_at')
        .eq('completed', true)

      if (progressError) {
        console.error('Progress error:', progressError)
      }

      // Also try to fetch profiles for additional info
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at, updated_at')

      if (profilesError) {
        console.error('Profiles error:', profilesError)
      }

      // Create profile lookup map for O(1) lookups
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

      // Get unique user IDs from progress data
      const uniqueUserIds = [...new Set(progressData?.map(p => p.user_id) || [])]

      // Group progress data by user for efficient processing
      const progressByUser = new Map<string, typeof progressData>()
      progressData?.forEach(p => {
        const existing = progressByUser.get(p.user_id) || []
        existing.push(p)
        progressByUser.set(p.user_id, existing)
      })

      // Build users list from progress data (primary source)
      let usersWithProgress: UserProgress[] = uniqueUserIds.map(userId => {
        const userProgress = progressByUser.get(userId) || []
        const completedCount = userProgress.length
        const completedActivities = userProgress.map(p => p.activity_id)

        // Find earliest and latest completion dates
        const dates = userProgress.map(p => new Date(p.completed_at).getTime()).filter(d => !isNaN(d))
        const earliestDate = dates.length > 0 ? new Date(Math.min(...dates)).toISOString() : new Date().toISOString()
        const latestDate = dates.length > 0 ? new Date(Math.max(...dates)).toISOString() : new Date().toISOString()

        // Extract quiz completions using pre-computed quiz IDs
        const quizScores: QuizScore[] = userProgress
          .filter(p => quizActivityIds.has(p.activity_id))
          .map(p => {
            const activity = activityLookup.get(p.activity_id)
            return {
              activityId: p.activity_id,
              activityName: activity?.title || p.activity_id,
              score: (p as { score?: number }).score || 0,
              completedAt: p.completed_at
            }
          })

        // Try to get profile info, fallback to deriving from user_id
        const profile = profileMap.get(userId)
        let email = profile?.email || ''
        let fullName = profile?.full_name || ''

        if (!email) {
          // Convert user_id back to email format (user_tim_example_com -> tim@example.com)
          email = userId.replace(/^user_/, '').replace(/_/g, '.').replace(/\.([^.]+)$/, '@$1')
        }
        if (!fullName) {
          fullName = email.split('@')[0]
        }

        return {
          id: userId,
          email,
          full_name: fullName,
          created_at: profile?.created_at || earliestDate,
          updated_at: profile?.updated_at || latestDate,
          progressCount: completedCount,
          progressPercentage: Math.round((completedCount / totalActivities) * 100),
          completedActivities,
          quizScores
        }
      })

      // Sort by most recent activity
      usersWithProgress.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

      setUsers(usersWithProgress)
    } catch (error) {
      console.error('Error fetching user progress:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter users by search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users
    const query = searchQuery.toLowerCase()
    return users.filter(user =>
      user.email.toLowerCase().includes(query) ||
      user.full_name.toLowerCase().includes(query)
    )
  }, [users, searchQuery])

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE)
  }, [filteredUsers, currentPage])

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Authorization check
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don&apos;t have permission to view this page.</p>
          <a href="/dashboard" className="btn-primary inline-block">
            Return to Dashboard
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-soft border-b border-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track user progress across the course
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {users.length}
              </div>
              <p className="text-sm text-gray-500 mt-1">Total Users</p>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <a
            href="/admin/content"
            className="card p-6 hover:shadow-soft-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
                <p className="text-sm text-gray-600">Edit activity content, URLs, and metadata</p>
              </div>
            </div>
          </a>

          <a
            href="/admin/urls"
            className="card p-6 hover:shadow-soft-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">URL Management</h3>
                <p className="text-sm text-gray-600">Update external links and media URLs</p>
              </div>
            </div>
          </a>
        </div>

        {/* Search and Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Progress</h2>
          {users.length > 0 && (
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {users.length === 0 ? (
          <div className="card p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users yet</h3>
            <p className="text-gray-600">Users will appear here once they sign up and start learning.</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="card p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matching users</h3>
            <p className="text-gray-600">Try a different search term.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="card p-6 hover:shadow-soft-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{user.full_name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last active {new Date(user.updated_at).toLocaleDateString()} at {new Date(user.updated_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                        {user.progressPercentage}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {user.progressCount} activities completed
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-primary-700 h-3 rounded-full transition-all duration-500 ease-out shadow-md"
                      style={{ width: `${user.progressPercentage}%` }}
                    />
                  </div>

                  {/* Quiz Scores */}
                  {user.quizScores.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">📝 Quiz Scores:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {user.quizScores.map((quiz) => (
                          <div
                            key={quiz.activityId}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border ${
                              quiz.score >= 80
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : quiz.score >= 60
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-red-50 text-red-800 border-red-200'
                            }`}
                          >
                            <div className="font-semibold">{quiz.activityName.replace('Module ', 'M').replace(' Knowledge Check', '')}</div>
                            <div className="text-lg font-bold">{quiz.score}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {user.completedActivities.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Completed Activities:</p>
                      <div className="flex flex-wrap gap-2">
                        {user.completedActivities.map((activityId) => {
                          const activity = activityLookup.get(activityId)
                          // Skip quizzes in the completed list since they're shown above
                          if (activity?.type === 'quiz') return null

                          return (
                            <span
                              key={activityId}
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                            >
                              ✓ {activity?.title || activityId}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}

            {/* Results info */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Showing {((currentPage - 1) * USERS_PER_PAGE) + 1} - {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
            </p>
          </>
        )}
      </main>
    </div>
  )
}
