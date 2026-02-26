'use client'

import { CoachingPrep } from '@/data/courseDataV3'

interface Props {
  coachingPrep: CoachingPrep
}

export default function CoachingPrepCard({ coachingPrep }: Props) {
  return (
    <div className="bg-white rounded-lg border border-surface-200 overflow-hidden">
      <div className="bg-primary-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <h3 className="font-display text-white text-lg">Discussion Questions for Your Principal</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {coachingPrep.discussionQuestions.map((question, index) => (
            <div key={index} className="flex gap-3 p-4 bg-surface-50 rounded-lg">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 font-sans">
                {index + 1}
              </span>
              <p className="text-surface-700 font-sans text-sm leading-relaxed">{question}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
