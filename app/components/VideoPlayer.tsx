'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  videoUrl: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function VideoPlayer({ videoUrl, onComplete, isCompleted }: VideoPlayerProps) {
  const [hasWatched, setHasWatched] = useState(false)

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('/').pop()
        : new URLSearchParams(new URL(url).search).get('v')
      return `https://www.youtube.com/embed/${videoId}?rel=0`
    }

    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }

    return url
  }

  const embedUrl = getEmbedUrl(videoUrl)
  const isVideoUrl = videoUrl.includes('http') || videoUrl.includes('youtube') || videoUrl.includes('vimeo')

  const handleMarkComplete = () => {
    setHasWatched(true)
    onComplete()
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        {isVideoUrl ? (
          <div className="aspect-video bg-surface-900 rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Video"
            />
          </div>
        ) : (
          <div className="aspect-video bg-surface-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="w-20 h-20 mx-auto mb-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-sans font-medium">Video Player Placeholder</p>
              <p className="text-sm text-surface-400 mt-2 font-sans">Video: {videoUrl}</p>
              <p className="text-sm text-surface-400 mt-1 max-w-md mx-auto font-sans">
                To add real video, update the videoUrl in courseData.ts with a YouTube or Vimeo link
              </p>
            </div>
          </div>
        )}
      </div>

      {!isVideoUrl && (
        <div className="bg-info-50 border-l-4 border-info-500 p-4 rounded-lg mb-6">
          <p className="text-sm text-info-700 font-sans">
            <strong>Video Content:</strong> To display a real video, update the videoUrl in courseData.ts with:
          </p>
          <ul className="text-sm text-info-700 mt-2 ml-4 list-disc font-sans">
            <li>YouTube: https://www.youtube.com/watch?v=VIDEO_ID</li>
            <li>Vimeo: https://vimeo.com/VIDEO_ID</li>
            <li>Or a direct embed URL</li>
          </ul>
        </div>
      )}

      {!isCompleted && (
        <div className="mt-6">
          <button
            onClick={handleMarkComplete}
            className="btn-primary w-full py-3 font-sans"
          >
            Mark as Watched
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="mt-6 px-6 py-3 bg-success-50 text-success-700 rounded-lg text-center font-semibold font-sans text-sm border border-success-200">
          <svg className="w-4 h-4 inline-block mr-1.5 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Video Completed
        </div>
      )}
    </div>
  )
}
