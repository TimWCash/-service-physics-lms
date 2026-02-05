'use client'

import ReactMarkdown from 'react-markdown'

interface ContentViewerProps {
  content: string;
  externalUrl?: string;
  audioUrl?: string;
  description?: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function ContentViewer({ content, externalUrl, audioUrl, description, onComplete, isCompleted }: ContentViewerProps) {
  // If there's an audio URL, show the audio player
  if (audioUrl) {
    return (
      <div className="p-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Audio Content</h2>

          {description && (
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed text-center">
              {description}
            </p>
          )}

          <div className="bg-white rounded-xl p-6 shadow-md">
            <audio
              controls
              className="w-full"
              preload="metadata"
            >
              <source src={audioUrl} type="audio/wav" />
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <p className="text-sm text-gray-600 mt-6 text-center">
            🎧 Listen to the audio above, then mark as complete and answer the discussion questions below.
          </p>
        </div>
      </div>
    )
  }

  // If there's an external URL and no content, show the external resource card
  if (externalUrl && !content) {
    return (
      <div className="p-8">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">External Reading</h2>

          {description && (
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Open Article</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <p className="text-sm text-gray-600 mt-6">
            💡 After reading, return here to mark this activity as complete and answer the discussion questions below.
          </p>
        </div>
      </div>
    )
  }

  // Check if content contains HTML tags
  const isHtmlContent = content && (content.includes('<div') || content.includes('<p>') || content.includes('<h3>') || content.includes('<ul>'))

  // If content is HTML, render it directly
  if (isHtmlContent) {
    return (
      <div className="p-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }

  // Otherwise, render markdown content
  return (
    <div className="p-8">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4" {...props} />,
            strong: ({ node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
            code: ({ node, ...props }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
