-- database_full_clean.sql
-- Видаляємо політики
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.orders;
DROP POLICY IF EXISTS "Allow public read" ON public.orders;

-- Вимикаємо RLS
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- Видаляємо таблицю
DROP TABLE IF EXISTS public.orders CASCADE;
