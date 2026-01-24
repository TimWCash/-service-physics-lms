# Service Physics LMS - Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier available at https://supabase.com)
- A Vercel account for deployment (optional, free tier available)

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details and create

### 1.2 Run the Database Schema
1. In your Supabase project, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL to create tables and policies

### 1.3 Configure Authentication
1. Go to Authentication > Providers
2. Enable "Email" provider
3. Optional: Enable other providers (Google, GitHub, etc.)
4. Go to Authentication > URL Configuration
5. Add your site URL (e.g., `http://localhost:3000` for dev)

### 1.4 Get API Keys
1. Go to Project Settings > API
2. Copy your:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon/Public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 2: Local Development Setup

### 2.1 Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2.2 Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
2. Edit `.env.local` and add your Supabase credentials:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   \`\`\`

### 2.3 Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see your LMS!

## Step 3: Adding YouTube Videos

### Option A: Use YouTube Video IDs
1. Upload your course videos to YouTube
2. Get the video ID from the URL (e.g., `dQw4w9WgXcQ` from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
3. Update video URLs in `data/courseData.ts`:
   \`\`\`typescript
   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
   \`\`\`

### Option B: Use Vimeo
1. Upload videos to Vimeo
2. Get the video ID
3. Update video URLs:
   \`\`\`typescript
   videoUrl: 'https://player.vimeo.com/video/VIDEO_ID'
   \`\`\`

## Step 4: Deploying to Vercel

### 4.1 Connect to GitHub
1. Push your code to GitHub:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/service-physics-lms.git
   git push -u origin main
   \`\`\`

### 4.2 Deploy with Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### 4.3 Update Supabase Redirect URLs
1. In Supabase, go to Authentication > URL Configuration
2. Add your Vercel URL (e.g., `https://your-app.vercel.app`)

## Step 5: Testing

### Test User Registration
1. Go to your deployed site
2. Try registering a new account
3. Check Supabase Authentication > Users to see the new user

### Test Progress Tracking
1. Log in and complete an activity
2. Check the `course_progress` table in Supabase
3. Refresh the page - progress should persist

### Test Quiz Responses
1. Take a quiz
2. Check the `quiz_responses` table in Supabase

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file has the correct Supabase credentials
- Make sure environment variables don't have quotes or extra spaces
- Restart the dev server after changing environment variables

### Progress not saving
- Check the browser console for errors
- Verify Row Level Security policies in Supabase
- Make sure the user is authenticated

### Videos not playing
- Check that video URLs are correct
- For YouTube, make sure the URL uses `/embed/` format
- Check browser console for CORS or iframe errors

## Next Steps

### Customize Content
- Edit `data/courseData.ts` to add your course content
- Replace placeholder text with real course material
- Add your own quiz questions

### Customize Styling
- Edit `tailwind.config.ts` for brand colors
- Modify `app/globals.css` for custom styles
- Update components in `components/` directory

### Add Features
- Implement certificate generation
- Add course completion emails
- Create admin dashboard
- Add course analytics

## Support

For issues or questions:
- Check the Next.js documentation: https://nextjs.org/docs
- Supabase documentation: https://supabase.com/docs
- Create an issue on GitHub
