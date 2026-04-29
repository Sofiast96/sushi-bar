-- database_create.sql
-- Створюємо таблицю замовлень
CREATE TABLE IF NOT EXISTS public.orders (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    name TEXT,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Дозволяємо анонімний insert
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public read"
ON public.orders
FOR SELECT
TO anon
USING (true);
