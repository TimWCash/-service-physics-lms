'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '@/lib/auth'
import { courseData, LearningActivity, CourseSection } from '@/data/courseData'
import Quiz from '@/app/components/Quiz'
import VideoPlayer from '@/app/components/VideoPlayer'
import ContentViewer from '@/app/components/ContentViewer'

export default function ActivityPage() {
  const params = useParams()
  const router = useRouter()
  const [activity, setActivity] = useState<LearningActivity | null>(null)
  const [section, setSection] = useState<CourseSection | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const user = AuthService.getUser()
    if (!user) {
      router.push('/')
      return
    }

    const sectionId = params.sectionId as string
    const activityId = params.activityId as string

    const foundSection = courseData.find(s => s.id === sectionId)
    const foundActivity = foundSection?.activities.find(a => a.id === activityId)

    if (!foundActivity || !foundSection) {
      router.push('/dashboard')
      return
    }

    setSection(foundSection)
    setActivity(foundActivity)

    const progress = AuthService.getProgress(activityId)
    setIsCompleted(progress?.completed || false)
  }, [params, router])

  const handleComplete = (score?: number) => {
    if (activity) {
      AuthService.updateProgress(activity.id, true, score)
      setIsCompleted(true)
    }
  }

  if (!activity || !section) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <p className="text-sm text-gray-500">{section.title}</p>
                <h1 className="text-xl font-semibold text-gray-900">
                  {activity.title}
                </h1>
              </div>
            </div>
            {isCompleted && (
              <span className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Completed</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activity.type === 'video' ? (
            <VideoPlayer
              videoUrl={activity.videoUrl || ''}
              onComplete={handleComplete}
              isCompleted={isCompleted}
            />
          ) : activity.type === 'quiz' || activity.type === 'coaching' ? (
            <Quiz
              questions={activity.questions || []}
              activityId={activity.id}
              onComplete={handleComplete}
              isCompleted={isCompleted}
              type={activity.type}
            />
          ) : (
            <ContentViewer
              content={activity.content || ''}
              onComplete={handleComplete}
              isCompleted={isCompleted}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Link
            href="/dashboard"
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Back to Course
          </Link>
          {!isCompleted && (activity.type === 'ebook' || activity.type === 'reading') && (
            <button
              onClick={() => handleComplete()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
