'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { AuthService } from '@/lib/auth'
import { courseModules, LearningActivity, CourseModule } from '@/data/courseDataV3'
import Quiz from '@/app/components/Quiz'
import VideoPlayer from '@/app/components/VideoPlayer'
import ContentViewer from '@/app/components/ContentViewer'
import DiscussionQuestions from '@/app/components/DiscussionQuestions'

export default function ActivityPage() {
  const params = useParams()
  const router = useRouter()
  const [activity, setActivity] = useState<LearningActivity | null>(null)
  const [module, setModule] = useState<CourseModule | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const user = AuthService.getUser()
    if (!user) {
      router.push('/')
      return
    }

    const moduleId = params.moduleId as string
    const activityId = params.activityId as string

    const foundModule = courseModules.find(m => m.id === moduleId)
    const foundActivity = foundModule?.activities.find(a => a.id === activityId)

    if (!foundActivity || !foundModule) {
      router.push('/dashboard')
      return
    }

    setModule(foundModule)
    setActivity(foundActivity)

    const progress = AuthService.getProgress(activityId)
    setIsCompleted(progress?.completed || false)
  }, [params, router])

  const handleComplete = async (score?: number) => {
    if (activity && module) {
      await AuthService.updateProgress(activity.id, true, score, module.id)
      setIsCompleted(true)
    }
  }

  if (!activity || !module) return null

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-surface-400 hover:text-surface-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <p className="text-sm text-surface-500 font-sans">{module.title}</p>
                <h1 className="text-xl font-display text-surface-800">
                  {activity.title}
                </h1>
              </div>
            </div>
            {isCompleted && (
              <span className="flex items-center space-x-2 px-4 py-2 bg-success-50 text-success-700 rounded-full text-sm font-medium font-sans">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-white rounded-lg border border-surface-200 overflow-hidden">
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
              externalUrl={activity.externalUrl}
              audioUrl={activity.audioUrl}
              description={activity.description}
              onComplete={handleComplete}
              isCompleted={isCompleted}
              activityId={activity.id}
              practiceSections={activity.practiceSections}
            />
          )}
        </div>

        {/* Discussion Questions */}
        {activity.discussionQuestions && activity.discussionQuestions.length > 0 && (
          <div className="mt-8">
            <DiscussionQuestions
              questions={activity.discussionQuestions}
              activityId={activity.id}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Link
            href={`/module/${module.id}?tab=dive_in`}
            className="btn-secondary"
          >
            Back to Module
          </Link>
          {!isCompleted && (activity.type === 'ebook' || activity.type === 'reading' || activity.type === 'audio' || activity.type === 'practice') && (
            <button
              onClick={() => handleComplete()}
              className="btn-primary"
            >
              Mark as Complete
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
