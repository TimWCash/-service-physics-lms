'use client'

import { courseModules } from '@/data/courseDataV3'
import ThreeColumnLayout from '@/app/components/ThreeColumnLayout'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = courseModules.find(m => m.id === params.moduleId)

  if (!module) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="p-8 text-white shadow-lg"
        style={{ backgroundColor: module.colorHex }}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>

          <h1 className="text-4xl font-bold mb-2">{module.title}</h1>

          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{module.timeEstimateMinutes} minutes</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{module.activities.length} activities</span>
            </div>
          </div>
        </div>
      </header>

      {/* Three Column Layout */}
      <div className="p-8">
        <ThreeColumnLayout module={module} />
      </div>
    </div>
  )
}
