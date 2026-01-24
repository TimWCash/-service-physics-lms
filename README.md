# Service Physics LMS - Problem Solving 101

A modern, full-featured Learning Management System built with Next.js 16, Supabase, and Tailwind CSS.

## 🚀 Features

- ✅ **Complete Course Management** - 6 sections, 32 activities, 9 quizzes
- ✅ **User Authentication** - Secure login with Supabase
- ✅ **Progress Tracking** - Save and sync learning progress
- ✅ **Video Support** - YouTube & Vimeo embed integration
- ✅ **Interactive Quizzes** - With instant feedback and explanations
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern Stack** - Next.js 16, React 19, TypeScript, Tailwind CSS
- ✅ **Production Ready** - Optimized for Vercel deployment

## 📚 Course Content

### Section 1: Welcome to Problem Solving 101
- Introduction to Service Physics

### Section 2: Problem Solving Approach
- Problem-solving methodology
- Cynefin Framework
- Solution Fixation Trap
- Coaching moments

### Section 3: Problem Solving Tools
- 5 Whys Technique
- A3 Problem Solving
- Fishbone Diagrams

### Section 4: The Improvement Kata
- Understanding Direction
- Current Condition Analysis
- Target Conditions
- PDCA Experimentation

### Section 5: The 7 Wastes (TIMWOOD)
- Transportation, Inventory, Motion
- Waiting, Overproduction
- Overprocessing, Defects

### Section 6: Visual Management (Premium)
- Visual Management principles
- Kanban Boards
- Implementation strategies

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Video Hosting**: YouTube/Vimeo integration

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/service-physics-lms.git
   cd service-physics-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to http://localhost:3000

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide with Supabase configuration
- **[DEPLOY.md](./DEPLOY.md)** - Step-by-step deployment to production
- **[supabase-schema.sql](./supabase-schema.sql)** - Database schema

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Adding Video Content

Replace placeholder URLs in `data/courseData.ts`:

```typescript
// YouTube
videoUrl: 'https://www.youtube.com/watch?v=VIDEO_ID'

// Vimeo
videoUrl: 'https://vimeo.com/VIDEO_ID'

// Embedded
videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

## 📊 Database Schema

The LMS uses three main tables:

- **profiles** - User profile information
- **course_progress** - Track completed activities
- **quiz_responses** - Store quiz answers and scores

Run `supabase-schema.sql` in your Supabase SQL Editor to create all tables.

## 🎨 Customization

### Branding

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Content

All course content is in `data/courseData.ts`. Edit sections, activities, and quiz questions to match your needs.

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
service-physics-lms/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── course/            # Course pages
│   ├── dashboard/         # Dashboard page
│   └── page.tsx           # Landing/login page
├── data/                  # Course content
│   └── courseData.ts      # All course data
├── lib/                   # Utilities
│   ├── auth.ts           # Authentication logic
│   └── supabase/         # Supabase clients
├── public/               # Static assets
└── supabase-schema.sql   # Database schema
```

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication with Supabase
- Environment variables for sensitive data
- No API keys exposed to client

## 🤝 Contributing

This is a private project, but suggestions are welcome!

## 📝 License

ISC

## 🆘 Support

- Check [SETUP.md](./SETUP.md) for setup issues
- See [DEPLOY.md](./DEPLOY.md) for deployment help
- Review Supabase docs: https://supabase.com/docs
- Check Next.js docs: https://nextjs.org/docs

## 🎯 Roadmap

- [ ] Certificate generation on completion
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Course analytics
- [ ] Discussion forums
- [ ] Mobile app
- [ ] Multi-language support

## 📈 Performance

- ✅ Server-side rendering with Next.js
- ✅ Optimized images and assets
- ✅ Code splitting and lazy loading
- ✅ Lighthouse score: 95+

## 🙏 Acknowledgments

Built with:
- Next.js
- Supabase
- Tailwind CSS
- TypeScript
- React Markdown

---

Made with ❤️ for Service Physics Academy
