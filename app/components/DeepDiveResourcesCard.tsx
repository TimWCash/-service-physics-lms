'use client'

import { DeepDiveResource } from '@/data/courseDataV3'

interface Props {
  resources: DeepDiveResource[]
}

export default function DeepDiveResourcesCard({ resources }: Props) {
  if (!resources || resources.length === 0) {
    return null
  }

  const readResources = resources.filter(r => r.type === 'read').sort((a, b) => a.order - b.order)
  const watchResources = resources.filter(r => r.type === 'watch').sort((a, b) => a.order - b.order)

  return (
    <div className="card p-6 bg-purple-50 border-2 border-purple-200">
      <h3 className="text-lg font-bold mb-2 text-purple-900">Deep Dive Resources</h3>
      <p className="text-sm text-purple-700 mb-6">
        Here are some additional resources related to the topics in this module for further exploration.
      </p>

      {readResources.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
            <span className="text-2xl">📚</span> Read
          </h4>
          <div className="space-y-3">
            {readResources.map(resource => (
              <a
                key={resource.id}
                href={resource.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-4 rounded-lg hover:bg-gray-50 transition shadow-sm border border-gray-200"
              >
                <div className="flex gap-3">
                  {resource.thumbnailUrl && (
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      className="w-16 h-20 object-cover rounded shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 mb-1">{resource.title}</h5>
                    {resource.description && (
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Open resource</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {watchResources.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
            <span className="text-2xl">🎥</span> Watch
          </h4>
          <div className="space-y-3">
            {watchResources.map(resource => (
              <a
                key={resource.id}
                href={resource.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-4 rounded-lg hover:bg-gray-50 transition shadow-sm border border-gray-200"
              >
                <div className="flex gap-3">
                  {resource.thumbnailUrl && (
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      className="w-24 h-16 object-cover rounded shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 mb-1">{resource.title}</h5>
                    {resource.description && (
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Watch video</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
