# Service Physics LMS - Maintenance & Sustainability Guide

## Overview

This document provides everything you need to maintain, update, and sustain the Service Physics Problem Solving 101 Learning Management System.

**Live URL:** Deployed via Vercel (auto-deploys from GitHub main branch)
**Repository:** https://github.com/TimWCash/-service-physics-lms

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React framework | 16.x |
| React | UI library | 19.x |
| TypeScript | Type safety | 5.x |
| Tailwind CSS | Styling | 4.x |
| Supabase | Database & Auth | - |
| jsPDF | PDF generation | - |
| canvas-confetti | Celebration animations | - |

---

## Project Structure

```
service-physics-lms/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Login page
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── complete/page.tsx         # Course completion celebration
│   ├── welcome/page.tsx          # Welcome/intro page
│   ├── course/[moduleId]/[activityId]/  # Activity pages
│   ├── module/[moduleId]/        # Module overview pages
│   └── components/               # Reusable React components
│       ├── ContentViewer.tsx     # Renders reading/audio content
│       ├── VideoPlayer.tsx       # YouTube video embed
│       ├── Quiz.tsx              # Quiz component
│       ├── DiscussionQuestions.tsx  # Q&A with auto-save
│       └── CourseCompletion.tsx  # Celebration + PDF download
├── data/
│   └── courseDataV3.ts           # ALL COURSE CONTENT LIVES HERE
├── lib/
│   ├── auth.ts                   # User auth & progress tracking
│   └── supabase.ts               # Supabase client
├── public/
│   ├── images/                   # Logos and images
│   ├── audio/                    # Audio files (.wav, .mp3)
│   ├── pdfs/                     # PDF documents
│   └── templates/                # HTML templates (ERACS worksheet)
└── .env.local                    # Environment variables (not in git)
```

---

## Common Tasks

### 1. Adding a New Activity

Edit `data/courseDataV3.ts` and add to the appropriate module's `activities` array:

```typescript
{
  id: 'activity-XX-XX',           // Unique ID (module-activity format)
  title: 'Activity Title',
  type: 'video' | 'reading' | 'audio' | 'quiz' | 'practice' | 'coaching' | 'ebook',
  duration: '15',                 // Minutes as string
  description: 'What this activity covers...',

  // For videos:
  videoUrl: 'https://www.youtube.com/watch?v=XXXXX',

  // For readings/PDFs:
  externalUrl: '/pdfs/filename.pdf',

  // For audio:
  audioUrl: '/audio/filename.wav',

  // Discussion questions (optional):
  discussionQuestions: [
    {
      id: 'dq-XX-XX-01',
      question: 'Your question here?',
      order: 1
    }
  ]
}
```

**Important:** After adding activities, update the `total` count in `lib/auth.ts` (line ~143):
```typescript
const total = 25; // Update this number
```

Also update `courseMetadata.totalActivities` in `data/courseDataV3.ts`.

### 2. Adding a New Module

In `data/courseDataV3.ts`:

1. Create a new module constant following the existing pattern:
```typescript
const module8: CourseModule = {
  id: 'module-08',
  title: 'Module Title',
  description: 'Module description...',
  colorHex: '#HEX_COLOR',
  accessLevel: 'premium',
  timeEstimateMinutes: 60,
  overview: { content: '...' },
  activities: [...]
}
```

2. Add to the `courseModules` array:
```typescript
export const courseModules: CourseModule[] = [
  module1, module2, ... module8
]
```

3. Update `courseMetadata.totalModules`

### 3. Adding Files (PDFs, Audio, Images)

| File Type | Location | Access URL |
|-----------|----------|------------|
| PDFs | `public/pdfs/` | `/pdfs/filename.pdf` |
| Audio | `public/audio/` | `/audio/filename.wav` |
| Images | `public/images/` | `/images/filename.png` |
| Templates | `public/templates/` | `/templates/filename.html` |

Just drop files in the appropriate folder - no build step needed.

### 4. Updating Discussion Questions

Find the activity in `data/courseDataV3.ts` and modify the `discussionQuestions` array:

```typescript
discussionQuestions: [
  {
    id: 'dq-XX-XX-01',      // Must be unique
    question: 'New question text?',
    order: 1                 // Controls display order
  },
  // Add more questions...
]
```

### 5. Changing Video URLs

Find the activity and update the `videoUrl`:
```typescript
videoUrl: 'https://www.youtube.com/watch?v=NEW_VIDEO_ID',
```

Supported formats:
- `https://www.youtube.com/watch?v=XXXXX`
- `https://youtu.be/XXXXX`

### 6. Updating Branding/Logo

Logo files are in `public/images/`:
- `sp-logo.png` - Color logo (light backgrounds)
- `sp-logo-white.png` - White logo (dark backgrounds)
- `sp-logo-full.png` - Full logo variant

To change logos, replace these files keeping the same filenames.

---

## Deployment

### Automatic Deployment
The app auto-deploys to Vercel when you push to the `main` branch:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will build and deploy within 1-2 minutes.

### Manual Deployment Commands
```bash
# Install dependencies
npm install

# Run locally (development)
npm run dev

# Build for production
npm run build

# Start production server locally
npm start
```

---

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For Vercel, add these in Project Settings > Environment Variables.

---

## Database (Supabase)

### Tables
- `profiles` - User information (id, email, full_name)
- `course_progress` - Activity completion tracking

### User Data Storage
- **Progress:** Saved to Supabase + localStorage
- **Notes & Answers:** Saved to localStorage only (client-side)

### Resetting a User's Progress
In Supabase dashboard:
```sql
DELETE FROM course_progress WHERE user_id = 'user_email_formatted';
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Audio Not Playing
1. Check file exists in `public/audio/`
2. Verify `audioUrl` path starts with `/audio/`
3. Ensure file format is WAV or MP3

### Video Not Loading
1. Verify YouTube URL format
2. Check video is not private/restricted
3. Test URL directly in browser

### Progress Not Saving
1. Check Supabase connection in browser console
2. Verify environment variables are set
3. Check localStorage isn't blocked

### PDF Download Empty
User hasn't answered any discussion questions - PDFs include answers from the `discussionQuestions` component.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `data/courseDataV3.ts` | **Main content file** - all modules, activities, questions |
| `lib/auth.ts` | User management, progress tracking, activity count |
| `app/page.tsx` | Login page with stats |
| `app/dashboard/page.tsx` | Main course dashboard |
| `app/components/CourseCompletion.tsx` | Celebration page, PDF generation |
| `app/components/ContentViewer.tsx` | Renders reading/audio content |
| `app/components/DiscussionQuestions.tsx` | Q&A with auto-save |

---

## Content Checklist

When adding new content, verify:

- [ ] Activity ID is unique (`activity-XX-XX` format)
- [ ] Activity type matches content (video/reading/audio/etc.)
- [ ] Duration is accurate (string format: `'15'`)
- [ ] URLs are correct and accessible
- [ ] Discussion question IDs are unique
- [ ] Total activity count updated in `lib/auth.ts`
- [ ] `courseMetadata.totalActivities` updated
- [ ] Files placed in correct `public/` subfolder
- [ ] Build passes (`npm run build`)

---

## Known Placeholders

These items need real content:

1. **MOD Pizza Case Study** (`activity-03-04`)
   - Currently: `https://example.com/mod-pizza-case-study`
   - Action: Replace with actual PDF or article URL

---

## Support Contacts

For coaching session scheduling (shown on completion page):
- Brian: brian@servicephysics.com
- Steve: steve@servicephysics.com

---

## Version History

| Date | Changes |
|------|---------|
| Feb 2025 | Initial release with 7 modules, 25 activities |
| Feb 2025 | Added Service Physics branding |
| Feb 2025 | Added audio player support |
| Feb 2025 | Added discussion questions with auto-save |
| Feb 2025 | Added completion celebration with PDF export |

---

*Last updated: February 5, 2025*
