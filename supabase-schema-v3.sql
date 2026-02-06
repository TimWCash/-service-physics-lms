-- Service Physics LMS Database Schema v3
-- Enhanced schema for 7-module structure with 3-column layout

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.deep_dive_resources CASCADE;
DROP TABLE IF EXISTS public.coaching_prep CASCADE;
DROP TABLE IF EXISTS public.discussion_questions CASCADE;
DROP TABLE IF EXISTS public.module_sections CASCADE;
DROP TABLE IF EXISTS public.quiz_responses CASCADE;
DROP TABLE IF EXISTS public.course_progress CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table (standalone, not linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create course_progress table
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,  -- Quiz scores (0-100)
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, activity_id)
);

-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS public.quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  selected_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, activity_id, question_id)
);

-- NEW: Create module_sections table for 3-column layout content
CREATE TABLE IF NOT EXISTS public.module_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id TEXT NOT NULL,
  column_type TEXT NOT NULL CHECK (column_type IN ('overview', 'dive_in', 'recap')),
  section_title TEXT,
  content_html TEXT,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(module_id, column_type, display_order)
);

-- NEW: Create discussion_questions table for activities
CREATE TABLE IF NOT EXISTS public.discussion_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(activity_id, display_order)
);

-- NEW: Create coaching_prep table for module recap sections
CREATE TABLE IF NOT EXISTS public.coaching_prep (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id TEXT NOT NULL UNIQUE,
  discussion_questions TEXT[] NOT NULL,
  knowledge_check_url TEXT,
  glossary_note TEXT DEFAULT 'Seeing terms or words in here that you are unfamiliar with? Check out the Service Physics Glossary for definitions.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- NEW: Create deep_dive_resources table for additional learning materials
CREATE TABLE IF NOT EXISTS public.deep_dive_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('read', 'watch')),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  resource_url TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(module_id, resource_type, display_order)
);

-- Disable Row Level Security for demo purposes (enable in production)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_prep DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.deep_dive_resources DISABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_progress_user_id ON public.course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_activity_id ON public.course_progress(activity_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_user_id ON public.quiz_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_activity_id ON public.quiz_responses(activity_id);
CREATE INDEX IF NOT EXISTS idx_module_sections_module_id ON public.module_sections(module_id);
CREATE INDEX IF NOT EXISTS idx_module_sections_column_type ON public.module_sections(column_type);
CREATE INDEX IF NOT EXISTS idx_discussion_questions_activity_id ON public.discussion_questions(activity_id);
CREATE INDEX IF NOT EXISTS idx_coaching_prep_module_id ON public.coaching_prep(module_id);
CREATE INDEX IF NOT EXISTS idx_deep_dive_resources_module_id ON public.deep_dive_resources(module_id);

-- Add comments for documentation
COMMENT ON TABLE public.module_sections IS 'Stores content for 3-column layout (Overview, Dive In, Recap) per module';
COMMENT ON TABLE public.discussion_questions IS 'Stores discussion questions for each activity';
COMMENT ON TABLE public.coaching_prep IS 'Stores coaching prep content for module recap sections';
COMMENT ON TABLE public.deep_dive_resources IS 'Stores additional learning resources (books, videos) per module';
