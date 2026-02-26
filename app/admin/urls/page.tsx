'use client'

import { courseModules } from '@/data/courseDataV3'
import Link from 'next/link'

export default function URLManagementPage() {
  // Collect all activities with URLs
  const activitiesWithUrls = courseModules.flatMap((module) =>
    module.activities
      .filter((a) => a.videoUrl || a.externalUrl || a.audioUrl)
      .map((activity) => ({
        ...activity,
        moduleId: module.id,
        moduleTitle: module.title,
        moduleOrder: module.order,
      }))
  )

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-surface-800">URL Management</h1>
              <p className="mt-1 text-sm text-surface-400">
                All external links, videos, and audio files
              </p>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 text-surface-600 bg-white border border-surface-300 rounded-lg hover:bg-surface-50"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-accent-50 border-l-4 border-accent-400 p-4 mb-6">
          <p className="text-sm text-accent-800">
            <strong>Note:</strong> To update URLs, edit the <code className="bg-accent-100 px-1 rounded">data/courseDataV3.ts</code> file and redeploy.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-danger-600">
              {activitiesWithUrls.filter((a) => a.videoUrl).length}
            </div>
            <p className="text-sm text-surface-500">Video URLs</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-primary-600">
              {activitiesWithUrls.filter((a) => a.externalUrl).length}
            </div>
            <p className="text-sm text-surface-500">External URLs</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-info-600">
              {activitiesWithUrls.filter((a) => a.audioUrl).length}
            </div>
            <p className="text-sm text-surface-500">Audio URLs</p>
          </div>
        </div>

        {/* URL List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-surface-200">
            <thead className="bg-surface-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-400 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-400 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-surface-200">
              {activitiesWithUrls.map((activity) => (
                <>
                  {activity.videoUrl && (
                    <tr key={`${activity.id}-video`} className="hover:bg-surface-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-surface-800">{activity.title}</div>
                        <div className="text-xs text-surface-400">Module {activity.moduleOrder}: {activity.moduleTitle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-danger-100 text-danger-700">
                          Video
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={activity.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline break-all"
                        >
                          {activity.videoUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {activity.videoUrl.includes('youtube.com') || activity.videoUrl.includes('youtu.be') ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-700">
                            ✓ YouTube
                          </span>
                        ) : activity.videoUrl.includes('vimeo.com') ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-accent-100 text-accent-700">
                            Vimeo
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-surface-100 text-surface-600">
                            Other
                          </span>
                        )}
                      </td>
                    </tr>
                  )}
                  {activity.externalUrl && (
                    <tr key={`${activity.id}-external`} className="hover:bg-surface-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-surface-800">{activity.title}</div>
                        <div className="text-xs text-surface-400">Module {activity.moduleOrder}: {activity.moduleTitle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                          External
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={activity.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline break-all"
                        >
                          {activity.externalUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-700">
                          ✓ Link
                        </span>
                      </td>
                    </tr>
                  )}
                  {activity.audioUrl && (
                    <tr key={`${activity.id}-audio`} className="hover:bg-surface-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-surface-800">{activity.title}</div>
                        <div className="text-xs text-surface-400">Module {activity.moduleOrder}: {activity.moduleTitle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-info-100 text-info-700">
                          Audio
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-surface-500 break-all">
                          {activity.audioUrl}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-accent-100 text-accent-700">
                          Local file
                        </span>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
