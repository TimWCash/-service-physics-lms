'use client'

import ReactMarkdown from 'react-markdown'

interface ContentViewerProps {
  content: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function ContentViewer({ content, onComplete, isCompleted }: ContentViewerProps) {
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
