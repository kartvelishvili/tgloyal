-- ═══════════════════════════════════════════════════════════════
-- TG Legal - Supabase Migration Script
-- Run this in Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create social_links table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  label TEXT,
  url TEXT DEFAULT '',
  icon TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create footer_custom_html table (single row)
CREATE TABLE IF NOT EXISTS public.footer_custom_html (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  html_content TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security Policies
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_custom_html ENABLE ROW LEVEL SECURITY;

-- Admins table policies (full access via anon key for admin panel)
CREATE POLICY "admins_select" ON public.admins FOR SELECT USING (true);
CREATE POLICY "admins_insert" ON public.admins FOR INSERT WITH CHECK (true);
CREATE POLICY "admins_update" ON public.admins FOR UPDATE USING (true);
CREATE POLICY "admins_delete" ON public.admins FOR DELETE USING (true);

-- Social links policies (public read, admin write)
CREATE POLICY "social_links_select" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "social_links_insert" ON public.social_links FOR INSERT WITH CHECK (true);
CREATE POLICY "social_links_update" ON public.social_links FOR UPDATE USING (true);
CREATE POLICY "social_links_delete" ON public.social_links FOR DELETE USING (true);

-- Footer HTML policies
CREATE POLICY "footer_html_select" ON public.footer_custom_html FOR SELECT USING (true);
CREATE POLICY "footer_html_insert" ON public.footer_custom_html FOR INSERT WITH CHECK (true);
CREATE POLICY "footer_html_update" ON public.footer_custom_html FOR UPDATE USING (true);

-- ═══════════════════════════════════════════════════════════════
-- Default Data
-- ═══════════════════════════════════════════════════════════════

-- Default super admin
INSERT INTO public.admins (name, email, password, role)
VALUES ('მთავარი ადმინი', 'qartvela.ge@gmial.com', 'Qartvela2786', 'super')
ON CONFLICT (email) DO NOTHING;

-- Default social links
INSERT INTO public.social_links (type, label, url, icon, sort_order) VALUES
  ('facebook', 'Facebook', '', 'Facebook', 1),
  ('linkedin', 'LinkedIn', '', 'Linkedin', 2),
  ('email', 'Email', '', 'Mail', 3);

-- Default footer HTML (empty)
INSERT INTO public.footer_custom_html (id, html_content) VALUES (1, '')
ON CONFLICT (id) DO NOTHING;
