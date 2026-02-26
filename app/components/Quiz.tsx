'use client'

import { useState, useEffect } from 'react'
import { QuizQuestion } from '@/data/courseDataV3'
import { AuthService } from '@/lib/auth'

interface QuizProps {
  questions: QuizQuestion[];
  activityId: string;
  onComplete: (score: number) => void;
  isCompleted: boolean;
  type: 'quiz' | 'coaching';
}

export default function Quiz({ questions, activityId, onComplete, isCompleted, type }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(isCompleted)
  const [score, setScore] = useState(0)
  const [savedScore, setSavedScore] = useState<number | null>(null)

  useEffect(() => {
    if (isCompleted) {
      const progress = AuthService.getProgress(activityId)
      if (progress?.score !== undefined) {
        setSavedScore(progress.score)
      }
    }
  }, [activityId, isCompleted])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correctCount++
      }
    })

    const finalScore = Math.round((correctCount / questions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
    onComplete(finalScore)
  }

  const allAnswered = selectedAnswers.length === questions.length &&
    selectedAnswers.every(a => a !== undefined)

  const question = questions[currentQuestion]

  if (showResults) {
    const displayScore = savedScore ?? score
    const correctCount = selectedAnswers.length > 0
      ? selectedAnswers.filter((a, i) => a === questions[i]?.correctAnswer).length
      : Math.round((displayScore / 100) * questions.length)

    // Previously completed quiz (no answers in memory)
    if (isCompleted && selectedAnswers.length === 0) {
      return (
        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`inline-block px-8 py-4 rounded-full ${
              displayScore >= 70 ? 'bg-success-50' : 'bg-warning-50'
            }`}>
              <p className={`text-5xl font-sans font-bold ${
                displayScore >= 70 ? 'text-success-500' : 'text-warning-500'
              }`}>
                {displayScore}%
              </p>
            </div>
            <h2 className="text-2xl font-display text-surface-800 mt-4">
              {displayScore >= 70 ? 'Quiz Completed!' : 'Quiz Completed!'}
            </h2>
            <p className="text-surface-600 mt-2 font-sans">
              You scored {displayScore}% on this quiz ({correctCount} out of {questions.length} correct)
            </p>
            <p className="text-sm text-surface-500 mt-4 font-sans">
              Retake this quiz to see detailed question breakdown.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setShowResults(false)
                setSelectedAnswers([])
                setCurrentQuestion(0)
                setSavedScore(null)
              }}
              className="btn-primary py-3 px-6 font-sans"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <div className={`inline-block px-8 py-4 rounded-full ${
            displayScore >= 70 ? 'bg-success-50' : 'bg-warning-50'
          }`}>
            <p className={`text-5xl font-sans font-bold ${
              displayScore >= 70 ? 'text-success-500' : 'text-warning-500'
            }`}>
              {displayScore}%
            </p>
          </div>
          <h2 className="text-2xl font-display text-surface-800 mt-4">
            {displayScore >= 70 ? 'Great Job!' : 'Keep Learning!'}
          </h2>
          <p className="text-surface-600 mt-2 font-sans">
            You got {correctCount} out of {questions.length} questions correct
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => {
            const isCorrect = selectedAnswers[i] === q.correctAnswer

            return (
              <div key={q.id} className={`p-5 rounded-lg border ${
                isCorrect ? 'bg-success-50 border-success-200' : 'bg-danger-50 border-danger-100'
              }`}>
                <div className="flex items-start space-x-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-success-500' : 'bg-danger-500'
                  }`}>
                    {isCorrect ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-surface-800 mb-2 font-sans text-sm">{q.question}</p>
                    <p className="text-sm text-surface-600 mb-1 font-sans">
                      <strong>Your answer:</strong> {q.options[selectedAnswers[i]] || 'Not answered'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-surface-600 mb-1 font-sans">
                        <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-sm text-surface-500 mt-2 italic font-sans">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-surface-500 font-sans">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-surface-400 font-sans">
            {type === 'coaching' ? 'Coaching Moment' : 'Quiz'}
          </span>
        </div>
        <div className="w-full bg-surface-100 rounded-full h-1.5">
          <div
            className="bg-primary-500 h-1.5 rounded-full transition-[width] duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-display text-surface-800 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-surface-200 hover:border-primary-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-surface-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-surface-700 font-sans text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary font-sans disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="btn-primary font-sans disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="btn-primary font-sans disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  )
}
