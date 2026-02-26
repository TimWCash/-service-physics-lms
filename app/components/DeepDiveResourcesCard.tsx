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
    <div className="bg-white rounded-lg border border-surface-200 overflow-hidden">
      <div className="bg-surface-800 px-6 py-4">
        <h3 className="font-display text-white text-lg">Deep Dive Resources</h3>
        <p className="text-surface-400 text-sm mt-1 font-sans">Additional resources for further exploration</p>
      </div>

      <div className="p-6">
        {readResources.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-surface-800 font-sans text-sm">
              <svg className="w-4 h-4 text-surface-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              Read
            </h4>
            <div className="space-y-3">
              {readResources.map(resource => (
                <a
                  key={resource.id}
                  href={resource.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-surface-50 p-4 rounded-lg hover:bg-surface-100 transition-colors border border-surface-200"
                >
                  <div className="flex gap-3">
                    {resource.thumbnailUrl ? (
                      <img
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="w-16 h-20 object-cover rounded border border-surface-200"
                      />
                    ) : (
                      <div className="w-16 h-20 bg-primary-50 rounded border border-primary-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <h5 className="font-semibold text-surface-800 mb-1 font-sans text-sm">{resource.title}</h5>
                      {resource.description && (
                        <p className="text-sm text-surface-500 font-sans">{resource.description}</p>
                      )}
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-primary-600 font-sans">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
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
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-surface-800 font-sans text-sm">
              <svg className="w-4 h-4 text-surface-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Watch
            </h4>
            <div className="space-y-3">
              {watchResources.map(resource => (
                <a
                  key={resource.id}
                  href={resource.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-surface-50 p-4 rounded-lg hover:bg-surface-100 transition-colors border border-surface-200"
                >
                  <div className="flex gap-3">
                    {resource.thumbnailUrl ? (
                      <img
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="w-24 h-16 object-cover rounded border border-surface-200"
                      />
                    ) : (
                      <div className="w-24 h-16 bg-primary-50 rounded border border-primary-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <h5 className="font-semibold text-surface-800 mb-1 font-sans text-sm">{resource.title}</h5>
                      {resource.description && (
                        <p className="text-sm text-surface-500 font-sans">{resource.description}</p>
                      )}
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-primary-600 font-sans">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
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
    </div>
  )
}
