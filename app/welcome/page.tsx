'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AuthService } from '@/lib/auth'

export default function WelcomePage() {
  const router = useRouter()

  useEffect(() => {
    const user = AuthService.getUser()
    if (!user) {
      router.push('/')
    }
  }, [router])

  const objectives = [
    'Understand the steps in the Improvement Kata',
    'Understand and apply the PDCA cycle',
    'Understand and apply the Cynefin Framework for classifying problems',
    'Be familiar with problem-solving visualization tools, such as an A3 and Experiment Plan',
    'Understand the problem funnel and apply the 5 Whys to identify a problem\'s root cause',
    'Explain the difference between leading and lagging indicators and provide examples',
    'Define "work" and "waste"',
    'Identify the 7 Wastes in everyday life',
    'Understand how to visualize motion waste and generate a spaghetti diagram',
    'Define what a problem is',
    'Draft a target condition',
    'Formulate a problem statement',
  ]

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/sp-logo.png"
                alt="Service Physics"
                width={44}
                height={44}
                className="rounded-xl"
              />
              <div>
                <h1 className="text-2xl font-display text-surface-800">
                  Welcome to Service Physics Bootcamp
                </h1>
                <p className="text-surface-500 text-sm font-sans">Problem Solving 101</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="btn-primary"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary-700 rounded-lg p-10 text-white">
          <div className="flex items-start gap-5 mb-8">
            <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-display mb-4">Welcome!</h2>
              <p className="text-lg leading-relaxed text-primary-100 font-sans">
                We&apos;re excited you are joining us to further develop your problem-solving skills. Problem solving is a foundational, core capability for Service Physics practitioners. We use problem solving every day in partnership with our clients to drive meaningful, positive change.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <p className="text-lg leading-relaxed text-primary-100 font-sans">
              This training will equip you with the Service Physics&apos; approach to problem solving as well as handy problem solving tools. Service Physics adopts a continuous improvement culture and our problem-solving methodology is rooted in Lean thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        <div className="bg-white rounded-lg border border-surface-200 overflow-hidden">
          <div className="bg-surface-800 px-8 py-6">
            <h3 className="text-2xl font-display text-white flex items-center gap-3">
              <svg className="w-6 h-6 text-surface-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Learning Objectives
            </h3>
            <p className="text-surface-400 mt-1 font-sans">After this training, you will be able to:</p>
          </div>

          <div className="p-8">
            <ul className="space-y-4">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 font-sans">
                    {index + 1}
                  </span>
                  <span className="text-surface-600 text-base leading-relaxed font-sans">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-accent-600 rounded-lg p-10 text-center text-white">
          <svg className="w-10 h-10 text-white/80 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
          <h2 className="text-3xl font-display mb-3">Ready to Begin?</h2>
          <p className="text-lg mb-8 text-accent-100 font-sans">
            Start your journey through 7 comprehensive modules designed to transform your problem-solving skills.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-accent-700 rounded-lg hover:bg-surface-50 transition-colors font-semibold text-lg font-sans"
          >
            <span>Start Learning</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
