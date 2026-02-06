'use client'

import { useState, useEffect } from 'react'
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

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      // Fetch all course progress - this is the primary data source
      // Note: score column may not exist in all deployments, so we fetch without it first
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('user_id, activity_id, completed, completed_at')
        .eq('completed', true)

      if (progressError) {
        console.error('Progress error:', progressError)
      }

      console.log('Progress data fetched:', progressData?.length || 0, 'records')

      // Also try to fetch profiles for additional info
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at, updated_at')

      if (profilesError) {
        console.error('Profiles error:', profilesError)
      }

      console.log('Profiles fetched:', profiles?.length || 0, 'records')

      // Calculate total activities (31 across 7 modules including quizzes)
      const totalActivities = courseModules.reduce((acc, module) => acc + module.activities.length, 0)

      // Get quiz activity IDs
      const quizActivityIds = courseModules.flatMap(module =>
        module.activities.filter(a => a.type === 'quiz').map(a => a.id)
      )

      // Get unique user IDs from progress data
      const uniqueUserIds = [...new Set(progressData?.map(p => p.user_id) || [])]

      console.log('Unique users from progress:', uniqueUserIds)

      // Create a map of profiles for quick lookup
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || [])

      // Build users list from progress data (primary source)
      let usersWithProgress: UserProgress[] = uniqueUserIds.map(userId => {
        const userProgress = progressData?.filter(p => p.user_id === userId) || []
        const completedCount = userProgress.length
        const completedActivities = userProgress.map(p => p.activity_id)

        // Find earliest and latest completion dates
        const dates = userProgress.map(p => new Date(p.completed_at).getTime()).filter(d => !isNaN(d))
        const earliestDate = dates.length > 0 ? new Date(Math.min(...dates)).toISOString() : new Date().toISOString()
        const latestDate = dates.length > 0 ? new Date(Math.max(...dates)).toISOString() : new Date().toISOString()

        // Extract quiz completions (score tracking requires adding score column to Supabase)
        const quizScores: QuizScore[] = userProgress
          .filter(p => quizActivityIds.includes(p.activity_id))
          .map(p => {
            let activityName = p.activity_id
            courseModules.forEach(module => {
              const activity = module.activities.find(a => a.id === p.activity_id)
              if (activity) activityName = activity.title
            })
            return {
              activityId: p.activity_id,
              activityName,
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

      console.log('Final users with progress:', usersWithProgress.length)
      setUsers(usersWithProgress)
    } catch (error) {
      console.error('Error fetching user progress:', error)
    } finally {
      setLoading(false)
    }
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

        <h2 className="text-2xl font-bold text-gray-900 mb-6">User Progress</h2>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {users.length === 0 ? (
          <div className="card p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users yet</h3>
            <p className="text-gray-600">Users will appear here once they sign up and start learning.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
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
                        // Find activity name from courseModules
                        let activityName = activityId
                        let isQuiz = false
                        courseModules.forEach(module => {
                          const activity = module.activities.find(a => a.id === activityId)
                          if (activity) {
                            activityName = activity.title
                            isQuiz = activity.type === 'quiz'
                          }
                        })

                        // Skip quizzes in the completed list since they're shown above
                        if (isQuiz) return null

                        return (
                          <span
                            key={activityId}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                          >
                            ✓ {activityName}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
