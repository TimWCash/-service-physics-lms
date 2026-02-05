# Service Physics LMS V3 Implementation Guide

## Overview
This guide outlines the complete implementation of the 7-module LMS structure with 3-column layout based on the specification documents.

## Current Status

### ✅ Completed
1. **Database Schema V3** (`supabase-schema-v3.sql`)
   - Added tables: module_sections, discussion_questions, coaching_prep, deep_dive_resources
   - All indexes and constraints in place
   - Ready to apply to Supabase

2. **Course Data V3 Started** (`data/courseDataV3.ts`)
   - New TypeScript interfaces defined
   - Module 1 fully implemented as template
   - Original data backed up to `courseData.backup.ts`

### 🔨 Next Steps

## Phase 1: Complete Data Structure (Est. 4-6 hours)

### 1.1 Add Remaining Modules to courseDataV3.ts

Copy the Module 1 structure and adapt for each module:

**Module 2: Our Problem Solving Tools** (1h 50m)
- Activities: Good Coach Bad Coach, Clarifying 5 Whys, Hot Dog Plant
- Overview: A3 template, Experiment Plan, 5 Whys, Effort Impact Matrix diagrams
- Coaching Prep: 2 discussion questions about A3s and 5 Whys

**Module 3: Identifying Problems** (1h 45m) - NEW
- Activities: SP 101 w. Steve, Burgers video, MOD case study, Spaghetti Mapping practice
- Overview: 7 Wastes, Work vs Waste, Going to See diagrams
- Coaching Prep: Questions about waste identification

**Module 4: Defining Problems** (1h 50m) - NEW
- Activities: Moneyball clip, Panda w. Dana, Problem statement practice
- Overview: Gap diagram, Problem statement template, Target definition
- Coaching Prep: Write personal problem statement

**Module 5: Experiment to Learn** (45m) - NEW
- Activities: Point Kaizen w. Jeremy, ERACS at Peet's
- Overview: Experiment Plan, Work Stories, ERACS diagram
- Coaching Prep: Kaizen experience discussion

**Module 6: Measure** (45m) - NEW
- Activities: Experiment Plan w. Kelly, How to Talk to Humans reading
- Overview: Results review template, Feedback capture
- Coaching Prep: Facts vs opinions discussion

**Module 7: Evaluation & Continuous Improvement** (35m) - NEW
- Activities: F1 Pit Stops video, Boeing failures article
- Overview: PDCA cycle, Anatomy of Improvement tree
- Coaching Prep: Continuous improvement culture

### 1.2 Content Template for Each Module

```typescript
const module{N}: CourseModule = {
  id: 'module-{N}',
  title: '{Module Title}',
  colorHex: '{Color from spec}',
  timeEstimateMinutes: {minutes},
  order: {N},
  accessLevel: 'free',

  sections: [
    // 3-5 overview sections with diagrams
    // 1 dive-in intro section
    // 2-3 recap sections (coaching prep, glossary, knowledge check)
  ],

  activities: [
    // Each activity with discussionQuestions array
  ],

  coachingPrep: {
    discussionQuestions: [...],
    knowledgeCheckUrl: '/knowledge-check/module-{N}',
    glossaryNote: '...'
  },

  deepDiveResources: [
    // Read and Watch resources
  ]
};
```

## Phase 2: UI Components (Est. 3-4 hours)

### 2.1 Create ThreeColumnLayout Component

**File:** `app/components/ThreeColumnLayout.tsx`

```typescript
'use client'

import { CourseModule } from '@/data/courseDataV3'

interface Props {
  module: CourseModule
}

export default function ThreeColumnLayout({ module }: Props) {
  const overviewSections = module.sections.filter(s => s.columnType === 'overview')
  const diveInSections = module.sections.filter(s => s.columnType === 'dive_in')
  const recapSections = module.sections.filter(s => s.columnType === 'recap')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* OVERVIEW COLUMN */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. OVERVIEW</h2>
        {overviewSections.map(section => (
          <div key={section.id} className="card p-6">
            <h3 className="text-lg font-semibold mb-3">{section.sectionTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: section.contentHtml }} />
          </div>
        ))}
      </div>

      {/* DIVE IN COLUMN */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DIVE IN</h2>
        {diveInSections.map(section => (
          <div key={section.id} className="card p-6">
            <h3 className="text-lg font-semibold mb-3">{section.sectionTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: section.contentHtml }} />
          </div>
        ))}

        {/* Activity Cards */}
        <div className="space-y-4">
          {module.activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} moduleId={module.id} />
          ))}
        </div>
      </div>

      {/* RECAP COLUMN */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. RECAP</h2>
        {recapSections.map(section => (
          <div key={section.id} className="card p-6">
            <h3 className="text-lg font-semibold mb-3">{section.sectionTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: section.contentHtml }} />
          </div>
        ))}

        <CoachingPrepCard coachingPrep={module.coachingPrep} />
        <DeepDiveResourcesCard resources={module.deepDiveResources} />
      </div>
    </div>
  )
}
```

### 2.2 Create ActivityCard Component

**File:** `app/components/ActivityCard.tsx`

```typescript
'use client'

import { LearningActivity } from '@/data/courseDataV3'
import Link from 'next/link'

interface Props {
  activity: LearningActivity
  moduleId: string
}

export default function ActivityCard({ activity, moduleId }: Props) {
  const getTypeIcon = (type: string) => {
    const icons = {
      video: '🎥',
      audio: '🎧',
      reading: '📖',
      practice: '✏️',
      quiz: '✅'
    }
    return icons[type] || '📄'
  }

  return (
    <Link href={`/course/${moduleId}/${activity.id}`}>
      <div className="activity-card p-4 hover:shadow-soft-lg transition-all cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          {activity.thumbnailUrl && (
            <img
              src={activity.thumbnailUrl}
              alt={activity.title}
              className="w-24 h-24 object-cover rounded"
            />
          )}

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getTypeIcon(activity.type)}</span>
              <span className="text-sm font-semibold text-gray-600 uppercase">{activity.type}</span>
              {activity.duration && (
                <span className="text-sm text-gray-500">• {activity.duration} min</span>
              )}
            </div>

            <h4 className="font-bold text-lg mb-2">{activity.title}</h4>

            {activity.description && (
              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
            )}

            {/* Discussion Questions Preview */}
            {activity.discussionQuestions && activity.discussionQuestions.length > 0 && (
              <div className="text-xs text-gray-500">
                💭 {activity.discussionQuestions.length} discussion questions
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
```

### 2.3 Create DiscussionQuestions Component

**File:** `app/components/DiscussionQuestions.tsx`

```typescript
'use client'

import { DiscussionQuestion } from '@/data/courseDataV3'

interface Props {
  questions: DiscussionQuestion[]
}

export default function DiscussionQuestions({ questions }: Props) {
  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-bold">Discussion Questions</h3>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="font-semibold text-gray-900 mb-2">
              {index + 1}. {q.question}
            </p>
          </div>
        ))}
      </div>

      {/* Reflection Area */}
      <div className="mt-6 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-8 h-8 text-yellow-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <div>
            <h4 className="font-bold text-yellow-900 mb-2">What other observations and questions do you have?</h4>
            <p className="text-sm text-yellow-800">Use this space to reflect on what you learned and note any additional questions for your coach.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 2.4 Create CoachingPrepCard Component

**File:** `app/components/CoachingPrepCard.tsx`

```typescript
'use client'

import { CoachingPrep } from '@/data/courseDataV3'

interface Props {
  coachingPrep: CoachingPrep
}

export default function CoachingPrepCard({ coachingPrep }: Props) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-bold">Discussion Questions for Your Coach</h3>
      </div>

      <div className="space-y-3">
        {coachingPrep.discussionQuestions.map((question, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded border-l-4 border-primary-500">
            <p className="text-gray-900">{question}</p>
          </div>
        ))}
      </div>

      {coachingPrep.knowledgeCheckUrl && (
        <div className="mt-6">
          <a
            href={coachingPrep.knowledgeCheckUrl}
            className="btn-primary w-full text-center"
          >
            Complete Post-Module Knowledge Check →
          </a>
        </div>
      )}
    </div>
  )
}
```

### 2.5 Create DeepDiveResourcesCard Component

**File:** `app/components/DeepDiveResourcesCard.tsx`

```typescript
'use client'

import { DeepDiveResource } from '@/data/courseDataV3'

interface Props {
  resources: DeepDiveResource[]
}

export default function DeepDiveResourcesCard({ resources }: Props) {
  const readResources = resources.filter(r => r.type === 'read')
  const watchResources = resources.filter(r => r.type === 'watch')

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold mb-4">Deep Dive Resources</h3>
      <p className="text-sm text-gray-600 mb-6">
        Here are some additional resources related to the topics in this module for further exploration.
      </p>

      {readResources.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <span>📚</span> Read
          </h4>
          <div className="space-y-3">
            {readResources.map(resource => (
              <a
                key={resource.id}
                href={resource.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 p-4 rounded hover:bg-gray-100 transition"
              >
                <div className="flex gap-3">
                  {resource.thumbnailUrl && (
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h5 className="font-semibold">{resource.title}</h5>
                    {resource.description && (
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {watchResources.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <span>🎥</span> Watch
          </h4>
          <div className="space-y-3">
            {watchResources.map(resource => (
              <a
                key={resource.id}
                href={resource.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 p-4 rounded hover:bg-gray-100 transition"
              >
                <div className="flex gap-3">
                  {resource.thumbnailUrl && (
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h5 className="font-semibold">{resource.title}</h5>
                    {resource.description && (
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## Phase 3: Update Pages (Est. 2-3 hours)

### 3.1 Update Dashboard (`app/dashboard/page.tsx`)

Replace section-based rendering with module-based:

```typescript
import { courseModules } from '@/data/courseDataV3'

// ... existing code ...

{courseModules.map((module) => (
  <div key={module.id} className="mb-8">
    <div
      className="section-header p-4"
      style={{ backgroundColor: module.colorHex }}
    >
      <h2 className="text-xl font-bold text-white">{module.title}</h2>
      <span className="text-sm text-white/80">
        {module.timeEstimateMinutes} minutes • {module.activities.length} activities
      </span>
    </div>

    <div className="space-y-2">
      {module.activities.map((activity) => (
        <Link
          key={activity.id}
          href={`/course/${module.id}/${activity.id}`}
        >
          <div className="activity-card p-4">
            {/* Activity content */}
          </div>
        </Link>
      ))}
    </div>
  </div>
))}
```

### 3.2 Create New Module Overview Page

**File:** `app/module/[moduleId]/page.tsx`

```typescript
'use client'

import { courseModules } from '@/data/courseDataV3'
import ThreeColumnLayout from '@/app/components/ThreeColumnLayout'

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = courseModules.find(m => m.id === params.moduleId)

  if (!module) {
    return <div>Module not found</div>
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{ backgroundColor: module.colorHex }}
      >
        <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
        <p className="text-white/90">
          ⏱️ {module.timeEstimateMinutes} minutes • {module.activities.length} activities
        </p>
      </header>

      {/* Three Column Layout */}
      <div className="p-8">
        <ThreeColumnLayout module={module} />
      </div>
    </div>
  )
}
```

### 3.3 Update Activity Page

**File:** `app/course/[moduleId]/[activityId]/page.tsx`

Update to support discussion questions:

```typescript
import DiscussionQuestions from '@/app/components/DiscussionQuestions'

// ... existing code ...

{/* After main content */}
{activity.discussionQuestions && activity.discussionQuestions.length > 0 && (
  <DiscussionQuestions questions={activity.discussionQuestions} />
)}
```

## Phase 4: Database Migration (Est. 1 hour)

### 4.1 Apply Schema to Supabase

1. Go to Supabase SQL Editor
2. Copy contents of `supabase-schema-v3.sql`
3. Execute the SQL
4. Verify tables created successfully

### 4.2 Optional: Seed Discussion Questions

If you want to store discussion questions in the database (vs in code):

```sql
-- Example for Module 1, Activity 1
INSERT INTO public.discussion_questions (activity_id, question_text, display_order) VALUES
('activity-01-01', 'How does the perspective shift of adding meaning to "mundane" work influence problem-solving and continuous improvement in the workplace?', 1),
('activity-01-01', 'How can the principles of lean thinking, such as focusing on value creation and continuous improvement, be applied to redefine work and enhance its value for both the employee and the organization?', 2);
```

## Phase 5: Testing & Deployment (Est. 1-2 hours)

### 5.1 Local Testing Checklist

- [ ] All 7 modules display correctly
- [ ] 3-column layout responsive on mobile/tablet/desktop
- [ ] Activities link correctly
- [ ] Discussion questions render properly
- [ ] Coaching prep sections show correctly
- [ ] Deep dive resources link externally
- [ ] Progress tracking still works
- [ ] Admin dashboard still functions

### 5.2 Deploy to Production

```bash
npx vercel --prod
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `supabase-schema-v3.sql` | New database schema |
| `data/courseDataV3.ts` | New module structure |
| `data/courseData.backup.ts` | Original data backup |
| `app/components/ThreeColumnLayout.tsx` | Main layout component |
| `app/components/ActivityCard.tsx` | Activity card component |
| `app/components/DiscussionQuestions.tsx` | Discussion questions component |
| `app/components/CoachingPrepCard.tsx` | Coaching prep component |
| `app/components/DeepDiveResourcesCard.tsx` | Resources component |
| `app/module/[moduleId]/page.tsx` | Module overview page (new) |
| `app/dashboard/page.tsx` | Updated dashboard |
| `app/course/[moduleId]/[activityId]/page.tsx` | Updated activity page |

## Color Reference

| Module | Color Hex |
|--------|-----------|
| 1-4 | #1a5f5f (Teal) |
| 5 | #4a7c4e (Green) |
| 6 | #8b6914 (Orange/Brown) |
| 7 | #c45a3b (Orange/Red) |

## Estimated Total Time

- Phase 1: Data Structure - 4-6 hours
- Phase 2: UI Components - 3-4 hours
- Phase 3: Update Pages - 2-3 hours
- Phase 4: Database - 1 hour
- Phase 5: Testing - 1-2 hours

**Total: 11-16 hours**

## Next Immediate Steps

1. ✅ Database schema created
2. ✅ Module 1 structure created
3. 🔲 Complete modules 2-7 in courseDataV3.ts (use Module 1 as template)
4. 🔲 Create UI components listed above
5. 🔲 Update dashboard and activity pages
6. 🔲 Apply database schema
7. 🔲 Test thoroughly
8. 🔲 Deploy

Would you like me to continue with any specific phase, or would you prefer to take this guide and implement it yourself?
