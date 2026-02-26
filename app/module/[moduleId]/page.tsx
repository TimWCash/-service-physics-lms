'use client'

import { use } from 'react'
import { useSearchParams } from 'next/navigation'
import { courseModules } from '@/data/courseDataV3'
import ThreeColumnLayout from '@/app/components/ThreeColumnLayout'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params)
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') as 'overview' | 'dive_in' | 'recap') || 'overview'
  const moduleIndex = courseModules.findIndex(m => m.id === moduleId)
  const module = courseModules[moduleIndex]

  if (!module) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-surface-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-surface-500 hover:text-surface-700 mb-6 text-sm transition-colors font-sans"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-sans font-bold flex-shrink-0"
              style={{ backgroundColor: module.colorHex }}
            >
              {moduleIndex + 1}
            </div>
            <div>
              <h1 className="text-2xl font-display text-surface-800">{module.title}</h1>
              <div className="flex items-center gap-3 mt-1.5 text-sm text-surface-500 font-sans">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{module.timeEstimateMinutes} minutes</span>
                </div>
                <span className="text-surface-300">|</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{module.activities.length} activities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Three Column Layout */}
      <div className="px-6 py-10 lg:px-8 lg:py-12">
        <ThreeColumnLayout module={module} initialTab={initialTab} />
      </div>
    </div>
  )
}
