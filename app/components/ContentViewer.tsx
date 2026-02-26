'use client'

import ReactMarkdown from 'react-markdown'
import { PracticeSection } from '@/data/courseDataV3'
import PracticeWorksheet from './PracticeWorksheet'

interface ContentViewerProps {
  content: string;
  externalUrl?: string;
  audioUrl?: string;
  description?: string;
  onComplete: () => void;
  isCompleted: boolean;
  activityId?: string;
  practiceSections?: PracticeSection[];
}

export default function ContentViewer({ content, externalUrl, audioUrl, description, onComplete, isCompleted, activityId, practiceSections }: ContentViewerProps) {
  // If there's an audio URL, show the audio player
  if (audioUrl) {
    return (
      <div className="p-8">
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-display text-surface-800 mb-3 text-center">Audio Content</h2>

          {description && (
            <p className="text-surface-600 mb-6 max-w-2xl mx-auto leading-relaxed text-center font-sans">
              {description}
            </p>
          )}

          <div className="bg-white rounded-lg p-6 border border-surface-200">
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

          <p className="text-sm text-surface-500 mt-6 text-center font-sans">
            Listen to the audio above, then mark as complete and answer the discussion questions below.
          </p>
        </div>
      </div>
    )
  }

  // If there's an external URL and no content, show the external resource card
  if (externalUrl && !content) {
    return (
      <div className="p-8">
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-14 h-14 text-primary-500" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>

          <h2 className="text-2xl font-display text-surface-800 mb-3">External Reading</h2>

          {description && (
            <p className="text-surface-600 mb-6 max-w-2xl mx-auto leading-relaxed font-sans">
              {description}
            </p>
          )}

          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary py-3 px-6"
          >
            <span className="font-sans">Open Article</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>

          <p className="text-sm text-surface-500 mt-6 font-sans">
            After reading, return here to mark this activity as complete and answer the discussion questions below.
          </p>
        </div>
      </div>
    )
  }

  // Check if content contains HTML tags
  const isHtmlContent = content && (content.includes('<div') || content.includes('<p>') || content.includes('<h3>') || content.includes('<ul>'))

  // If content is HTML, render it directly (with optional practice sections below)
  if (isHtmlContent) {
    return (
      <div className="p-8">
        <div
          className="prose prose-sm prose-surface max-w-none prose-headings:font-display prose-headings:text-surface-800 prose-p:text-surface-600 prose-a:text-primary-600 prose-img:rounded-lg prose-img:border prose-img:border-surface-200"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Render interactive practice worksheet if available */}
        {practiceSections && practiceSections.length > 0 && activityId && (
          <div className="mt-8">
            <PracticeWorksheet
              sections={practiceSections}
              activityId={activityId}
            />
          </div>
        )}
      </div>
    )
  }

  // Otherwise, render markdown content
  return (
    <div className="p-8">
      <div className="prose prose-sm prose-surface max-w-none prose-headings:font-display">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-display text-surface-800 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-display text-surface-800 mt-8 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-display text-surface-800 mt-6 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="text-surface-600 mb-4 leading-relaxed font-sans" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-surface-600 font-sans" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-surface-600 font-sans" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4 font-sans" {...props} />,
            strong: ({ node, ...props}) => <strong className="font-semibold text-surface-800" {...props} />,
            code: ({ node, ...props }) => <code className="bg-surface-100 px-2 py-1 rounded text-sm font-mono text-surface-700" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
