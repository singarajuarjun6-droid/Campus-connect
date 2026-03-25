-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  university text NOT NULL,
  interests text[] DEFAULT '{}',
  bio text,
  photo_url text,
  contact text NOT NULL,
  fingerprint_id text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create policy for public read access
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

-- Note: We intentionally DO NOT create a public INSERT policy. 
-- Inserts will be handled securely by our Next.js API route using the Service Role Key to prevent spam.

-- 4. Storage Setup
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profiles_photos', 'profiles_photos', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policy: allow public read
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles_photos');

-- Storage inserts will also be handled by the Next.js API using the Service Role Key.

-- 6. Extension for pg_cron (if available on your Supabase tier)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 7. Auto-delete cron job (Runs daily to delete 30-day old profiles)
-- Note: If pg_cron fails because you are on a restricted tier, you can ignore this step. We will also build an /api/cron endpoint as a fallback.
SELECT cron.schedule('clean_old_profiles', '0 0 * * *', $$
  DELETE FROM public.profiles WHERE created_at < NOW() - INTERVAL '30 days';
$$);
