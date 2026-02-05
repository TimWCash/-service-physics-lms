-- Activity URLs Table
-- Stores all external links, video URLs, audio URLs for activities

CREATE TABLE IF NOT EXISTS public.activity_urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id TEXT NOT NULL UNIQUE,
  external_url TEXT,
  video_url TEXT,
  audio_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Deep Dive Resources URLs Table (already exists in main schema, but adding here for completeness)
-- This table stores URLs for additional reading/watching materials per module

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_urls_activity_id ON public.activity_urls(activity_id);

-- Disable Row Level Security for demo purposes
ALTER TABLE public.activity_urls DISABLE ROW LEVEL SECURITY;

-- Add comments for documentation
COMMENT ON TABLE public.activity_urls IS 'Stores URLs for activities - external links, videos, audio files, thumbnails';
COMMENT ON COLUMN public.activity_urls.activity_id IS 'References the activity ID from courseDataV3.ts';
COMMENT ON COLUMN public.activity_urls.external_url IS 'External article or resource URL (e.g., HBR articles)';
COMMENT ON COLUMN public.activity_urls.video_url IS 'YouTube or Vimeo video URL';
COMMENT ON COLUMN public.activity_urls.audio_url IS 'Audio file URL or path';
COMMENT ON COLUMN public.activity_urls.thumbnail_url IS 'Thumbnail image URL for the activity';

-- Insert current URLs from the LMS
INSERT INTO public.activity_urls (activity_id, external_url, video_url, audio_url, thumbnail_url) VALUES
  -- Module 1
  ('activity-01-01', NULL, NULL, NULL, NULL), -- Introduction to SP 101
  ('activity-01-02', 'https://www.lean.org/the-lean-post/articles/redefining-work/', NULL, NULL, '/images/redefining-work.jpg'),
  ('activity-01-03', 'https://hbr.org/2023/05/is-your-team-caught-in-a-solution-fixation-trap', NULL, NULL, '/images/solution-fixation.jpg'),

  -- Module 2
  ('activity-02-01', NULL, 'https://vimeo.com/123456789', NULL, NULL),
  ('activity-02-02', NULL, 'https://vimeo.com/123456790', NULL, NULL),
  ('activity-02-03', NULL, NULL, '/audio/hot-dog-plant.mp3', NULL),

  -- Module 3
  ('activity-03-01', NULL, NULL, '/audio/sp-101-steve.mp3', NULL),
  ('activity-03-02', NULL, 'https://vimeo.com/123456791', NULL, NULL),
  ('activity-03-03', 'https://example.com/mod-pizza-case-study', NULL, NULL, '/images/mod-pizza.jpg'),
  ('activity-03-04', NULL, NULL, NULL, NULL),

  -- Module 4
  ('activity-04-01', NULL, 'https://www.youtube.com/watch?v=example', NULL, NULL),
  ('activity-04-02', NULL, 'https://vimeo.com/123456792', NULL, NULL),
  ('activity-04-03', NULL, NULL, NULL, NULL),

  -- Module 5
  ('activity-05-01', NULL, 'https://vimeo.com/123456793', NULL, NULL),
  ('activity-05-02', NULL, 'https://vimeo.com/123456794', NULL, NULL),

  -- Module 6
  ('activity-06-01', NULL, 'https://vimeo.com/123456795', NULL, NULL),
  ('activity-06-02', 'https://example.com/talk-to-humans', NULL, NULL, NULL),

  -- Module 7
  ('activity-07-01', NULL, NULL, NULL, NULL),
  ('activity-07-02', NULL, NULL, NULL, NULL)
ON CONFLICT (activity_id) DO UPDATE SET
  external_url = EXCLUDED.external_url,
  video_url = EXCLUDED.video_url,
  audio_url = EXCLUDED.audio_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  updated_at = TIMEZONE('utc', NOW());
