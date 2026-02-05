'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
    {
      title: 'Understanding the Improvement Kata',
      icon: '🔄',
      tips: [
        { label: 'Break it Down', text: 'Familiarize yourself with each step of the Improvement Kata. Create a flowchart to visualize the process.' },
        { label: 'Practice Scenarios', text: 'Apply the Improvement Kata steps to hypothetical scenarios to solidify your understanding.' }
      ]
    },
    {
      title: 'Applying the PDCA Cycle',
      icon: '♻️',
      tips: [
        { label: 'Real-Life Application', text: 'Choose a personal project and apply the PDCA (Plan-Do-Check-Act) cycle to see its effectiveness in action.' },
        { label: 'Group Discussions', text: 'Engage with peers to share experiences using the PDCA cycle and learn different perspectives.' }
      ]
    },
    {
      title: 'Exploring the Cynefin Framework',
      icon: '🗺️',
      tips: [
        { label: 'Case Studies', text: 'Look for case studies that illustrate the use of the Cynefin Framework. Analyze how problems were classified and managed.' },
        { label: 'Mind Mapping', text: 'Create a mind map to connect different types of problems with their respective handling strategies.' }
      ]
    },
    {
      title: 'Utilizing Problem-Solving Visualization Tools',
      icon: '📊',
      tips: [
        { label: 'Hands-On Practice', text: 'Use an A3 template to document a real problem you\'re facing. This will help you become familiar with the format.' },
        { label: 'Experiment Plans', text: 'Draft an Experiment Plan for a small-scale experiment related to your interests or work tasks.' }
      ]
    },
    {
      title: 'Implementing the 5 Whys Technique',
      icon: '❓',
      tips: [
        { label: 'Root Cause Analysis', text: 'Pick a recurring issue in your life and practice asking "Why?" five times to uncover the root cause.' },
        { label: 'Collaborative Sessions', text: 'Conduct a 5 Whys session with colleagues to tackle a shared challenge.' }
      ]
    },
    {
      title: 'Differentiating Leading and Lagging Indicators',
      icon: '📈',
      tips: [
        { label: 'Create Examples', text: 'List out examples of leading and lagging indicators from different fields (business, health, etc.) to better grasp the concepts.' },
        { label: 'Visualization', text: 'Use charts to visually represent how leading indicators can predict outcomes while lagging ones reflect past performance.' }
      ]
    },
    {
      title: 'Defining Work and Waste',
      icon: '⚙️',
      tips: [
        { label: 'Reflection Exercise', text: 'Keep a daily log of activities to identify what constitutes work versus waste in your routine.' },
        { label: 'Discussion Groups', text: 'Discuss with classmates the implications of work and waste in various contexts.' }
      ]
    },
    {
      title: 'Identifying the 7 Wastes',
      icon: '🗑️',
      tips: [
        { label: 'Daily Challenge', text: 'Challenge yourself to spot all 7 Wastes in your daily environment and brainstorm ways to eliminate them.' },
        { label: 'Team Workshops', text: 'Organize workshops where teams identify wastes in processes they manage.' }
      ]
    },
    {
      title: 'Visualizing Motion Waste',
      icon: '🍝',
      tips: [
        { label: 'Spaghetti Diagram Creation', text: 'Take a process you are involved in and create a spaghetti diagram to visualize inefficiencies in motion.' },
        { label: 'Feedback Session', text: 'Share your findings with peers and gather feedback on how to improve motion efficiency.' }
      ]
    },
    {
      title: 'Defining a Problem',
      icon: '🎯',
      tips: [
        { label: 'Personal Definition', text: 'Write down your own definition of what constitutes a problem and compare it with course material.' },
        { label: 'Problem Classification', text: 'Classify different issues you encounter into types based on the frameworks you\'ve learned.' }
      ]
    },
    {
      title: 'Drafting a Target Condition',
      icon: '🎪',
      tips: [
        { label: 'Goal Setting', text: 'Identify a goal in your work or personal life and draft a clear target condition that outlines the desired outcome.' },
        { label: 'Peer Review', text: 'Share your target condition draft with peers for constructive criticism and refinement.' }
      ]
    },
    {
      title: 'Formulating a Problem Statement',
      icon: '📝',
      tips: [
        { label: 'Practice Templates', text: 'Use templates provided during the course to practice drafting concise and effective problem statements.' },
        { label: 'Feedback Loop', text: 'Present your problem statements to classmates for feedback and suggestions for improvement.' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Welcome to Problem Solving
              </h1>
              <p className="text-gray-600 mt-1">Your journey to mastering the art of problem solving starts here</p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              Go to Dashboard →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-12 text-white shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">🎓</div>
            <div>
              <h2 className="text-4xl font-bold mb-2">Course Objectives</h2>
              <p className="text-primary-100 text-lg">
                As you embark on this training, here are some effective tips and tricks to help you learn and internalize the course objectives.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-lg leading-relaxed">
              By utilizing these tips and tricks, you will be well-equipped to achieve the objectives of the course and enhance your learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{objective.icon}</div>
                  <h3 className="text-xl font-bold">{objective.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {objective.tips.map((tip, tipIndex) => (
                  <div
                    key={tipIndex}
                    className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-lg p-4 border border-primary-100"
                  >
                    <h4 className="font-bold text-primary-700 mb-2 flex items-center gap-2">
                      <span className="text-lg">💡</span>
                      {tip.label}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-xl mb-8 text-accent-100">
            Start your journey through 7 comprehensive modules designed to transform your problem-solving skills.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-accent-600 rounded-xl hover:bg-gray-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <span>Start Learning</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-6 text-accent-100">
            ✨ <strong>Happy learning!</strong> ✨
          </p>
        </div>
      </section>
    </div>
  )
}
