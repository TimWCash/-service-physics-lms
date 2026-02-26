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
          const hasAnswers = activity.discussionQuestions?.some(q => {
            const answer = activityAnswers[q.id]
            return typeof answer === 'string' && answer.trim()
          })
          const hasNotes = additionalNotes.trim()

          if (hasAnswers || hasNotes) {
            hasContent = true
            const questions: { question: string; answer: string }[] = []

            // Collect questions and answers
            if (activity.discussionQuestions) {
              for (const q of activity.discussionQuestions.sort((a, b) => a.order - b.order)) {
                const answer = activityAnswers[q.id]
                const answerStr = typeof answer === 'string' ? answer : ''
                if (answerStr.trim()) {
                  questions.push({
                    question: q.question,
                    answer: answerStr
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
    <div className="min-h-screen bg-surface-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image
              src="/images/sp-logo.png"
              alt="Service Physics"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
            <div className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full">
              <svg className="w-10 h-10 text-success-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display text-surface-800 mb-4">
            {isFullyComplete ? 'Congratulations' : 'Great Progress'}, {user.name}!
          </h1>

          <p className="text-lg text-surface-600 max-w-2xl mx-auto font-sans">
            {isFullyComplete ? (
              <>You&apos;ve completed <span className="font-semibold text-primary-700">Service Physics Problem Solving 101</span>! You&apos;re now equipped with powerful tools to tackle challenges systematically.</>
            ) : (
              <>You&apos;ve made excellent progress on <span className="font-semibold text-primary-700">Service Physics Problem Solving 101</span>! Complete the remaining activities to finish the course.</>
            )}
          </p>
        </div>

        {/* Schedule Session with Principal - TOP CTA */}
        <div className="bg-primary-700 rounded-lg border border-primary-600 p-8 mb-8 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-display mb-2">Schedule Your Session</h2>
              <p className="text-primary-200 font-sans">
                Connect with Brian or Steve to discuss what you&apos;ve learned and how to apply it in your work.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3 font-sans">In your session, you&apos;ll:</h3>
            <ul className="space-y-2 text-primary-200 font-sans text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Review your key learnings and notes
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Discuss how to apply these concepts to real problems
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Get personalized guidance on your next steps
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Ask questions and deepen your understanding
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-surface-700 mb-4 font-sans">
              Contact <span className="font-semibold text-primary-700">Maria</span> to schedule time with Brian or Steve to discuss your progress.
            </p>
            <a
              href="mailto:maria@servicephysics.com?subject=Problem%20Solving%20101%20Complete%20-%20Request%20Coaching%20Session&body=Hi%20Maria%2C%0A%0AI%20have%20completed%20the%20Problem%20Solving%20101%20course%20and%20would%20like%20to%20schedule%20a%20coaching%20session%20with%20Brian%20or%20Steve.%0A%0APlease%20let%20me%20know%20the%20available%20times.%0A%0AThank%20you!"
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Maria to Schedule</span>
            </a>
          </div>
        </div>

        {/* Achievement Card */}
        <div className="bg-white rounded-lg border border-surface-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-accent-100 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-accent-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m4.162-6.492C16.27 2.41 14.016 2.25 12 2.25c-2.016 0-4.27.16-6.468.47" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-display text-surface-800">{isFullyComplete ? 'Course Complete!' : 'Great Progress!'}</h2>
              <p className="text-surface-500 font-sans">{isFullyComplete ? 'All 7 modules mastered' : `${completedCount} of ${totalActivities} activities completed`}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-primary-50 rounded-lg p-4 text-center border border-primary-100">
              <div className="text-3xl font-bold text-primary-700 font-sans">7</div>
              <div className="text-sm text-surface-500 font-sans">Modules</div>
            </div>
            <div className="bg-success-50 rounded-lg p-4 text-center border border-success-100">
              <div className="text-3xl font-bold text-success-700 font-sans">{completedCount}</div>
              <div className="text-sm text-surface-500 font-sans">Completed</div>
            </div>
            <div className="bg-accent-50 rounded-lg p-4 text-center border border-accent-100">
              <div className={`text-3xl font-bold font-sans ${isFullyComplete ? 'text-accent-700' : 'text-accent-600'}`}>{progressPercent}%</div>
              <div className="text-sm text-surface-500 font-sans">Progress</div>
            </div>
          </div>

          {/* Key Skills */}
          <div className="bg-surface-50 rounded-lg p-6">
            <h3 className="font-semibold text-surface-800 mb-3 font-sans text-sm">Skills You&apos;ve Developed:</h3>
            <div className="flex flex-wrap gap-2">
              {['Improvement Kata', 'A3 Thinking', '5 Whys', 'ERACS Method', 'Value Stream Mapping', 'Problem Definition', 'Experiment Design'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-primary-700 border border-primary-200 font-sans">
                  <svg className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-white rounded-lg border border-surface-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-surface-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <h2 className="text-2xl font-display text-surface-800">Download Your Materials</h2>
          </div>
          <p className="text-surface-500 mb-6 font-sans">Take your learning with you! Download your notes and the ERACS worksheet.</p>

          <div className="space-y-3">
            <button
              onClick={generateNotesPDF}
              disabled={isGeneratingPDF}
              className="w-full btn-primary flex items-center justify-center gap-3 px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-full btn-secondary flex items-center justify-center gap-3 px-6 py-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Open ERACS Practice Worksheet (Print to PDF)</span>
            </a>

            <a
              href="/pdfs/Service-Physics-Glossary.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-surface-200 text-surface-700 font-semibold rounded-lg hover:bg-surface-50 transition-colors font-sans"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Download Glossary & Common Language (PDF)</span>
            </a>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-surface-500 hover:text-surface-700 font-medium transition-colors font-sans"
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
