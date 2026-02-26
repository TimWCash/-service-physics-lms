'use client'

import React, { useState } from 'react'
import { CourseModule } from '@/data/courseDataV3'
import ActivityCard from './ActivityCard'
import CoachingPrepCard from './CoachingPrepCard'
import DeepDiveResourcesCard from './DeepDiveResourcesCard'

interface Props {
  module: CourseModule
  initialTab?: 'overview' | 'dive_in' | 'recap'
}

const tabs = [
  { key: 'overview', label: 'Overview', number: 1 },
  { key: 'dive_in', label: "Let's Practice", number: 2 },
  { key: 'recap', label: 'Coaching Moment', number: 3 },
] as const

export default function ThreeColumnLayout({ module, initialTab = 'overview' }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'dive_in' | 'recap'>(initialTab)

  const overviewSections = module.sections.filter(s => s.columnType === 'overview').sort((a, b) => a.order - b.order)
  const diveInSections = module.sections.filter(s => s.columnType === 'dive_in').sort((a, b) => a.order - b.order)
  const recapSections = module.sections.filter(s => s.columnType === 'recap').sort((a, b) => a.order - b.order)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Journey Stepper Navigation */}
      <nav className="flex items-center mb-10" role="tablist">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.key}>
            {/* Connector line */}
            {index > 0 && (
              <div className="flex-1 h-px bg-surface-200 mx-3" />
            )}
            <button
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap font-sans ${
                activeTab === tab.key
                  ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200'
                  : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-100 text-surface-500'
              }`}>
                {tab.number}
              </span>
              {tab.label}
            </button>
          </React.Fragment>
        ))}
      </nav>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {overviewSections.length === 0 && (
            <div className="card p-8 text-center text-surface-500 font-sans">
              <p>No overview content for this module yet.</p>
            </div>
          )}
          {overviewSections.map(section => (
            <div key={section.id} className="bg-white rounded-lg border border-surface-200 overflow-hidden">
              <div className="border-l-4 border-primary-400 p-6 lg:p-8">
                {section.sectionTitle && (
                  <h3 className="text-xl font-display text-surface-800 mb-4">{section.sectionTitle}</h3>
                )}
                <div
                  className="prose prose-sm prose-surface max-w-none prose-headings:font-display prose-headings:text-surface-800 prose-p:text-surface-600 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:border prose-img:border-surface-200"
                  dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                />
              </div>
            </div>
          ))}

          {/* Next step prompt */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setActiveTab('dive_in')}
              className="btn-primary flex items-center gap-2 font-sans"
            >
              <span>Continue to Activities</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'dive_in' && (
        <div className="space-y-6 animate-fade-in">
          {diveInSections.map(section => (
            <div key={section.id} className="bg-primary-50/40 rounded-lg border border-primary-100 p-6 lg:p-8">
              {section.sectionTitle && (
                <h3 className="text-xl font-display text-surface-800 mb-4">{section.sectionTitle}</h3>
              )}
              <div
                className="prose prose-sm prose-surface max-w-none prose-headings:font-display prose-headings:text-surface-800 prose-p:text-surface-600 prose-a:text-primary-600 prose-img:rounded-lg prose-img:border prose-img:border-surface-200"
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
              />
            </div>
          ))}

          {/* Activity Cards */}
          <div className="space-y-3">
            {module.activities.map(activity => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                moduleId={module.id}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className="btn-secondary flex items-center gap-2 font-sans"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back to Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('recap')}
              className="btn-primary flex items-center gap-2 font-sans"
            >
              <span>Coaching Moment</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'recap' && (
        <div className="space-y-6 animate-fade-in">
          {recapSections.map(section => (
            <div key={section.id} className="bg-accent-50/40 rounded-lg border border-accent-100 p-6 lg:p-8">
              {section.sectionTitle && (
                <h3 className="text-xl font-display text-surface-800 mb-4">{section.sectionTitle}</h3>
              )}
              <div
                className="prose prose-sm prose-surface max-w-none prose-headings:font-display prose-headings:text-surface-800 prose-p:text-surface-600 prose-a:text-primary-600 prose-img:rounded-lg prose-img:border prose-img:border-surface-200"
                dangerouslySetInnerHTML={{ __html: section.contentHtml }}
              />
            </div>
          ))}

          <CoachingPrepCard coachingPrep={module.coachingPrep} />

          {module.deepDiveResources && module.deepDiveResources.length > 0 && (
            <DeepDiveResourcesCard resources={module.deepDiveResources} />
          )}

          {/* Navigation */}
          <div className="flex justify-start pt-4">
            <button
              onClick={() => setActiveTab('dive_in')}
              className="btn-secondary flex items-center gap-2 font-sans"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back to Activities</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
