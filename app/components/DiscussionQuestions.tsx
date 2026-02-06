'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { DiscussionQuestion } from '@/data/courseDataV3'
import { AuthService } from '@/lib/auth'

interface Props {
  questions: DiscussionQuestion[]
  activityId: string
}

export default function DiscussionQuestions({ questions, activityId }: Props) {
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({})
  const [notes, setNotes] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  // Refs to track debounce timeouts - prevents memory leaks
  const answerTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const notesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Load existing notes and answers for this activity
    const savedNotes = AuthService.getNote(activityId)
    setNotes(savedNotes)

    const savedAnswers = AuthService.getAnswers(activityId)
    setAnswers(savedAnswers)
  }, [activityId])

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current)
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current)
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
    }
  }, [])

  const saveData = useCallback((newAnswers: { [questionId: string]: string }, newNotes: string) => {
    setSaveStatus('saving')
    AuthService.saveNote(activityId, newNotes)
    AuthService.saveAnswers(activityId, newAnswers)
    setSaveStatus('saved')

    // Clear previous status timeout
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
    statusTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 2000)
  }, [activityId])

  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    // Clear previous timeout before setting new one
    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current)

    // Debounced save
    answerTimeoutRef.current = setTimeout(() => {
      saveData(newAnswers, notes)
    }, 500)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value
    setNotes(newNotes)

    // Clear previous timeout before setting new one
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current)

    // Debounced save
    notesTimeoutRef.current = setTimeout(() => {
      saveData(answers, newNotes)
    }, 500)
  }

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-lg font-bold text-gray-900">Discussion Questions</h3>
        </div>
        {saveStatus === 'saved' && (
          <span className="text-xs text-green-700 flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved
          </span>
        )}
        {saveStatus === 'saving' && (
          <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">Saving...</span>
        )}
      </div>

      <div className="space-y-6">
        {questions.sort((a, b) => a.order - b.order).map((q, index) => (
          <div key={q.id} className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-3">
              {index + 1}. {q.question}
            </p>
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              placeholder="Write your answer here..."
              className="w-full min-h-[100px] p-3 bg-white rounded-lg border border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-none resize-y text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Additional Notes Area */}
      <div className="mt-6 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <svg className="w-8 h-8 text-yellow-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <div className="flex-1">
            <h4 className="font-bold text-yellow-900 mb-2">📝 What other observations and questions do you have?</h4>
            <p className="text-sm text-yellow-800 mb-3">
              Use this space to reflect on what you learned and note any additional questions for your coach.
            </p>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Your additional notes here..."
              className="w-full min-h-[120px] p-4 bg-white/80 rounded border border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none resize-y text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
