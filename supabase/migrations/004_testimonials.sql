CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_nl TEXT NOT NULL,
  quote_en TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  service_line TEXT CHECK (service_line IN ('labs','circle','studio','academy')),
  avatar_url TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft','published')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON testimonials
  FOR SELECT USING (status = 'published');
