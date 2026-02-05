'use client'

import { useState, useEffect } from 'react'
import { DiscussionQuestion } from '@/data/courseDataV3'
import { AuthService } from '@/lib/auth'

interface Props {
  questions: DiscussionQuestion[]
  activityId: string
}

export default function DiscussionQuestions({ questions, activityId }: Props) {
  const [notes, setNotes] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    // Load existing notes for this activity
    const savedNotes = AuthService.getNote(activityId)
    setNotes(savedNotes)
  }, [activityId])

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value
    setNotes(newNotes)

    // Auto-save after user stops typing for 500ms
    setSaveStatus('saving')

    const timeoutId = setTimeout(() => {
      AuthService.saveNote(activityId, newNotes)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-bold text-gray-900">Discussion Questions</h3>
      </div>

      <div className="space-y-4">
        {questions.sort((a, b) => a.order - b.order).map((q, index) => (
          <div key={q.id} className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded">
            <p className="font-semibold text-gray-900 mb-2">
              {index + 1}. {q.question}
            </p>
          </div>
        ))}
      </div>

      {/* Reflection Area */}
      <div className="mt-6 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <svg className="w-8 h-8 text-yellow-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-yellow-900">📝 What other observations and questions do you have?</h4>
              {saveStatus === 'saved' && (
                <span className="text-xs text-green-700 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </span>
              )}
              {saveStatus === 'saving' && (
                <span className="text-xs text-gray-600">Saving...</span>
              )}
            </div>
            <p className="text-sm text-yellow-800 mb-3">
              Use this space to reflect on what you learned and note any additional questions for your coach.
            </p>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Your notes here..."
              className="w-full min-h-[120px] p-4 bg-white/80 rounded border border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none resize-y text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
