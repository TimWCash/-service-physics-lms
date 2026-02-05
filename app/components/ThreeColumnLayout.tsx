'use client'

import { CourseModule } from '@/data/courseDataV3'
import ActivityCard from './ActivityCard'
import CoachingPrepCard from './CoachingPrepCard'
import DeepDiveResourcesCard from './DeepDiveResourcesCard'

interface Props {
  module: CourseModule
}

export default function ThreeColumnLayout({ module }: Props) {
  const overviewSections = module.sections.filter(s => s.columnType === 'overview').sort((a, b) => a.order - b.order)
  const diveInSections = module.sections.filter(s => s.columnType === 'dive_in').sort((a, b) => a.order - b.order)
  const recapSections = module.sections.filter(s => s.columnType === 'recap').sort((a, b) => a.order - b.order)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* OVERVIEW COLUMN */}
      <div className="space-y-6">
        <div className="sticky top-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">1</span>
            OVERVIEW
          </h2>
        </div>

        {overviewSections.map(section => (
          <div key={section.id} className="card p-6">
            {section.sectionTitle && (
              <h3 className="text-lg font-semibold mb-4 text-gray-900">{section.sectionTitle}</h3>
            )}
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />
          </div>
        ))}
      </div>

      {/* DIVE IN COLUMN */}
      <div className="space-y-6">
        <div className="sticky top-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
            DIVE IN
          </h2>
        </div>

        {diveInSections.map(section => (
          <div key={section.id} className="card p-6">
            {section.sectionTitle && (
              <h3 className="text-lg font-semibold mb-4 text-gray-900">{section.sectionTitle}</h3>
            )}
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />
          </div>
        ))}

        {/* Activity Cards */}
        <div className="space-y-4">
          {module.activities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              moduleId={module.id}
            />
          ))}
        </div>
      </div>

      {/* RECAP COLUMN */}
      <div className="space-y-6">
        <div className="sticky top-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-10 h-10 bg-accent-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
            RECAP
          </h2>
        </div>

        {recapSections.map(section => (
          <div key={section.id} className="card p-6">
            {section.sectionTitle && (
              <h3 className="text-lg font-semibold mb-4 text-gray-900">{section.sectionTitle}</h3>
            )}
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />
          </div>
        ))}

        <CoachingPrepCard coachingPrep={module.coachingPrep} />

        {module.deepDiveResources && module.deepDiveResources.length > 0 && (
          <DeepDiveResourcesCard resources={module.deepDiveResources} />
        )}
      </div>
    </div>
  )
}
