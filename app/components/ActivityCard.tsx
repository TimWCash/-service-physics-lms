'use client'

import { LearningActivity } from '@/data/courseDataV3'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AuthService } from '@/lib/auth'

interface Props {
  activity: LearningActivity
  moduleId: string
}

export default function ActivityCard({ activity, moduleId }: Props) {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const user = AuthService.getUser()
    if (user && user.progress[activity.id]) {
      setIsCompleted(user.progress[activity.id].completed)
    }
  }, [activity.id])

  const getTypeIcon = (type: string) => {
    const icons = {
      video: '🎥',
      audio: '🎧',
      reading: '📖',
      practice: '✏️',
      quiz: '✅',
      ebook: '📚',
      coaching: '💭'
    }
    return icons[type as keyof typeof icons] || '📄'
  }

  const getTypeColor = (type: string) => {
    const colors = {
      video: 'bg-red-100 text-red-700',
      audio: 'bg-purple-100 text-purple-700',
      reading: 'bg-blue-100 text-blue-700',
      practice: 'bg-green-100 text-green-700',
      quiz: 'bg-yellow-100 text-yellow-700',
      ebook: 'bg-indigo-100 text-indigo-700',
      coaching: 'bg-pink-100 text-pink-700'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  return (
    <Link href={`/course/${moduleId}/${activity.id}`}>
      <div className={`activity-card p-4 hover:shadow-soft-lg transition-all cursor-pointer relative ${isCompleted ? 'border-l-4 border-green-500' : ''}`}>
        {isCompleted && (
          <div className="absolute top-4 right-4">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          {activity.thumbnailUrl && (
            <div className="flex-shrink-0">
              <img
                src={activity.thumbnailUrl}
                alt={activity.title}
                className="w-24 h-24 object-cover rounded shadow-sm"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getTypeIcon(activity.type)}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded uppercase ${getTypeColor(activity.type)}`}>
                {activity.type}
              </span>
              {activity.duration && (
                <span className="text-sm text-gray-500">• {activity.duration} min</span>
              )}
            </div>

            <h4 className="font-bold text-lg mb-2 text-gray-900">{activity.title}</h4>

            {activity.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
            )}

            {/* Discussion Questions Preview */}
            {activity.discussionQuestions && activity.discussionQuestions.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>{activity.discussionQuestions.length} discussion questions</span>
              </div>
            )}

            {activity.externalUrl && (
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>External link</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
