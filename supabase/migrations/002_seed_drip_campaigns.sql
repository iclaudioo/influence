-- ============================================================
-- Influence Circle — Drip Campaign Seed Data
-- Automation flows + flow steps for all service lines
-- ============================================================

-- ===========================================
-- LABS DRIP FLOW (4 emails, 11 days)
-- ===========================================

INSERT INTO automation_flows (id, name, description, trigger_type, trigger_config, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Labs Drip Campaign', 'Automated drip sequence for Influence Labs leads', 'service_interest', '{"service": "labs"}', 'active');

INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: Send welcome email immediately
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 1, 'send_email',
   '{"template": "drip/labs/LabsDrip1", "subject_nl": "Welkom bij Influence Labs — De 3 grootste groeibarrières", "subject_en": "Welcome to Influence Labs — The 3 biggest growth barriers"}'),

  -- Step 2: Wait 3 days
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 2, 'delay',
   '{"duration_hours": 72}'),

  -- Step 3: Case study email
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 3, 'send_email',
   '{"template": "drip/labs/LabsDrip2", "subject_nl": "Hoe TechVentures 43% groeide in 6 maanden", "subject_en": "How TechVentures grew 43% in 6 months"}'),

  -- Step 4: Wait 4 days
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 4, 'delay',
   '{"duration_hours": 96}'),

  -- Step 5: Condition — did they open the last email?
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 5, 'condition',
   '{"type": "email_opened", "template": "drip/labs/LabsDrip2", "true_step_id": "b0000000-0000-0000-0000-000000000006", "false_step_id": "b0000000-0000-0000-0000-000000000007"}'),

  -- Step 6: Engaged variant — audit offer
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 6, 'send_email',
   '{"template": "drip/labs/LabsDrip3", "subject_nl": "Uw gratis groei-audit wacht op u", "subject_en": "Your free growth audit is waiting"}'),

  -- Step 7: Non-engaged — educational variant (same template, different subject)
  ('b0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 7, 'send_email',
   '{"template": "drip/labs/LabsDrip3", "subject_nl": "3 strategieën die marktleiders gebruiken", "subject_en": "3 strategies market leaders use"}'),

  -- Step 8: Wait 4 days
  ('b0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 8, 'delay',
   '{"duration_hours": 96}'),

  -- Step 9: Final CTA with testimonial
  ('b0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', 9, 'send_email',
   '{"template": "drip/labs/LabsDrip4", "subject_nl": "Laatste kans: plan uw strategiegesprek", "subject_en": "Last chance: schedule your strategy session"}'),

  -- Step 10: Exit
  ('b0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 10, 'exit', '{}');


-- ===========================================
-- CIRCLE DRIP FLOW (4 emails, 9 days)
-- ===========================================

INSERT INTO automation_flows (id, name, description, trigger_type, trigger_config, status) VALUES
  ('a0000000-0000-0000-0000-000000000002', 'Circle Drip Campaign', 'Automated drip sequence for Influence Circle leads', 'service_interest', '{"service": "circle"}', 'active');

INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: Mere Exposure Effect
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 1, 'send_email',
   '{"template": "drip/circle/CircleDrip1", "subject_nl": "Het Mere Exposure Effect — Waarom zichtbaarheid alles verandert", "subject_en": "The Mere Exposure Effect — Why visibility changes everything"}'),

  -- Step 2: Wait 2 days
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 2, 'delay',
   '{"duration_hours": 48}'),

  -- Step 3: Personal branding case study
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 3, 'send_email',
   '{"template": "drip/circle/CircleDrip2", "subject_nl": "Van onzichtbaar naar keynote spreker in 4 maanden", "subject_en": "From invisible to keynote speaker in 4 months"}'),

  -- Step 4: Wait 3 days
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 4, 'delay',
   '{"duration_hours": 72}'),

  -- Step 5: 5 thought leadership pillars
  ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 5, 'send_email',
   '{"template": "drip/circle/CircleDrip3", "subject_nl": "De 5 pijlers van thought leadership", "subject_en": "The 5 pillars of thought leadership"}'),

  -- Step 6: Wait 4 days
  ('c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 6, 'delay',
   '{"duration_hours": 96}'),

  -- Step 7: Condition — engaged?
  ('c0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 7, 'condition',
   '{"type": "email_opened", "template": "drip/circle/CircleDrip3", "true_step_id": "c0000000-0000-0000-0000-000000000008", "false_step_id": "c0000000-0000-0000-0000-000000000009"}'),

  -- Step 8: Direct CTA
  ('c0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002', 8, 'send_email',
   '{"template": "drip/circle/CircleDrip3", "subject_nl": "Start uw personal branding transformatie", "subject_en": "Start your personal branding transformation"}'),

  -- Step 9: Thought-provoking content
  ('c0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000002', 9, 'send_email',
   '{"template": "drip/circle/CircleDrip3", "subject_nl": "Wat zeggen anderen over u als u de kamer verlaat?", "subject_en": "What do others say about you when you leave the room?"}'),

  -- Step 10: Exit
  ('c0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000002', 10, 'exit', '{}');


-- ===========================================
-- STUDIO DRIP FLOW (4 emails, 12 days)
-- ===========================================

INSERT INTO automation_flows (id, name, description, trigger_type, trigger_config, status) VALUES
  ('a0000000-0000-0000-0000-000000000003', 'Studio Drip Campaign', 'Automated drip sequence for Influence Studio leads', 'service_interest', '{"service": "studio"}', 'active');

INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: Portfolio showcase
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 1, 'send_email',
   '{"template": "drip/studio/StudioDrip1", "subject_nl": "Bekijk ons werk — Content die impact maakt", "subject_en": "See our work — Content that makes impact"}'),

  -- Step 2: Wait 3 days
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 2, 'delay',
   '{"duration_hours": 72}'),

  -- Step 3: Content framework
  ('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 3, 'send_email',
   '{"template": "drip/studio/StudioDrip2", "subject_nl": "Het content framework dat altijd werkt", "subject_en": "The content framework that always works"}'),

  -- Step 4: Wait 4 days
  ('d0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', 4, 'delay',
   '{"duration_hours": 96}'),

  -- Step 5: Content audit offer
  ('d0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', 5, 'send_email',
   '{"template": "drip/studio/StudioDrip3", "subject_nl": "Gratis content audit — Ontdek uw kansen", "subject_en": "Free content audit — Discover your opportunities"}'),

  -- Step 6: Wait 5 days
  ('d0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000003', 6, 'delay',
   '{"duration_hours": 120}'),

  -- Step 7: Final CTA with testimonial
  ('d0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000003', 7, 'send_email',
   '{"template": "drip/studio/StudioDrip4", "subject_nl": "Laatste kans: bespreek uw contentstrategie", "subject_en": "Last chance: discuss your content strategy"}'),

  -- Step 8: Exit
  ('d0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000003', 8, 'exit', '{}');


-- ===========================================
-- ACADEMY DRIP FLOW (5 emails, 13 days)
-- ===========================================

INSERT INTO automation_flows (id, name, description, trigger_type, trigger_config, status) VALUES
  ('a0000000-0000-0000-0000-000000000004', 'Academy Drip Campaign', 'Automated drip sequence for Influence Academy leads', 'service_interest', '{"service": "academy"}', 'active');

INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: Employee advocacy value
  ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 1, 'send_email',
   '{"template": "drip/academy/AcademyDrip1", "subject_nl": "Waarom employee advocacy uw beste investering is", "subject_en": "Why employee advocacy is your best investment"}'),

  -- Step 2: Wait 2 days
  ('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 2, 'delay',
   '{"duration_hours": 48}'),

  -- Step 3: Masterclass overview
  ('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 3, 'send_email',
   '{"template": "drip/academy/AcademyDrip2", "subject_nl": "Ontdek onze masterclass programma''s", "subject_en": "Discover our masterclass programs"}'),

  -- Step 4: Wait 3 days
  ('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 4, 'delay',
   '{"duration_hours": 72}'),

  -- Step 5: 3 practical exercises
  ('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000004', 5, 'send_email',
   '{"template": "drip/academy/AcademyDrip3", "subject_nl": "3 oefeningen die u vandaag kunt toepassen", "subject_en": "3 exercises you can apply today"}'),

  -- Step 6: Wait 4 days
  ('e0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000004', 6, 'delay',
   '{"duration_hours": 96}'),

  -- Step 7: Upcoming programs + early-bird
  ('e0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000004', 7, 'send_email',
   '{"template": "drip/academy/AcademyDrip4", "subject_nl": "Aankomende programma''s — Early-bird korting", "subject_en": "Upcoming programs — Early-bird discount"}'),

  -- Step 8: Wait 4 days
  ('e0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000004', 8, 'delay',
   '{"duration_hours": 96}'),

  -- Step 9: Condition — engaged?
  ('e0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000004', 9, 'condition',
   '{"type": "email_opened", "template": "drip/academy/AcademyDrip4", "true_step_id": "e0000000-0000-0000-0000-000000000010", "false_step_id": "e0000000-0000-0000-0000-000000000011"}'),

  -- Step 10: Urgency CTA
  ('e0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000004', 10, 'send_email',
   '{"template": "drip/academy/AcademyDrip4", "subject_nl": "Laatste plaatsen — Schrijf u nu in", "subject_en": "Last spots — Register now"}'),

  -- Step 11: FAQ-style close
  ('e0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000004', 11, 'send_email',
   '{"template": "drip/academy/AcademyDrip4", "subject_nl": "Veelgestelde vragen over onze programma''s", "subject_en": "FAQ about our programs"}'),

  -- Step 12: Exit
  ('e0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000004', 12, 'exit', '{}');


-- ===========================================
-- RE-ENGAGEMENT FLOW (3 emails, 12 days)
-- ===========================================

INSERT INTO automation_flows (id, name, description, trigger_type, trigger_config, status) VALUES
  ('a0000000-0000-0000-0000-000000000005', 'Re-engagement Flow', 'Win back inactive contacts (60+ days no activity)', 'inactivity', '{"inactivity_days": 60}', 'active');

INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: "We miss you" email
  ('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 1, 'send_email',
   '{"template": "reengagement/ReengagementEmail1", "subject_nl": "We missen u — Dit heeft u gemist", "subject_en": "We miss you — Here''s what you missed"}'),

  -- Step 2: Wait 5 days
  ('f0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 2, 'delay',
   '{"duration_hours": 120}'),

  -- Step 3: Condition — did they open?
  ('f0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', 3, 'condition',
   '{"type": "email_opened", "template": "reengagement/ReengagementEmail1", "true_step_id": "f0000000-0000-0000-0000-000000000004", "false_step_id": "f0000000-0000-0000-0000-000000000005"}'),

  -- Step 4: Welcome back (opened)
  ('f0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005', 4, 'update_contact',
   '{"updates": {"last_activity_at": "now()"}}'),

  -- Step 5: "Should we part ways?" (not opened)
  ('f0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 5, 'send_email',
   '{"template": "reengagement/ReengagementEmail2", "subject_nl": "Moeten we afscheid nemen?", "subject_en": "Should we part ways?"}'),

  -- Step 6: Wait 7 days
  ('f0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000005', 6, 'delay',
   '{"duration_hours": 168}'),

  -- Step 7: Condition — still no response?
  ('f0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000005', 7, 'condition',
   '{"type": "email_opened", "template": "reengagement/ReengagementEmail2", "true_step_id": "f0000000-0000-0000-0000-000000000009", "false_step_id": "f0000000-0000-0000-0000-000000000008"}'),

  -- Step 8: Auto-unsubscribe + farewell
  ('f0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000005', 8, 'update_contact',
   '{"updates": {"status": "unsubscribed"}}'),

  -- Step 9: Exit (re-engaged successfully)
  ('f0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000005', 9, 'exit', '{}'),

  -- Step 10: Exit (unsubscribed)
  ('f0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000005', 10, 'exit', '{}');


-- ===========================================
-- WELCOME FLOW (for all new contacts)
-- ===========================================

INSERT INTO automation_flows (id, name, description, trigger_type, trigger_config, status) VALUES
  ('a0000000-0000-0000-0000-000000000006', 'Welcome Flow', 'Send welcome email to new contacts', 'contact_created', '{}', 'active');

INSERT INTO flow_steps (id, flow_id, position, action, config) VALUES
  -- Step 1: Welcome email
  ('g0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 1, 'send_email',
   '{"template": "welcome/WelcomeEmail", "subject_nl": "Welkom bij Influence Circle", "subject_en": "Welcome to Influence Circle"}'),

  -- Step 2: Exit
  ('g0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 2, 'exit', '{}');
