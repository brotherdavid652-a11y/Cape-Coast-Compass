-- Applied to the hosted project on 2026-10-08; version assigned by Supabase.
-- Keep authenticated ownership and row-level security; remove only the AAL2 gate.
DO $$ BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relname='customer_profiles' AND c.relrowsecurity) THEN RAISE EXCEPTION 'Profile RLS must remain enabled'; END IF;
IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='customer_profiles' AND policyname='Customers own their profiles') THEN RAISE EXCEPTION 'Owner policy missing'; END IF;
END $$;
DROP POLICY IF EXISTS "Profiles require verified 2FA" ON public.customer_profiles;
