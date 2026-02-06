'use client'

import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import Image from 'next/image'
import { AuthService, User } from '@/lib/auth'
import { courseModules, courseMetadata } from '@/data/courseDataV3'
import confetti from 'canvas-confetti'

interface CourseCompletionProps {
  user: User
}

export default function CourseCompletion({ user }: CourseCompletionProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  // Calculate actual progress
  const completedCount = Object.values(user.progress).filter(p => p.completed).length
  const totalActivities = courseModules.reduce((acc, m) => acc + m.activities.length, 0)
  const progressPercent = Math.round((completedCount / totalActivities) * 100)
  const isFullyComplete = progressPercent >= 100

  useEffect(() => {
    // Trigger celebration confetti on mount
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const generateNotesPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      let yPosition = 20

      // Helper function to check page break
      const checkPageBreak = (neededSpace: number = 30) => {
        if (yPosition > 280 - neededSpace) {
          doc.addPage()
          yPosition = 20
        }
      }

      // Title
      doc.setFontSize(24)
      doc.setTextColor(33, 69, 87) // Service Physics teal
      doc.text('Service Physics', margin, yPosition)
      yPosition += 10

      doc.setFontSize(16)
      doc.setTextColor(100)
      doc.text('Problem Solving 101 - Your Learning Journal', margin, yPosition)
      yPosition += 15

      // User info
      doc.setFontSize(12)
      doc.setTextColor(60)
      doc.text(`Student: ${user.name}`, margin, yPosition)
      yPosition += 7
      doc.text(`Completed: ${new Date().toLocaleDateString()}`, margin, yPosition)
      yPosition += 15

      // Divider
      doc.setDrawColor(33, 69, 87)
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 15

      // Get all answers
      const allAnswers = user.answers || {}
      let hasContent = false

      // Loop through modules and activities
      for (const module of courseModules) {
        let moduleContent: {
          activityTitle: string
          questions: { question: string; answer: string }[]
          additionalNotes: string
        }[] = []

        for (const activity of module.activities) {
          const activityAnswers = allAnswers[activity.id] || {}
          const additionalNotes = user.notes?.[activity.id] || ''

          // Check if activity has any content (answers or notes)
          const hasAnswers = activity.discussionQuestions?.some(q => activityAnswers[q.id]?.trim())
          const hasNotes = additionalNotes.trim()

          if (hasAnswers || hasNotes) {
            hasContent = true
            const questions: { question: string; answer: string }[] = []

            // Collect questions and answers
            if (activity.discussionQuestions) {
              for (const q of activity.discussionQuestions.sort((a, b) => a.order - b.order)) {
                const answer = activityAnswers[q.id] || ''
                if (answer.trim()) {
                  questions.push({
                    question: q.question,
                    answer: answer
                  })
                }
              }
            }

            moduleContent.push({
              activityTitle: activity.title,
              questions,
              additionalNotes
            })
          }
        }

        // If module has content, add to PDF
        if (moduleContent.length > 0) {
          checkPageBreak(40)

          // Module title with background
          doc.setFillColor(33, 69, 87)
          doc.rect(margin, yPosition - 5, pageWidth - margin * 2, 12, 'F')
          doc.setFontSize(14)
          doc.setTextColor(255, 255, 255)
          doc.text(module.title, margin + 5, yPosition + 3)
          yPosition += 15

          for (const { activityTitle, questions, additionalNotes } of moduleContent) {
            checkPageBreak(30)

            // Activity title
            doc.setFontSize(12)
            doc.setTextColor(33, 69, 87)
            doc.text(activityTitle, margin, yPosition)
            yPosition += 8

            // Questions and answers
            for (const { question, answer } of questions) {
              checkPageBreak(25)

              // Question
              doc.setFontSize(10)
              doc.setTextColor(80)
              const splitQuestion = doc.splitTextToSize(`Q: ${question}`, pageWidth - margin * 2 - 5)
              for (const line of splitQuestion) {
                checkPageBreak(10)
                doc.text(line, margin + 5, yPosition)
                yPosition += 5
              }
              yPosition += 2

              // Answer
              doc.setFontSize(10)
              doc.setTextColor(40)
              const splitAnswer = doc.splitTextToSize(`A: ${answer}`, pageWidth - margin * 2 - 10)
              for (const line of splitAnswer) {
                checkPageBreak(10)
                doc.text(line, margin + 10, yPosition)
                yPosition += 5
              }
              yPosition += 5
            }

            // Additional notes
            if (additionalNotes.trim()) {
              checkPageBreak(20)
              doc.setFontSize(10)
              doc.setTextColor(100)
              doc.text('Additional Notes:', margin + 5, yPosition)
              yPosition += 5

              doc.setTextColor(60)
              const splitNotes = doc.splitTextToSize(additionalNotes, pageWidth - margin * 2 - 10)
              for (const line of splitNotes) {
                checkPageBreak(10)
                doc.text(line, margin + 10, yPosition)
                yPosition += 5
              }
              yPosition += 5
            }

            yPosition += 5
          }

          yPosition += 10
        }
      }

      if (!hasContent) {
        doc.setFontSize(12)
        doc.setTextColor(100)
        doc.text('No responses were recorded during the course.', margin, yPosition)
        yPosition += 10
        doc.text('Consider retaking activities and answering the discussion questions!', margin, yPosition)
      }

      // Add Quiz Scores Section
      checkPageBreak(60)
      yPosition += 10

      // Quiz Scores Header
      doc.setFillColor(33, 69, 87)
      doc.rect(margin, yPosition - 5, pageWidth - margin * 2, 12, 'F')
      doc.setFontSize(14)
      doc.setTextColor(255, 255, 255)
      doc.text('Quiz Scores', margin + 5, yPosition + 3)
      yPosition += 20

      // Get quiz scores from user progress
      const quizActivities = courseModules.flatMap(module =>
        module.activities.filter(a => a.type === 'quiz').map(a => ({
          ...a,
          moduleTitle: module.title
        }))
      )

      let hasQuizScores = false
      for (const quiz of quizActivities) {
        const progress = user.progress[quiz.id]
        if (progress?.completed && progress?.score !== undefined) {
          hasQuizScores = true
          checkPageBreak(15)

          doc.setFontSize(11)
          doc.setTextColor(60)
          const scoreColor = progress.score >= 80 ? [34, 197, 94] : progress.score >= 60 ? [245, 158, 11] : [239, 68, 68]
          doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
          doc.text(`${quiz.moduleTitle}: ${progress.score}%`, margin + 5, yPosition)
          yPosition += 8
        }
      }

      if (!hasQuizScores) {
        doc.setFontSize(10)
        doc.setTextColor(100)
        doc.text('No quiz scores recorded.', margin + 5, yPosition)
        yPosition += 10
      }

      // Footer on all pages
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(9)
        doc.setTextColor(150)
        doc.text(
          `Page ${i} of ${pageCount} | Service Physics Problem Solving 101`,
          pageWidth / 2,
          290,
          { align: 'center' }
        )
      }

      // Save the PDF
      doc.save(`Service-Physics-Journal-${user.name.replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('There was an error generating your PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image
              src="/images/sp-logo.png"
              alt="Service Physics"
              width={80}
              height={80}
              className="rounded-2xl shadow-xl"
            />
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-xl animate-bounce">
              <span className="text-5xl">🎉</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isFullyComplete ? 'Congratulations' : 'Great Progress'}, {user.name}!
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isFullyComplete ? (
              <>You've completed <span className="font-semibold text-teal-700">Service Physics Problem Solving 101</span>! You're now equipped with powerful tools to tackle challenges systematically.</>
            ) : (
              <>You've made excellent progress on <span className="font-semibold text-teal-700">Service Physics Problem Solving 101</span>! Complete the remaining activities to finish the course.</>
            )}
          </p>
        </div>

        {/* Achievement Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-emerald-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Course Complete!</h2>
              <p className="text-gray-600">All 7 modules mastered</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-700">7</div>
              <div className="text-sm text-gray-600">Modules</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-700">31</div>
              <div className="text-sm text-gray-600">Activities</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
              <div className={`text-3xl font-bold ${isFullyComplete ? 'text-purple-700' : 'text-amber-600'}`}>{progressPercent}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          {/* Key Skills */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Skills You've Developed:</h3>
            <div className="flex flex-wrap gap-2">
              {['Improvement Kata', 'A3 Thinking', '5 Whys', 'ERACS Method', 'Value Stream Mapping', 'Problem Definition', 'Experiment Design'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-teal-700 border border-teal-200">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">📥 Download Your Materials</h2>
          <p className="text-gray-600 mb-6">Take your learning with you! Download your notes and the ERACS worksheet.</p>

          <div className="space-y-4">
            <button
              onClick={generateNotesPDF}
              disabled={isGeneratingPDF}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download My Learning Journal (PDF)</span>
                </>
              )}
            </button>

            <a
              href="/templates/eracs-practice-worksheet.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-teal-600 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Open ERACS Practice Worksheet (Print to PDF)</span>
            </a>

            <a
              href="/pdfs/Service-Physics-Glossary.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Download Glossary & Common Language (PDF)</span>
            </a>
          </div>
        </div>

        {/* Schedule Coaching Session */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <span className="text-3xl">📅</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">One Last Step!</h2>
              <p className="text-primary-100">
                Schedule a coaching session with Brian or Steve to discuss what you've learned and how to apply it in your work.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3">In your session, you'll:</h3>
            <ul className="space-y-2 text-primary-100">
              <li className="flex items-start gap-2">
                <span className="text-white">✓</span>
                Review your key learnings and notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white">✓</span>
                Discuss how to apply these concepts to real problems
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white">✓</span>
                Get personalized guidance on your next steps
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white">✓</span>
                Ask questions and deepen your understanding
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-4">
              Reach out to <span className="font-semibold text-primary-700">Brian</span> or <span className="font-semibold text-primary-700">Steve</span> to schedule your coaching session.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:brian@servicephysics.com?subject=Course%20Complete%20-%20Ready%20for%20Coaching%20Session"
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Brian</span>
              </a>
              <a
                href="mailto:steve@servicephysics.com?subject=Course%20Complete%20-%20Ready%20for%20Coaching%20Session"
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Steve</span>
              </a>
            </div>
          </div>

          <p className="text-center text-primary-200 text-sm mt-6">
            💡 Pro tip: Download your notes before your session so you can reference them!
          </p>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
