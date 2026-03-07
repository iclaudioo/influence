-- ============================================================
-- Influence Circle — Expand Welcome Flow to 4-email drip
-- Replaces the single welcome email with a full sequence
-- ============================================================

-- Remove existing welcome flow steps
DELETE FROM flow_steps WHERE flow_id = 'a0000000-0000-0000-0000-000000000006';

-- Update flow metadata
UPDATE automation_flows
SET name = 'Welcome Drip Campaign',
    description = 'Generic 4-email welcome sequence for homepage signups'
WHERE id = 'a0000000-0000-0000-0000-000000000006';

-- Insert 8 new steps (4 emails + 3 delays + exit)
INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: Welcome email (immediate)
  ('a2000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 1, 'send_email',
   '{"email_type": "drip", "email_data": {"template": "welcome_drip_1", "subject_nl": "Welkom bij Influence Circle — Dit kun je verwachten", "subject_en": "Welcome to Influence Circle — Here''s what to expect"}}'),

  -- Step 2: Wait 48 hours
  ('a2000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 2, 'delay',
   '{"duration_hours": 48}'),

  -- Step 3: Reputation Architecture Model
  ('a2000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006', 3, 'send_email',
   '{"email_type": "drip", "email_data": {"template": "welcome_drip_2", "subject_nl": "Het Reputation Architecture Model — Van zichtbaar naar onvermijdelijk", "subject_en": "The Reputation Architecture Model — From visible to inevitable"}}'),

  -- Step 4: Wait 72 hours
  ('a2000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000006', 4, 'delay',
   '{"duration_hours": 72}'),

  -- Step 5: 4-step method (Labs > Circle > Studio > Academy)
  ('a2000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000006', 5, 'send_email',
   '{"email_type": "drip", "email_data": {"template": "welcome_drip_3", "subject_nl": "De reis van diagnose tot borging — Onze 4-stappen methode", "subject_en": "From diagnosis to retention — Our 4-step method"}}'),

  -- Step 6: Wait 96 hours
  ('a2000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 6, 'delay',
   '{"duration_hours": 96}'),

  -- Step 7: Soft CTA — plan a call
  ('a2000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000006', 7, 'send_email',
   '{"email_type": "drip", "email_data": {"template": "welcome_drip_4", "subject_nl": "Laten we kennismaken — Plan een vrijblijvend gesprek", "subject_en": "Let''s get acquainted — Schedule a free consultation"}}'),

  -- Step 8: Exit
  ('a2000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000006', 8, 'exit', '{}');
