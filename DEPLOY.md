# Deployment Guide - Service Physics LMS

This guide will walk you through deploying your LMS to production with Supabase and Vercel.

## Quick Start Checklist

- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Environment variables configured
- [ ] GitHub repository created
- [ ] Vercel project connected
- [ ] Production URL added to Supabase

## Step-by-Step Deployment

### 1. Set Up Supabase (5 minutes)

1. **Create Account & Project**
   - Go to https://supabase.com
   - Sign up or log in
   - Click "New Project"
   - Choose organization and fill in details
   - Wait for project to initialize (~2 minutes)

2. **Deploy Database Schema**
   - Open SQL Editor in Supabase dashboard
   - Copy contents of `supabase-schema.sql`
   - Paste and click "Run"
   - Verify tables created under "Table Editor"

3. **Enable Email Authentication**
   - Go to Authentication > Providers
   - Enable "Email" provider
   - Configure email templates (optional)
   - Save changes

4. **Get API Credentials**
   - Go to Project Settings > API
   - Copy these values (you'll need them later):
     ```
     Project URL: https://xxxxx.supabase.co
     Anon/Public Key: eyJhb....(long string)
     ```

### 2. Prepare Code for Deployment (3 minutes)

1. **Update Environment Variables**
   ```bash
   # Edit .env.local with your Supabase credentials
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Test Locally**
   ```bash
   npm install
   npm run dev
   ```
   - Visit http://localhost:3000
   - Test user registration
   - Verify progress tracking works

3. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Service Physics LMS"
   ```

### 3. Deploy to GitHub (2 minutes)

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name: `service-physics-lms`
   - Make it private (recommended)
   - Don't initialize with README
   - Click "Create repository"

2. **Push Code**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/service-physics-lms.git
   git branch -M main
   git push -u origin main
   ```

### 4. Deploy to Vercel (5 minutes)

1. **Connect to Vercel**
   - Go to https://vercel.com
   - Sign up/login (use GitHub for easy integration)
   - Click "Add New" > "Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://your-project.supabase.co

   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: your-anon-key-here
   ```
   - Apply to: Production, Preview, and Development
   - Click "Add" for each variable

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `https://service-physics-lms.vercel.app`

### 5. Final Configuration (2 minutes)

1. **Update Supabase Redirect URLs**
   - Go to Supabase > Authentication > URL Configuration
   - Add your Vercel URL to "Site URL"
   - Add to "Redirect URLs":
     ```
     https://your-app.vercel.app/**
     https://your-app.vercel.app/auth/callback
     ```

2. **Test Production Site**
   - Visit your Vercel URL
   - Create a test account
   - Verify email (check spam folder)
   - Test course functionality
   - Check Supabase > Authentication > Users

## Post-Deployment

### Adding Real Video Content

1. **Upload Videos to YouTube**
   - Create unlisted or public videos
   - Get video ID from URL

2. **Update Course Data**
   Edit `data/courseData.ts` and replace videoUrl:
   ```typescript
   videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'
   ```

3. **Push Changes**
   ```bash
   git add data/courseData.ts
   git commit -m "Add real video URLs"
   git push
   ```
   Vercel will auto-deploy the update!

### Custom Domain (Optional)

1. **In Vercel**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Supabase**
   - Add custom domain to redirect URLs
   - Update site URL

### Enable Features

**Email Notifications**
- Configure Supabase email templates
- Add custom SMTP (optional)

**Analytics**
- Add Vercel Analytics
- Or integrate Google Analytics

**Monitoring**
- Use Vercel's built-in monitoring
- Set up error tracking (e.g., Sentry)

## Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
- Check package.json dependencies
- Run `npm install` locally first
- Clear Vercel cache and redeploy

**Error: "Environment variable not found"**
- Verify environment variables in Vercel
- Make sure they're applied to Production
- Redeploy after adding variables

### Authentication Issues

**"Invalid API credentials"**
- Double-check Supabase URL and anon key
- Ensure no extra spaces or quotes
- Verify environment variables in Vercel

**Email not sending**
- Check spam folder
- Verify email provider in Supabase
- Enable "Confirm email" in Supabase settings

**Redirect not working**
- Add production URL to Supabase redirect URLs
- Include trailing `/**` wildcard
- Clear browser cache

### Progress Not Saving

**Check these:**
1. User is logged in (check console)
2. Row Level Security policies are correct
3. Database tables exist
4. Network tab shows API calls succeeding

## Updating Your Site

### Quick Updates
```bash
# Make changes to your code
git add .
git commit -m "Update course content"
git push
```
Vercel automatically deploys on push to main branch!

### Rollback if Needed
- Go to Vercel > Deployments
- Find previous working deployment
- Click "..." > "Promote to Production"

## Monitoring & Maintenance

### Weekly Tasks
- Check Supabase usage (free tier limits)
- Review user signups
- Monitor error logs in Vercel

### Monthly Tasks
- Review course completion rates
- Update content based on feedback
- Check for package updates

### Backup Strategy
- Supabase has automatic backups
- Export user data regularly
- Keep git history clean

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Success Checklist

After deployment, verify:
- [ ] Site loads at production URL
- [ ] User can register account
- [ ] Email verification works
- [ ] User can log in
- [ ] Course content displays
- [ ] Videos play (if added)
- [ ] Quiz system works
- [ ] Progress saves and persists
- [ ] User can logout
- [ ] Mobile responsive
- [ ] No console errors

🎉 **Congratulations!** Your LMS is live!

## Next Steps

1. Add your real course content
2. Upload videos to YouTube
3. Customize branding and colors
4. Add more courses
5. Enable payments (if needed)
6. Market your course!
