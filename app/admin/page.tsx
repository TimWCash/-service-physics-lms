'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { courseData } from '@/data/courseData'

interface UserProgress {
  id: string
  email: string
  full_name: string
  created_at: string
  progressCount: number
  progressPercentage: number
  completedActivities: string[]
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at')
        .order('created_at', { ascending: false })

      if (profilesError) throw profilesError

      // Fetch all course progress
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('user_id, activity_id, completed')
        .eq('completed', true)

      if (progressError) throw progressError

      // Calculate total activities
      const totalActivities = courseData.reduce((acc, section) => acc + section.activities.length, 0)

      // Combine data
      const usersWithProgress = profiles?.map(profile => {
        const userProgress = progressData?.filter(p => p.user_id === profile.id) || []
        const completedCount = userProgress.length
        const completedActivities = userProgress.map(p => p.activity_id)

        return {
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name,
          created_at: profile.created_at,
          progressCount: completedCount,
          progressPercentage: Math.round((completedCount / totalActivities) * 100),
          completedActivities
        }
      }) || []

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                {user.completedActivities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Completed Activities:</p>
                    <div className="flex flex-wrap gap-2">
                      {user.completedActivities.map((activityId) => {
                        // Find activity name from courseData
                        let activityName = activityId
                        courseData.forEach(section => {
                          const activity = section.activities.find(a => a.id === activityId)
                          if (activity) {
                            activityName = activity.title
                          }
                        })

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
