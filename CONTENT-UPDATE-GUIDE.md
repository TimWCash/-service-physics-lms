# Content Update Guide
## Service Physics LMS - Problem Solving 101

This guide explains how to update and manage the course content for your Learning Management System.

---

## Quick Reference

- **Course Content File**: `/data/courseData.ts`
- **Admin Dashboard**: https://service-physics-lms.vercel.app/admin
- **Live Site**: https://service-physics-lms.vercel.app

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Editing Content](#editing-content)
3. [Activity Types](#activity-types)
4. [Adding New Content](#adding-new-content)
5. [Deploying Changes](#deploying-changes)
6. [Important Notes](#important-notes)

---

## File Structure

The course is organized in **sections** and **activities**:

```
Course
├── Section 1
│   ├── Activity 1
│   ├── Activity 2
│   └── Activity 3
├── Section 2
│   ├── Activity 1
│   └── Activity 2
└── ...
```

All content is stored in one file:
```
/data/courseData.ts
```

---

## Editing Content

### 1. Open the Content File

Navigate to your project folder:
```bash
cd /Users/tim/Desktop/Onboarding/service-physics-lms
```

Open the file in any text editor:
```bash
open data/courseData.ts
```

### 2. Section Structure

Each section looks like this:

```typescript
{
  id: 'section-01',                    // Unique ID - don't change if tracking progress
  title: 'Section Title Here',         // What users see
  accessLevel: 'free',                 // 'free' or 'paid'
  activities: [                        // Array of learning activities
    // Activities go here
  ]
}
```

### 3. Activity Structure

Each activity has these properties:

```typescript
{
  id: 'activity-01-01',               // Unique ID - don't change
  title: 'Activity Title',            // What users see
  type: 'reading',                    // Type of activity (see below)
  duration: '15 min',                 // Optional - shown to users
  content: `Markdown content here`,   // For ebook/reading/coaching
  videoUrl: 'https://...',            // For video type only
  questions: [...]                    // For quiz type only
}
```

---

## Activity Types

### 1. **E-book** (`type: 'ebook'`)
Long-form reading content with rich formatting.

```typescript
{
  id: 'activity-01-01',
  title: "Introduction to Problem Solving",
  type: 'ebook',
  duration: '20 min',
  content: `
# Chapter Title

Your content here in **markdown** format.

## Subsection

- Bullet points work
- Images: ![Alt text](image-url.jpg)
- Links: [Link text](https://example.com)
- **Bold** and *italic* text

### Code blocks
\`\`\`
Code goes here
\`\`\`
`
}
```

### 2. **Reading** (`type: 'reading'`)
Shorter reading content.

```typescript
{
  id: 'activity-02-01',
  title: 'Quick Guide',
  type: 'reading',
  duration: '10 min',
  content: `# Quick Guide Content...`
}
```

### 3. **Video** (`type: 'video'`)
Embedded video content.

```typescript
{
  id: 'activity-03-01',
  title: 'Video Tutorial',
  type: 'video',
  duration: '15 min',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
}
```

**Note**: For YouTube videos, use the embed URL format:
- Regular: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Embed: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### 4. **Quiz** (`type: 'quiz'`)
Multiple choice questions.

```typescript
{
  id: 'activity-04-01',
  title: 'Knowledge Check',
  type: 'quiz',
  duration: '10 min',
  questions: [
    {
      id: 'q1',
      question: 'What is the first step in the PDCA cycle?',
      options: [
        'Plan',
        'Do',
        'Check',
        'Act'
      ],
      correctAnswer: 0,  // Index of correct answer (0 = first option)
      explanation: 'Plan is the first step where you define the problem and plan the solution.'
    },
    {
      id: 'q2',
      question: 'Second question here?',
      options: ['Option 1', 'Option 2', 'Option 3'],
      correctAnswer: 1,
      explanation: 'Explanation of why option 2 is correct.'
    }
  ]
}
```

### 5. **Coaching** (`type: 'coaching'`)
Interactive coaching content.

```typescript
{
  id: 'activity-05-01',
  title: 'Coaching Session',
  type: 'coaching',
  content: `# Coaching Session Content...`
}
```

---

## Adding New Content

### Add a New Section

1. Open `data/courseData.ts`
2. Find the `export const courseData: CourseSection[] = [` line
3. Add a new section object:

```typescript
export const courseData: CourseSection[] = [
  // ... existing sections ...

  {
    id: 'section-07',  // Increment the number
    title: 'New Section Title',
    accessLevel: 'free',
    activities: [
      {
        id: 'activity-07-01',
        title: 'First Activity',
        type: 'reading',
        content: `# Content here`
      }
    ]
  }
]
```

### Add a New Activity to Existing Section

1. Find the section in `courseData`
2. Add to the `activities` array:

```typescript
{
  id: 'section-02',
  title: 'Problem Solving Approach',
  accessLevel: 'free',
  activities: [
    // ... existing activities ...

    {
      id: 'activity-02-05',  // New activity
      title: 'New Activity Title',
      type: 'reading',
      duration: '10 min',
      content: `# New content here`
    }
  ]
}
```

---

## Deploying Changes

After making changes to the content file, you need to deploy them:

### Option 1: Deploy to Production (Recommended)

```bash
cd /Users/tim/Desktop/Onboarding/service-physics-lms
npx vercel --prod
```

This will:
1. Build your updated content
2. Deploy to production
3. Make it live at https://service-physics-lms.vercel.app

### Option 2: Test Locally First

```bash
cd /Users/tim/Desktop/Onboarding/service-physics-lms
npm run dev
```

Then open http://localhost:3000 in your browser to test changes before deploying.

When satisfied, deploy with:
```bash
npx vercel --prod
```

---

## Important Notes

### ⚠️ Preserving User Progress

**DO NOT change these if you want to keep user progress:**
- Section `id` values
- Activity `id` values

User progress is tracked by these IDs in the database. Changing them will break progress tracking.

**SAFE to change:**
- `title` - Section or activity names
- `content` - Any content/text
- `duration` - Time estimates
- `videoUrl` - Video links
- `questions` - Quiz content
- `accessLevel` - Free/paid status

### 📝 Markdown Formatting

Content supports full markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

> Blockquote

`inline code`

\`\`\`
code block
\`\`\`
```

### 🎯 Content Tips

1. **Keep content concise** - Users prefer shorter, focused activities
2. **Use headings** - Break up long content with ## and ### headings
3. **Add duration** - Help users plan their time
4. **Quiz feedback** - Always include explanations for quiz answers
5. **Test videos** - Verify video URLs work before deploying

---

## Updating the Total Activities Count

If you add or remove activities, update this number in `/lib/auth.ts`:

Find this line (around line 118):
```typescript
const total = 13; // Total activities in the course
```

Change `13` to the actual number of activities across all sections.

To count activities:
```bash
cd /Users/tim/Desktop/Onboarding/service-physics-lms
grep -o "id: 'activity-" data/courseData.ts | wc -l
```

---

## Troubleshooting

### Changes Not Showing Up?

1. Clear your browser cache (Cmd+Shift+R on Mac)
2. Check the deployment completed successfully
3. Visit the Vercel dashboard: https://vercel.com/tim-cashmans-projects/service-physics-lms

### Syntax Errors?

If deployment fails, check for:
- Missing commas between objects
- Unclosed backticks in content strings
- Unclosed brackets or braces
- Special characters in content (use \\` for literal backticks)

### Need Help?

- Check build logs: `npx vercel logs`
- Test locally first: `npm run dev`
- View errors in browser console (F12)

---

## Quick Command Reference

```bash
# Navigate to project
cd /Users/tim/Desktop/Onboarding/service-physics-lms

# Edit content
open data/courseData.ts

# Test locally
npm run dev

# Deploy to production
npx vercel --prod

# View deployment logs
npx vercel logs

# Count total activities
grep -o "id: 'activity-" data/courseData.ts | wc -l
```

---

## Example: Complete Activity

Here's a complete example with all options:

```typescript
{
  id: 'activity-06-03',
  title: 'Complete Guide to PDCA',
  type: 'ebook',
  duration: '25 min',
  content: `
# The PDCA Cycle: A Complete Guide

## Introduction

The Plan-Do-Check-Act (PDCA) cycle is a four-step iterative process for continuous improvement.

## The Four Steps

### 1. Plan
- Define the problem
- Set objectives
- Develop action plan

### 2. Do
- Implement the plan
- Document observations
- Collect data

### 3. Check
- Analyze results
- Compare to objectives
- Identify gaps

### 4. Act
- Standardize improvements
- Plan next cycle
- Document learnings

## Best Practices

1. Start small with pilot tests
2. Involve the team
3. Document everything
4. Iterate continuously

> "Without data, you're just another person with an opinion." - W. Edwards Deming

## Next Steps

Apply PDCA to a real problem in your organization.
`
}
```

---

**Last Updated**: January 2026
**Project**: Service Physics LMS
**Contact**: Admin Dashboard at https://service-physics-lms.vercel.app/admin
