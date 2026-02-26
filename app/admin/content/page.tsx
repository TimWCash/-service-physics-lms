'use client'

import { courseModules } from '@/data/courseDataV3'
import Link from 'next/link'

export default function ContentManagementPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-surface-800">Content Management</h1>
              <p className="text-sm text-surface-400">View all activities and their content</p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 text-surface-600 bg-white border border-surface-300 rounded-lg hover:bg-surface-50"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-accent-50 border-l-4 border-accent-400 p-4 mb-6">
          <p className="text-sm text-accent-800">
            <strong>Note:</strong> To edit content, update the <code className="bg-accent-100 px-1 rounded">data/courseDataV3.ts</code> file and redeploy.
          </p>
        </div>

        <div className="space-y-8">
          {courseModules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="px-6 py-4 text-white"
                style={{ backgroundColor: module.colorHex }}
              >
                <h2 className="text-xl font-bold">Module {module.order}: {module.title}</h2>
                <p className="text-sm opacity-90">{module.activities.length} activities • {module.timeEstimateMinutes} min</p>
              </div>

              <div className="divide-y">
                {module.activities.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-surface-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            activity.type === 'video' ? 'bg-danger-100 text-danger-700' :
                            activity.type === 'reading' ? 'bg-primary-100 text-primary-700' :
                            activity.type === 'audio' ? 'bg-info-100 text-info-700' :
                            activity.type === 'practice' ? 'bg-success-100 text-success-700' :
                            'bg-surface-100 text-surface-600'
                          }`}>
                            {activity.type}
                          </span>
                          <span className="text-xs text-surface-400">{activity.duration} min</span>
                        </div>
                        <h3 className="font-semibold text-surface-800 mt-1">{activity.title}</h3>
                        <p className="text-sm text-surface-500 mt-1">{activity.description}</p>

                        {/* URLs */}
                        <div className="mt-2 space-y-1">
                          {activity.videoUrl && (
                            <p className="text-xs">
                              <span className="font-medium text-surface-400">Video:</span>{' '}
                              <a href={activity.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                                {activity.videoUrl}
                              </a>
                            </p>
                          )}
                          {activity.externalUrl && (
                            <p className="text-xs">
                              <span className="font-medium text-surface-400">External:</span>{' '}
                              <a href={activity.externalUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                                {activity.externalUrl}
                              </a>
                            </p>
                          )}
                          {activity.audioUrl && (
                            <p className="text-xs">
                              <span className="font-medium text-surface-400">Audio:</span>{' '}
                              <span className="text-surface-500">{activity.audioUrl}</span>
                            </p>
                          )}
                        </div>

                        {/* Discussion Questions */}
                        {activity.discussionQuestions && activity.discussionQuestions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-surface-400 mb-1">Discussion Questions:</p>
                            <ul className="text-xs text-surface-500 space-y-1">
                              {activity.discussionQuestions.map((q) => (
                                <li key={q.id} className="pl-3 border-l-2 border-surface-200">
                                  {q.question}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-surface-400 ml-4">
                        {activity.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
