-- Activity Content Table
-- Stores all editable content for activities including markdown content, descriptions, titles

CREATE TABLE IF NOT EXISTS public.activity_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_id TEXT NOT NULL UNIQUE,
  module_id TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  content TEXT, -- Markdown content for reading activities
  duration TEXT,
  external_url TEXT,
  video_url TEXT,
  audio_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_content_activity_id ON public.activity_content(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_content_module_id ON public.activity_content(module_id);

-- Disable Row Level Security for demo purposes
ALTER TABLE public.activity_content DISABLE ROW LEVEL SECURITY;

-- Add comments for documentation
COMMENT ON TABLE public.activity_content IS 'Stores all editable content for activities';
COMMENT ON COLUMN public.activity_content.activity_id IS 'Unique activity identifier';
COMMENT ON COLUMN public.activity_content.module_id IS 'Parent module identifier';
COMMENT ON COLUMN public.activity_content.title IS 'Activity title shown in UI';
COMMENT ON COLUMN public.activity_content.type IS 'Activity type: video, reading, quiz, audio, etc.';
COMMENT ON COLUMN public.activity_content.description IS 'Short description of the activity';
COMMENT ON COLUMN public.activity_content.content IS 'Markdown content for reading activities';
COMMENT ON COLUMN public.activity_content.duration IS 'Estimated duration in minutes';

-- Insert current activities from courseDataV3
INSERT INTO public.activity_content (activity_id, module_id, title, type, description, content, duration, external_url, video_url, audio_url, thumbnail_url) VALUES
  -- Module 1
  ('activity-01-01', 'module-01', 'Introduction to SP 101', 'video', 'An overview of the Service Physics approach to problem solving', NULL, '25', NULL, 'https://www.youtube.com/watch?v=N7oz366X0-8', NULL, NULL),
  ('activity-01-02', 'module-01', 'Redefining the work', 'reading', 'Deep dive into what work really means in the context of problem solving', NULL, '15', 'https://www.lean.org/the-lean-post/articles/redefining-work/', NULL, NULL, '/images/redefining-work.jpg'),
  ('activity-01-03', 'module-01', 'The Solution Fixation Trap', 'reading', 'An experiment done in the Harvard Business School about the effects of getting stuck solutioning.', NULL, '18', 'https://hbr.org/2023/05/is-your-team-caught-in-a-solution-fixation-trap', NULL, NULL, '/images/solution-fixation.jpg'),

  -- Module 2
  ('activity-02-01', 'module-02', 'Root Cause Analysis', 'video', 'Learn how to identify the true root causes of problems', NULL, '20', NULL, 'https://vimeo.com/123456789', NULL, NULL),
  ('activity-02-02', 'module-02', '5 Whys Technique', 'video', 'Master the 5 Whys technique for problem analysis', NULL, '18', NULL, 'https://vimeo.com/123456790', NULL, NULL),
  ('activity-02-03', 'module-02', 'Hot Dog Plant Story', 'audio', 'Real-world example of problem solving in action', NULL, '22', NULL, NULL, '/audio/hot-dog-plant.mp3', NULL),

  -- Module 3
  ('activity-03-01', 'module-03', 'Steve''s Problem Solving Journey', 'audio', 'A case study in identifying problems effectively', NULL, '15', NULL, NULL, '/audio/sp-101-steve.mp3', NULL),
  ('activity-03-02', 'module-03', 'Problem Identification Framework', 'video', 'Framework for systematically identifying problems', NULL, '25', NULL, 'https://vimeo.com/123456791', NULL, NULL),
  ('activity-03-03', 'module-03', 'Mod Pizza Case Study', 'reading', 'How Mod Pizza identified and solved operational problems', NULL, '20', 'https://example.com/mod-pizza-case-study', NULL, NULL, '/images/mod-pizza.jpg'),
  ('activity-03-04', 'module-03', 'Problem Identification Practice', 'practice', 'Practice identifying problems in sample scenarios', NULL, '30', NULL, NULL, NULL, NULL),

  -- Module 4
  ('activity-04-01', 'module-04', 'Problem Statement Basics', 'video', 'Learn to write effective problem statements', NULL, '22', NULL, 'https://www.youtube.com/watch?v=example', NULL, NULL),
  ('activity-04-02', 'module-04', 'A3 Problem Solving', 'video', 'Introduction to A3 thinking for problem definition', NULL, '28', NULL, 'https://vimeo.com/123456792', NULL, NULL),
  ('activity-04-03', 'module-04', 'Problem Definition Workshop', 'practice', 'Hands-on practice defining problems clearly', NULL, '35', NULL, NULL, NULL, NULL),

  -- Module 5
  ('activity-05-01', 'module-05', 'PDCA Cycle', 'video', 'Understanding Plan-Do-Check-Act for experimentation', NULL, '18', NULL, 'https://vimeo.com/123456793', NULL, NULL),
  ('activity-05-02', 'module-05', 'Designing Experiments', 'video', 'How to design effective experiments to test solutions', NULL, '20', NULL, 'https://vimeo.com/123456794', NULL, NULL),

  -- Module 6
  ('activity-06-01', 'module-06', 'Measurement Systems', 'video', 'Creating reliable measurement systems', NULL, '16', NULL, 'https://vimeo.com/123456795', NULL, NULL),
  ('activity-06-02', 'module-06', 'Talk to Humans', 'reading', 'The importance of customer feedback in measurement', NULL, '12', 'https://example.com/talk-to-humans', NULL, NULL, NULL),

  -- Module 7
  ('activity-07-01', 'module-07', 'Continuous Improvement Culture', 'reading', 'Building a culture of continuous improvement', NULL, '15', NULL, NULL, NULL, NULL),
  ('activity-07-02', 'module-07', 'Sustaining Improvements', 'practice', 'Strategies for sustaining improvements over time', NULL, '20', NULL, NULL, NULL, NULL)
ON CONFLICT (activity_id) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  duration = EXCLUDED.duration,
  external_url = EXCLUDED.external_url,
  video_url = EXCLUDED.video_url,
  audio_url = EXCLUDED.audio_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  updated_at = TIMEZONE('utc', NOW());
