-- ============================================================
-- MORNACO SUPABASE DATABASE INITIALIZATION SCRIPT
-- Copy and paste this script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mlwtfapdmiiebghkbssy/sql
-- ============================================================

-- 1. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id BIGINT PRIMARY KEY,
    ref TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'en attente',
    verified BOOLEAN DEFAULT TRUE,
    total NUMERIC(10, 3) NOT NULL DEFAULT 0.000,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS & public policies for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to orders" ON public.orders;
CREATE POLICY "Allow public read access to orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access to orders" ON public.orders;
CREATE POLICY "Allow public insert access to orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to orders" ON public.orders;
CREATE POLICY "Allow public update access to orders" ON public.orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete access to orders" ON public.orders;
CREATE POLICY "Allow public delete access to orders" ON public.orders FOR DELETE USING (true);


-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 3) NOT NULL,
    visible BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access to products" ON public.products;
CREATE POLICY "Allow public insert access to products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to products" ON public.products;
CREATE POLICY "Allow public update access to products" ON public.products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete access to products" ON public.products;
CREATE POLICY "Allow public delete access to products" ON public.products FOR DELETE USING (true);


-- 3. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    display_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to admin_users" ON public.admin_users;
CREATE POLICY "Allow public read access to admin_users" ON public.admin_users FOR SELECT USING (true);


-- 4. INITIAL SEED DATA FOR ADMIN ACCOUNTS
-- Password hash for 'mornaco2026' (SHA-256): 97a3a936a524eebcf7c9751e70e9f1eeed9b9ee613271790b4d45d3ae728148b
INSERT INTO public.admin_users (username, hash, display_name, role)
VALUES 
    ('admin', '97a3a936a524eebcf7c9751e70e9f1eeed9b9ee613271790b4d45d3ae728148b', 'Gérant Mornaco', 'admin'),
    ('superadmin', '97a3a936a524eebcf7c9751e70e9f1eeed9b9ee613271790b4d45d3ae728148b', 'Direction Mornaco', 'superadmin')
ON CONFLICT (username) DO NOTHING;


-- 5. INITIAL SEED DATA FOR MENU PRODUCTS
INSERT INTO public.products (id, name, category, price, visible, featured, sort_order)
VALUES
    ('c1', 'Express', 'Cafés', 4.000, true, false, 1),
    ('c2', 'Capucin', 'Cafés', 4.500, true, false, 2),
    ('c3', 'Direct', 'Cafés', 5.000, true, false, 3),
    ('c4', 'Cappuccino MORNACO', 'Cafés', 15.000, true, true, 4),
    ('c5', 'Café Turc MORNACO', 'Cafés', 10.000, true, true, 5),
    ('t1', 'Thé à la Menthe', 'Thés', 4.000, true, false, 6),
    ('t2', 'Thé Baklawa MORNACO', 'Thés', 14.000, true, true, 7),
    ('f1', 'Frappuccino Moka', 'Frappés & Milkshakes', 10.000, true, false, 8),
    ('f2', 'Milk-Shake Nutella', 'Frappés & Milkshakes', 14.000, true, true, 9)
ON CONFLICT (id) DO NOTHING;


-- 6. RPC FUNCTIONS FOR ADMIN OPERATIONS

-- RPC: admin_login
CREATE OR REPLACE FUNCTION public.admin_login(p_username TEXT, p_hash TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    u RECORD;
BEGIN
    SELECT id, username, display_name, role FROM public.admin_users
    WHERE LOWER(username) = LOWER(p_username) AND hash = p_hash
    INTO u;

    IF u.id IS NULL THEN
        RETURN NULL;
    END IF;

    RETURN jsonb_build_object(
        'id', u.id,
        'username', u.username,
        'display_name', u.display_name,
        'role', u.role,
        'token', md5(u.id::text || now()::text)
    );
END;
$$;


-- RPC: admin_set_order_status
CREATE OR REPLACE FUNCTION public.admin_set_order_status(p_token TEXT, p_order_id BIGINT, p_status TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.orders SET status = p_status WHERE id = p_order_id;
END;
$$;


-- RPC: admin_clear_orders
CREATE OR REPLACE FUNCTION public.admin_clear_orders(p_token TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.orders;
END;
$$;


-- RPC: admin_product_save
CREATE OR REPLACE FUNCTION public.admin_product_save(
    p_token TEXT,
    p_id TEXT,
    p_name TEXT,
    p_category TEXT,
    p_price NUMERIC,
    p_visible BOOLEAN DEFAULT TRUE,
    p_featured BOOLEAN DEFAULT FALSE,
    p_photo TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_id TEXT;
BEGIN
    IF p_id IS NULL OR p_id = '' THEN
        new_id := 'prod-' || extract(epoch from now())::bigint;
        INSERT INTO public.products (id, name, category, price, visible, featured)
        VALUES (new_id, p_name, p_category, p_price, COALESCE(p_visible, true), COALESCE(p_featured, false));
    ELSE
        UPDATE public.products
        SET name = COALESCE(p_name, name),
            category = COALESCE(p_category, category),
            price = COALESCE(p_price, price),
            visible = COALESCE(p_visible, visible),
            featured = COALESCE(p_featured, featured)
        WHERE id = p_id;
        new_id := p_id;
    END IF;

    RETURN jsonb_build_object('success', true, 'id', new_id);
END;
$$;


-- RPC: admin_product_delete
CREATE OR REPLACE FUNCTION public.admin_product_delete(p_token TEXT, p_id TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.products WHERE id = p_id;
END;
$$;


-- RPC: admin_list_users
CREATE OR REPLACE FUNCTION public.admin_list_users(p_requester_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_agg(jsonb_build_object(
        'id', id,
        'username', username,
        'display_name', display_name,
        'role', role,
        'created_at', created_at
    )) FROM public.admin_users INTO result;

    RETURN COALESCE(result, '[]'::jsonb);
END;
$$;


-- RPC: admin_create_user
CREATE OR REPLACE FUNCTION public.admin_create_user(
    p_username TEXT,
    p_hash TEXT,
    p_display_name TEXT,
    p_role TEXT,
    p_requester_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_u RECORD;
BEGIN
    IF EXISTS (SELECT 1 FROM public.admin_users WHERE LOWER(username) = LOWER(p_username)) THEN
        RETURN jsonb_build_object('error', 'Cet utilisateur existe déjà');
    END IF;

    INSERT INTO public.admin_users (username, hash, display_name, role)
    VALUES (p_username, p_hash, p_display_name, COALESCE(p_role, 'admin'))
    RETURNING id, username, display_name, role INTO new_u;

    RETURN jsonb_build_object('success', true, 'id', new_u.id);
END;
$$;


-- RPC: admin_delete_user
CREATE OR REPLACE FUNCTION public.admin_delete_user(p_target_id UUID, p_requester_id TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM public.admin_users WHERE id = p_target_id;
END;
$$;
