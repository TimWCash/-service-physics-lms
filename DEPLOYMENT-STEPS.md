# Deploy Your LMS - Step by Step

## Step 1: Create GitHub Repository (2 minutes)

1. **Open GitHub:** https://github.com/new
2. **Fill in details:**
   - Repository name: `service-physics-lms`
   - Description: Service Physics Problem Solving 101 LMS
   - Choose: **Private** (recommended)
   - **IMPORTANT:** Do NOT check any boxes (no README, no .gitignore)
3. **Click "Create repository"**

## Step 2: Push Code to GitHub (1 minute)

After creating the repo, GitHub will show you commands. 

**In your terminal, run:**

```bash
cd /Users/tim/Desktop/Onboarding/service-physics-lms
git push -u origin main
```

**If it asks for credentials:**
- Username: `timwcash`
- Password: You need a Personal Access Token (see below)

### How to Get a Personal Access Token:
1. Go to: https://github.com/settings/tokens/new
2. Note: "LMS Deploy"
3. Expiration: 90 days
4. Check: ✅ repo (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (starts with `ghp_...`)
7. Use this as your password when pushing

## Step 3: Deploy to Vercel (3 minutes)

1. **Open Vercel:** https://vercel.com/login
2. **Sign in with GitHub** (easiest way)
3. **Authorize Vercel** to access your GitHub repos
4. **Click "Add New"** → "Project"
5. **Find** `service-physics-lms` in the list
6. **Click "Import"**
7. Vercel will auto-detect Next.js ✓
8. **Skip environment variables** (not needed for demo mode)
9. **Click "Deploy"**
10. **Wait 2-3 minutes** for the build

## Step 4: Get Your Shareable Link! 🎉

After deployment completes:
- You'll see a URL like: `https://service-physics-lms.vercel.app`
- **That's your shareable link!**
- Click it to test
- Share it with anyone

---

## Current Status:
✅ Code is ready in: `/Users/tim/Desktop/Onboarding/service-physics-lms`
✅ Git repository initialized
⏳ GitHub repo needs to be created
⏳ Code needs to be pushed
⏳ Vercel deployment needs to happen

## Quick Test:
Your local site is running at: http://localhost:3000
(This confirms the code works!)

---

**Need Help?**
If you get stuck, share a screenshot of the error and I'll help!
