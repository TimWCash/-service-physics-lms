'use client'

import { useState } from 'react'
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
    const savedProgress = AuthService.getProgress(activityId)
    const displayScore = savedProgress?.score || score

    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <div className={`inline-block px-8 py-4 rounded-full ${
            displayScore >= 70 ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <p className={`text-5xl font-bold ${
              displayScore >= 70 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {displayScore}%
            </p>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            {displayScore >= 70 ? '🎉 Great Job!' : '💪 Keep Learning!'}
          </h2>
          <p className="text-gray-600 mt-2">
            You got {selectedAnswers.filter((a, i) => a === questions[i].correctAnswer).length} out of {questions.length} questions correct
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((q, i) => {
            const isCorrect = selectedAnswers[i] === q.correctAnswer

            return (
              <div key={q.id} className={`p-6 rounded-lg border-2 ${
                isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
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
                    <p className="font-medium text-gray-900 mb-3">{q.question}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Your answer:</strong> {q.options[selectedAnswers[i]]}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-sm text-gray-600 mt-3 italic">
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
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {type === 'coaching' ? '💡 Coaching Moment' : '✏️ Quiz'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  )
}
