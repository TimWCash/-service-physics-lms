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

  const answerTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const notesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const savedNotes = AuthService.getNote(activityId)
    setNotes(savedNotes)

    const savedAnswers = AuthService.getAnswers(activityId)
    const stringAnswers: { [questionId: string]: string } = {}
    for (const [key, value] of Object.entries(savedAnswers)) {
      if (typeof value === 'string') {
        stringAnswers[key] = value
      }
    }
    setAnswers(stringAnswers)
  }, [activityId])

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

    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
    statusTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 2000)
  }, [activityId])

  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current)
    answerTimeoutRef.current = setTimeout(() => {
      saveData(newAnswers, notes)
    }, 500)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value
    setNotes(newNotes)

    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current)
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
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <h3 className="text-lg font-display text-surface-800">Discussion Questions</h3>
        </div>
        {saveStatus === 'saved' && (
          <span className="text-xs text-success-700 flex items-center gap-1 bg-success-50 px-2 py-1 rounded font-sans">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved
          </span>
        )}
        {saveStatus === 'saving' && (
          <span className="text-xs text-surface-500 bg-surface-50 px-2 py-1 rounded font-sans">Saving...</span>
        )}
      </div>

      <div className="space-y-5">
        {questions.sort((a, b) => a.order - b.order).map((q, index) => (
          <div key={q.id} className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded-lg">
            <p className="font-semibold text-surface-800 mb-3 font-sans text-sm">
              {index + 1}. {q.question}
            </p>
            <textarea
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              placeholder="Write your answer here..."
              className="w-full min-h-[100px] p-3 bg-white rounded-lg border border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 outline-none resize-y text-surface-800 placeholder-surface-400 text-sm font-sans"
            />
          </div>
        ))}
      </div>

      {/* Additional Notes Area */}
      <div className="mt-6 bg-accent-50 border border-accent-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <div className="flex-1">
            <h4 className="font-display text-accent-800 mb-2">What other observations and questions do you have?</h4>
            <p className="text-sm text-accent-700 mb-3 font-sans">
              Use this space to reflect on what you learned and note any additional questions for your principal.
            </p>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Your additional notes here..."
              className="w-full min-h-[120px] p-4 bg-white rounded-lg border border-accent-200 focus:border-accent-400 focus:ring-2 focus:ring-accent-200 outline-none resize-y text-surface-800 placeholder-surface-400 font-sans text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
