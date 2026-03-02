-- ============================================================
-- Influence Circle — E-mail Automation Platform
-- Initial database schema
-- ============================================================

-- ---------- Custom Enums ----------

CREATE TYPE service_line AS ENUM ('labs', 'circle', 'studio', 'academy');
CREATE TYPE contact_source AS ENUM ('contact_form', 'import', 'manual', 'api');
CREATE TYPE email_status AS ENUM ('queued', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'failed');
CREATE TYPE campaign_status AS ENUM ('draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled');
CREATE TYPE automation_status AS ENUM ('draft', 'active', 'paused', 'completed', 'cancelled');
CREATE TYPE step_action AS ENUM ('send_email', 'delay', 'condition', 'update_contact', 'exit');

-- ---------- Contacts ----------

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  language TEXT NOT NULL DEFAULT 'nl' CHECK (language IN ('nl', 'en')),
  source contact_source NOT NULL DEFAULT 'contact_form',
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  gdpr_consent_at TIMESTAMPTZ,
  gdpr_consent_ip TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained', 'suppressed')),
  message TEXT,
  last_activity_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT contacts_email_unique UNIQUE (email)
);

CREATE INDEX idx_contacts_last_activity ON contacts (last_activity_at);
CREATE INDEX idx_contacts_status ON contacts (status);

-- ---------- Contact Tags ----------

CREATE TABLE contact_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (contact_id, tag)
);

CREATE INDEX idx_contact_tags_tag ON contact_tags (tag);

-- ---------- Contact Service Interests ----------

CREATE TABLE contact_service_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  service service_line NOT NULL,
  engagement_level TEXT NOT NULL DEFAULT 'interested' CHECK (engagement_level IN ('interested', 'engaged', 'customer', 'churned')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (contact_id, service)
);

-- ---------- Automation Flows ----------

CREATE TABLE automation_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('contact_created', 'tag_added', 'service_interest', 'manual', 'inactivity')),
  trigger_config JSONB NOT NULL DEFAULT '{}',
  status automation_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Flow Steps ----------

CREATE TABLE flow_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_id UUID NOT NULL REFERENCES automation_flows(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  action step_action NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  -- For send_email: { template, subject, subject_b, preview_text }
  -- For delay: { duration_hours }
  -- For condition: { field, operator, value, true_step, false_step }
  -- For update_contact: { field, value }
  -- For exit: {}
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (flow_id, position)
);

-- ---------- Contact Flow Enrollments ----------

CREATE TABLE contact_flow_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  flow_id UUID NOT NULL REFERENCES automation_flows(id) ON DELETE CASCADE,
  current_step_id UUID REFERENCES flow_steps(id),
  status automation_status NOT NULL DEFAULT 'active',
  next_action_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (contact_id, flow_id)
);

CREATE INDEX idx_enrollments_next_action ON contact_flow_enrollments (next_action_at)
  WHERE status = 'active';

-- ---------- Email Sends ----------

CREATE TABLE email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  resend_id TEXT,
  subject TEXT NOT NULL,
  template TEXT NOT NULL,
  status email_status NOT NULL DEFAULT 'queued',
  open_count INTEGER NOT NULL DEFAULT 0,
  click_count INTEGER NOT NULL DEFAULT 0,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  bounced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_email_sends_resend_id ON email_sends (resend_id);
CREATE INDEX idx_email_sends_contact ON email_sends (contact_id);

-- ---------- Email Link Clicks ----------

CREATE TABLE email_link_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_send_id UUID NOT NULL REFERENCES email_sends(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- A/B Tests ----------

CREATE TABLE ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_step_id UUID REFERENCES flow_steps(id) ON DELETE CASCADE,
  campaign_id UUID,
  name TEXT NOT NULL,
  variant_a_subject TEXT NOT NULL,
  variant_b_subject TEXT NOT NULL,
  split_percentage INTEGER NOT NULL DEFAULT 20 CHECK (split_percentage BETWEEN 10 AND 50),
  min_sample_size INTEGER NOT NULL DEFAULT 100,
  wait_hours INTEGER NOT NULL DEFAULT 24,
  confidence_threshold NUMERIC NOT NULL DEFAULT 0.90,
  winner TEXT CHECK (winner IN ('a', 'b', NULL)),
  variant_a_opens INTEGER NOT NULL DEFAULT 0,
  variant_a_sends INTEGER NOT NULL DEFAULT 0,
  variant_b_opens INTEGER NOT NULL DEFAULT 0,
  variant_b_sends INTEGER NOT NULL DEFAULT 0,
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Email Preferences ----------

CREATE TABLE email_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('transactional', 'marketing', 'drip', 'newsletter')),
  subscribed BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (contact_id, category)
);

-- ---------- Unsubscribe Tokens ----------

CREATE TABLE unsubscribe_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '90 days'),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_unsubscribe_tokens_token ON unsubscribe_tokens (token);

-- ---------- Campaigns ----------

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  preview_text TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  html TEXT,
  status campaign_status NOT NULL DEFAULT 'draft',
  segment JSONB NOT NULL DEFAULT '{}',
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  total_recipients INTEGER NOT NULL DEFAULT 0,
  total_opens INTEGER NOT NULL DEFAULT 0,
  total_clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- Campaign Sends ----------

CREATE TABLE campaign_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  email_send_id UUID NOT NULL REFERENCES email_sends(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (campaign_id, email_send_id)
);

-- ---------- Updated_at Trigger ----------

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON contact_service_interests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON automation_flows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON contact_flow_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON email_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------- Row Level Security ----------

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_service_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE flow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_flow_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE unsubscribe_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_sends ENABLE ROW LEVEL SECURITY;

-- Public: allow INSERT on contacts (contact form submissions)
CREATE POLICY "Allow public contact form submissions"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public: allow INSERT on contact_service_interests (via contact form)
CREATE POLICY "Allow public service interest insert"
  ON contact_service_interests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public: allow SELECT on unsubscribe_tokens (for unsubscribe flow)
CREATE POLICY "Allow public unsubscribe token lookup"
  ON unsubscribe_tokens FOR SELECT
  TO anon
  USING (true);

-- Public: allow UPDATE on contacts for unsubscribe
CREATE POLICY "Allow public unsubscribe"
  ON contacts FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Public: allow UPDATE on email_preferences for preference center
CREATE POLICY "Allow public preference update"
  ON email_preferences FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Public: allow SELECT on email_preferences for preference center
CREATE POLICY "Allow public preference read"
  ON email_preferences FOR SELECT
  TO anon
  USING (true);

-- Service role gets full access (bypasses RLS by default)
-- These policies are for authenticated admin users
CREATE POLICY "Admin full access contacts" ON contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_tags" ON contact_tags FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_service_interests" ON contact_service_interests FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access automation_flows" ON automation_flows FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access flow_steps" ON flow_steps FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contact_flow_enrollments" ON contact_flow_enrollments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access email_sends" ON email_sends FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access email_link_clicks" ON email_link_clicks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access ab_tests" ON ab_tests FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access email_preferences" ON email_preferences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access unsubscribe_tokens" ON unsubscribe_tokens FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access campaigns" ON campaigns FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access campaign_sends" ON campaign_sends FOR ALL TO authenticated USING (true) WITH CHECK (true);
