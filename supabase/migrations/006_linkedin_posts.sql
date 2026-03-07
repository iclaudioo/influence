-- ============================================================
-- Influence Circle — LinkedIn Posts table
-- Stores AI-generated LinkedIn draft posts from Telegram bot
-- ============================================================

CREATE TABLE linkedin_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  hook TEXT,
  hashtags TEXT[] DEFAULT '{}',
  topic TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON linkedin_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: only authenticated users (admin) can access
ALTER TABLE linkedin_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access on linkedin_posts"
  ON linkedin_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
