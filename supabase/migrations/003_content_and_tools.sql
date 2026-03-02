-- ============================================================
-- Influence Circle — Content & Tools
-- Database migration: content pages, blog, cases, tools
-- ============================================================

-- ---------- New Enums ----------

CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE lead_source AS ENUM ('contact_form', 'blog', 'assessment', 'lead_magnet', 'newsletter');
CREATE TYPE assessment_type AS ENUM ('visibility_score', 'roi_calculator');
CREATE TYPE media_type AS ENUM ('press', 'podcast', 'speaking');

-- ---------- ALTER contacts: add lead_source ----------

ALTER TABLE contacts
  ADD COLUMN lead_source lead_source DEFAULT 'contact_form';

-- ---------- Team Members ----------

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  sort_order INT DEFAULT 0,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Blog Categories ----------

CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_nl TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Blog Posts ----------

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_nl TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt_nl TEXT,
  excerpt_en TEXT,
  content_nl JSONB DEFAULT '{}',
  content_en JSONB DEFAULT '{}',
  cover_image_url TEXT,
  author_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  service_line service_line,
  tags TEXT[] DEFAULT '{}',
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title_nl TEXT,
  meta_title_en TEXT,
  meta_description_nl TEXT,
  meta_description_en TEXT,
  og_image_url TEXT,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_status ON blog_posts (status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts (published_at DESC);
CREATE INDEX idx_blog_posts_service_line ON blog_posts (service_line);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Blog Post Categories (join table) ----------

CREATE TABLE blog_post_categories (
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- ---------- Case Studies ----------

CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_nl TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT,
  client_role TEXT,
  client_company TEXT,
  client_logo_url TEXT,
  client_photo_url TEXT,
  challenge_nl TEXT,
  challenge_en TEXT,
  solution_nl TEXT,
  solution_en TEXT,
  results JSONB DEFAULT '[]',
  quote_nl TEXT,
  quote_en TEXT,
  service_line service_line NOT NULL,
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_case_studies_slug ON case_studies (slug);
CREATE INDEX idx_case_studies_status ON case_studies (status);
CREATE INDEX idx_case_studies_service_line ON case_studies (service_line);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Media Mentions ----------

CREATE TABLE media_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_name TEXT NOT NULL,
  logo_url TEXT,
  title TEXT,
  url TEXT,
  mention_date DATE,
  type media_type DEFAULT 'press',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON media_mentions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- LinkedIn Showcases ----------

CREATE TABLE linkedin_showcases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_photo_url TEXT,
  post_text TEXT,
  post_image_url TEXT,
  engagement_stats JSONB DEFAULT '{"likes":0,"comments":0,"reposts":0}',
  linkedin_url TEXT,
  sort_order INT DEFAULT 0,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON linkedin_showcases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Lead Magnets ----------

CREATE TABLE lead_magnets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_nl TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_nl TEXT,
  description_en TEXT,
  file_url TEXT,
  cover_image_url TEXT,
  service_line service_line,
  download_count INT DEFAULT 0,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON lead_magnets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Lead Magnet Downloads ----------

CREATE TABLE lead_magnet_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_magnet_id UUID NOT NULL REFERENCES lead_magnets(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_lead_magnet_downloads_lead_magnet ON lead_magnet_downloads (lead_magnet_id);

-- ---------- Assessment Submissions ----------

CREATE TABLE assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  tool_type assessment_type NOT NULL,
  answers JSONB DEFAULT '{}',
  score INT,
  results JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessment_submissions_tool_type ON assessment_submissions (tool_type);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON assessment_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Pages SEO ----------

CREATE TABLE pages_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('nl', 'en')),
  meta_title TEXT,
  meta_description TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (path, locale)
);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON pages_seo
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Row Level Security ----------

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_showcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_magnets ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_magnet_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages_seo ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read published team members"
  ON team_members FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Public read blog categories"
  ON blog_categories FOR SELECT TO anon
  USING (true);

CREATE POLICY "Public read published blog posts"
  ON blog_posts FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Public read blog post categories"
  ON blog_post_categories FOR SELECT TO anon
  USING (true);

CREATE POLICY "Public read published case studies"
  ON case_studies FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Public read media mentions"
  ON media_mentions FOR SELECT TO anon
  USING (true);

CREATE POLICY "Public read published linkedin showcases"
  ON linkedin_showcases FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Public read published lead magnets"
  ON lead_magnets FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Public insert lead magnet downloads"
  ON lead_magnet_downloads FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Public insert assessment submissions"
  ON assessment_submissions FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Public read pages seo"
  ON pages_seo FOR SELECT TO anon
  USING (true);

-- Admin full access
CREATE POLICY "Admin full access team_members" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog_categories" ON blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog_posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog_post_categories" ON blog_post_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access case_studies" ON case_studies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access media_mentions" ON media_mentions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access linkedin_showcases" ON linkedin_showcases FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access lead_magnets" ON lead_magnets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access lead_magnet_downloads" ON lead_magnet_downloads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access assessment_submissions" ON assessment_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access pages_seo" ON pages_seo FOR ALL TO authenticated USING (true) WITH CHECK (true);
