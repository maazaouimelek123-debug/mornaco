-- ============================================================
-- MORNACO FULL SUPABASE INITIALIZATION & MENU SEED SCRIPT
-- Copy and paste this script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mlwtfapdmiiebghkbssy/sql
-- ============================================================

-- 1. RE-CREATE PRODUCTS TABLE WITH FULL PUBLIC PERMISSIONS
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

-- Enable RLS and public policies for full SELECT, INSERT, UPDATE, DELETE
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access to products" ON public.products;
CREATE POLICY "Allow public insert access to products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to products" ON public.products;
CREATE POLICY "Allow public update access to products" ON public.products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete access to products" ON public.products;
CREATE POLICY "Allow public delete access to products" ON public.products FOR DELETE USING (true);

-- 2. ORDERS TABLE & PERMISSIONS
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

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to orders" ON public.orders;
CREATE POLICY "Allow public read access to orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access to orders" ON public.orders;
CREATE POLICY "Allow public insert access to orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to orders" ON public.orders;
CREATE POLICY "Allow public update access to orders" ON public.orders FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete access to orders" ON public.orders;
CREATE POLICY "Allow public delete access to orders" ON public.orders FOR DELETE USING (true);

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

INSERT INTO public.admin_users (username, hash, display_name, role)
VALUES 
    ('admin', '97a3a936a524eebcf7c9751e70e9f1eeed9b9ee613271790b4d45d3ae728148b', 'Gérant Mornaco', 'admin'),
    ('superadmin', '97a3a936a524eebcf7c9751e70e9f1eeed9b9ee613271790b4d45d3ae728148b', 'Direction Mornaco', 'superadmin')
ON CONFLICT (username) DO NOTHING;

-- 4. INSERT ALL 100+ MORNACO MENU ITEMS
INSERT INTO public.products (id, name, category, price, visible, featured, sort_order)
VALUES
    ('cafes-caf--0', 'Express', 'Cafés', 4.000, true, false, 1),
    ('cafes-caf--1', 'Capucin', 'Cafés', 4.500, true, false, 2),
    ('cafes-caf--2', 'Direct', 'Cafés', 5.000, true, false, 3),
    ('cafes-caf--3', 'Café Américain', 'Cafés', 5.000, true, false, 4),
    ('cafes-caf--4', 'Chocolat au Lait', 'Cafés', 5.000, true, false, 5),
    ('cafes-caf--5', 'Nescafé au Lait', 'Cafés', 5.000, true, false, 6),
    ('cafes-caf--6', 'Cappuccino', 'Cafés', 8.000, true, false, 7),
    ('cafes-caf--7', 'Express Spécial', 'Cafés', 5.500, true, false, 8),
    ('cafes-caf--8', 'Capucin Spécial', 'Cafés', 6.000, true, false, 9),
    ('cafes-caf--9', 'Direct Spécial', 'Cafés', 7.000, true, false, 10),
    ('cafes-caf--10', 'Américain Spécial', 'Cafés', 7.500, true, false, 11),
    ('cafes-caf--11', 'Café Spécial (chocolat blanc ou noir)', 'Cafés', 8.000, true, false, 12),
    ('cafes-caf--12', 'Cappuccino Spécial', 'Cafés', 10.000, true, false, 13),
    ('cafes-caf--13', 'Café Aromatisé (au choix)', 'Cafés', 6.000, true, false, 14),
    ('cafes-caf--14', 'Verre de Lait', 'Cafés', 2.000, true, false, 15),
    ('cafes-caf--15', 'Café Turc', 'Cafés', 7.000, true, false, 16),
    ('cafes-caf--16', 'Café Turc MORNACO (café + kaak warka ou samsa + bkhour)', 'Cafés', 10.000, true, true, 17),
    ('cafes-italian-coffee-0', 'Expresso', 'Cafés', 6.000, true, false, 18),
    ('cafes-italian-coffee-1', 'Spécial Expresso', 'Cafés', 7.000, true, false, 19),
    ('cafes-italian-coffee-2', 'Expresso Macchiato', 'Cafés', 7.000, true, false, 20),
    ('cafes-italian-coffee-3', 'Spécial Expresso Macchiato', 'Cafés', 8.000, true, false, 21),
    ('cafes-italian-coffee-4', 'Direct', 'Cafés', 8.000, true, false, 22),
    ('cafes-italian-coffee-5', 'Direct Spécial', 'Cafés', 9.000, true, false, 23),
    ('cafes-italian-coffee-6', 'Cappuccino', 'Cafés', 10.000, true, false, 24),
    ('cafes-italian-coffee-7', 'Spécial Cappuccino', 'Cafés', 12.000, true, false, 25),
    ('cafes-italian-coffee-8', 'Cappuccino MORNACO', 'Cafés', 15.000, true, true, 26),
    ('cafes-coffee-in-0', 'Café Latte Caramel', 'Cafés', 8.000, true, false, 27),
    ('cafes-coffee-in-1', 'Café Liégeois Glacé (express, boule de glace, caramel, chantilly)', 'Cafés', 10.000, true, false, 28),
    ('cafes-coffee-in-2', 'Chocolat Chaud', 'Cafés', 8.000, true, false, 29),
    ('cafes-coffee-in-3', 'Chocolat Chaud Chantilly', 'Cafés', 10.000, true, false, 30),
    ('cafes-coffee-in-4', 'Chocolat Liégeois Glacé (chocolat glacé, boule de glace, caramel, chantilly)', 'Cafés', 12.000, true, false, 31),
    ('cafes-coffee-in-5', 'Chocolat Chaud MORNACO', 'Cafés', 15.000, true, true, 32),
    ('thes-s0-0', 'Thé à la Menthe', 'Thés', 4.000, true, false, 33),
    ('thes-s0-1', 'Thé à la Menthe (sirop)', 'Thés', 5.000, true, false, 34),
    ('thes-s0-2', 'Thé Infusion', 'Thés', 5.000, true, false, 35),
    ('thes-s0-3', 'Thé aux Amandes', 'Thés', 7.500, true, false, 36),
    ('thes-s0-4', 'Thé aux Pignons', 'Thés', 10.000, true, false, 37),
    ('thes-s0-5', 'Thé Kerfa (thé, kerfa, miel)', 'Thés', 6.500, true, false, 38),
    ('thes-s0-6', 'Thé Baklawa (thé, fruits secs, kaak warka, miel, bkhour)', 'Thés', 14.000, true, true, 39),
    ('frappes-frappuccino-0', 'Frappuccino Moka', 'Frappés & Milkshakes', 10.000, true, false, 40),
    ('frappes-frappuccino-1', 'Frappuccino Oreo', 'Frappés & Milkshakes', 12.000, true, false, 41),
    ('frappes-frappuccino-2', 'Frappuccino Caramel', 'Frappés & Milkshakes', 12.000, true, false, 42),
    ('frappes-frappuccino-3', 'Frappuccino Speculoos', 'Frappés & Milkshakes', 12.000, true, false, 43),
    ('frappes-frappuccino-4', 'Frappuccino Snickers', 'Frappés & Milkshakes', 12.000, true, false, 44),
    ('frappes-frappuccino-5', 'Frappuccino Nutella', 'Frappés & Milkshakes', 14.000, true, false, 45),
    ('frappes-milk-shakes-0', 'Milk-Shake Nutella', 'Frappés & Milkshakes', 14.000, true, false, 46),
    ('frappes-milk-shakes-1', 'Milk-Shake Oreo', 'Frappés & Milkshakes', 14.000, true, false, 47),
    ('frappes-milk-shakes-2', 'Milk-Shake Speculoos', 'Frappés & Milkshakes', 14.000, true, false, 48),
    ('frappes-milk-shakes-3', 'Milk-Shake Snickers', 'Frappés & Milkshakes', 14.000, true, false, 49),
    ('frappes-milk-shakes-4', 'Milk-Shake Kinder', 'Frappés & Milkshakes', 15.000, true, false, 50),
    ('frappes-milk-shakes-5', 'Milk-Shake Chocolat Banane', 'Frappés & Milkshakes', 15.000, true, false, 51),
    ('frappes-milk-shakes-6', 'Milk-Shake Ferrero Rocher', 'Frappés & Milkshakes', 15.000, true, false, 52),
    ('frappes-milk-shakes-7', 'Milk-Shake Oreo & Nutella', 'Frappés & Milkshakes', 15.000, true, false, 53),
    ('frappes-milk-shakes-8', 'Milk-Shake MORNACO', 'Frappés & Milkshakes', 18.000, true, true, 54),
    ('glaces-glaces-0', 'Glaces (2 boules au choix)', 'Glaces & Desserts', 8.000, true, false, 55),
    ('glaces-glaces-1', 'Glaces (2 boules aux fruits secs)', 'Glaces & Desserts', 11.000, true, false, 56),
    ('glaces-glaces-2', 'Glaces (3 boules au choix)', 'Glaces & Desserts', 11.000, true, false, 57),
    ('glaces-glaces-3', 'Glaces (3 boules aux fruits secs)', 'Glaces & Desserts', 14.000, true, false, 58),
    ('glaces-glaces-4', 'Banana Split (3 boules au choix)', 'Glaces & Desserts', 13.000, true, false, 59),
    ('glaces-glaces-5', 'Banana Split (3 boules aux fruits secs)', 'Glaces & Desserts', 16.000, true, false, 60),
    ('glaces-glaces-6', 'Sorbet Citron', 'Glaces & Desserts', 7.000, true, false, 61),
    ('glaces-glaces-7', 'Glaces MORNACO', 'Glaces & Desserts', 18.000, true, true, 62),
    ('glaces-desserts-0', 'Tiramisu', 'Glaces & Desserts', 12.000, true, false, 63),
    ('glaces-desserts-1', 'Fondant Chocolat (fondant, boule de glace)', 'Glaces & Desserts', 10.000, true, false, 64),
    ('glaces-desserts-2', 'CheeseCake (au choix)', 'Glaces & Desserts', 12.000, true, false, 65),
    ('glaces-desserts-3', 'CheeseCake MORNACO', 'Glaces & Desserts', 14.000, true, true, 66),
    ('glaces-desserts-4', 'Gâteau', 'Glaces & Desserts', 12.000, true, false, 67),
    ('glaces-jwejem---fruits-0', 'Jwejem', 'Glaces & Desserts', 12.000, true, false, 68),
    ('glaces-jwejem---fruits-1', 'Jwejem MORNACO', 'Glaces & Desserts', 14.000, true, true, 69),
    ('glaces-jwejem---fruits-2', 'Assiette de Fruits', 'Glaces & Desserts', 23.000, true, false, 70),
    ('jus-jus-frais-0', 'Citronnade', 'Jus & Cocktails', 7.500, true, false, 71),
    ('jus-jus-frais-1', 'Citronnade à la Menthe (sirop)', 'Jus & Cocktails', 8.000, true, false, 72),
    ('jus-jus-frais-2', 'Citronnade aux Amandes', 'Jus & Cocktails', 11.000, true, false, 73),
    ('jus-jus-frais-3', 'Lait de Poule', 'Jus & Cocktails', 8.000, true, false, 74),
    ('jus-jus-frais-4', 'Lait de Poule Spécial', 'Jus & Cocktails', 12.000, true, false, 75),
    ('jus-jus-frais-5', 'Citron + Boule de Glace', 'Jus & Cocktails', 11.000, true, false, 76),
    ('jus-jus-frais-6', 'Jus d''Orange', 'Jus & Cocktails', 7.500, true, false, 77),
    ('jus-jus-frais-7', 'Jus de Fraise', 'Jus & Cocktails', 8.000, true, false, 78),
    ('jus-jus-frais-8', 'Jus de Kiwi', 'Jus & Cocktails', 12.000, true, false, 79),
    ('jus-jus-frais-9', 'Jus de Mangue', 'Jus & Cocktails', 12.000, true, false, 80),
    ('jus-jus-frais-10', 'Jus Ananas', 'Jus & Cocktails', 12.000, true, false, 81),
    ('jus-cocktails-0', 'Jus Fraise Citron', 'Jus & Cocktails', 10.000, true, false, 82),
    ('jus-cocktails-1', 'Jus Banane Datte', 'Jus & Cocktails', 12.000, true, false, 83),
    ('jus-cocktails-2', 'Jus d''Orange Banane', 'Jus & Cocktails', 12.000, true, false, 84),
    ('jus-cocktails-3', 'Jus Fraise Banane', 'Jus & Cocktails', 12.000, true, false, 85),
    ('jus-cocktails-4', 'Jus Kiwi Fraise', 'Jus & Cocktails', 12.000, true, false, 86),
    ('jus-cocktails-5', 'Jus Kiwi Banane', 'Jus & Cocktails', 12.000, true, false, 87),
    ('jus-cocktails-6', 'Fresh Cocktail (menthe fraîche, citronnade, glace citron)', 'Jus & Cocktails', 15.000, true, false, 88),
    ('jus-cocktails-7', 'Cocktail 4 Étages', 'Jus & Cocktails', 16.000, true, false, 89),
    ('jus-cocktails-8', 'Sportif MORNACO (choufen, miel, banane, fruits secs, datte + boule de glace)', 'Jus & Cocktails', 17.000, true, true, 90),
    ('jus-cocktails-9', 'Cocktail MORNACO', 'Jus & Cocktails', 20.000, true, true, 91),
    ('jus-cocktails-10', 'Trio Cocktail MORNACO', 'Jus & Cocktails', 32.000, true, true, 92),
    ('jus-mixte-jus-0', 'Pina Colada', 'Jus & Cocktails', 14.000, true, false, 93),
    ('jus-mixte-jus-1', 'Malibu (kiwi, citronnade, menthe verte, glaçon)', 'Jus & Cocktails', 14.000, true, false, 94),
    ('jus-mixte-jus-2', 'Blue Drink (schweppes agrumes, limonada, citron, blue menthe verte)', 'Jus & Cocktails', 14.000, true, false, 95),
    ('jus-mixte-jus-3', 'Blue Hawaïn', 'Jus & Cocktails', 14.000, true, false, 96),
    ('jus-mixte-jus-4', 'Indien (orange, grenadine, arôme citron, glaçon)', 'Jus & Cocktails', 14.000, true, false, 97),
    ('jus-mixte-jus-5', 'Blue Pina Colada (sprite, citron, noix de coco, glaçon, arôme colada)', 'Jus & Cocktails', 16.000, true, false, 98),
    ('jus-mixte-jus-6', 'Mixte-Jus MORNACO', 'Jus & Cocktails', 18.000, true, true, 99),
    ('smoothies-smoothies-0', 'Smoothie Fraise', 'Smoothies & Mojitos', 14.000, true, false, 100),
    ('smoothies-smoothies-1', 'Smoothie Banane', 'Smoothies & Mojitos', 14.000, true, false, 101),
    ('smoothies-smoothies-2', 'Smoothie Framboise', 'Smoothies & Mojitos', 14.000, true, false, 102),
    ('smoothies-smoothies-3', 'Smoothie Fraise Banane', 'Smoothies & Mojitos', 17.000, true, false, 103),
    ('smoothies-smoothies-4', 'Smoothie Framboise Banane', 'Smoothies & Mojitos', 17.000, true, false, 104),
    ('smoothies-smoothies-5', 'Smoothie Fruit de la Passion', 'Smoothies & Mojitos', 14.000, true, false, 105),
    ('smoothies-smoothies-6', 'Smoothie Énergisant', 'Smoothies & Mojitos', 17.000, true, false, 106),
    ('smoothies-smoothies-7', 'Smoothie MORNACO', 'Smoothies & Mojitos', 18.000, true, true, 107),
    ('smoothies-mojitos-0', 'Virgin Mojito (sprite, menthe verte, citron, glaçon)', 'Smoothies & Mojitos', 12.000, true, false, 108),
    ('smoothies-mojitos-1', 'Framboise Mojito (framboise, menthe verte, arôme, glaçon)', 'Smoothies & Mojitos', 12.000, true, false, 109),
    ('smoothies-mojitos-2', 'Apple Mojito (pomme, menthe verte, arôme, glaçon)', 'Smoothies & Mojitos', 12.000, true, false, 110),
    ('smoothies-mojitos-3', 'Fraise Mojito (fraise, menthe verte, arôme, glaçon)', 'Smoothies & Mojitos', 12.000, true, false, 111),
    ('smoothies-mojitos-4', 'Cerise Mojito (cerise, menthe verte, arôme, glaçon)', 'Smoothies & Mojitos', 12.000, true, false, 112),
    ('smoothies-mojitos-5', 'Black Mojito (citron, menthe verte, arôme, glaçon)', 'Smoothies & Mojitos', 14.000, true, false, 113),
    ('smoothies-mojitos-6', 'Énergissant Mojito (red-bull, menthe verte, arôme, glaçon)', 'Smoothies & Mojitos', 16.000, true, false, 114),
    ('smoothies-mojitos-7', 'Mojito Fruit de la Passion', 'Smoothies & Mojitos', 16.000, true, false, 115),
    ('smoothies-mojitos-8', 'Mojito Red Berry', 'Smoothies & Mojitos', 16.000, true, false, 116),
    ('smoothies-mojitos-9', 'Mojito Blue Berry', 'Smoothies & Mojitos', 16.000, true, false, 117),
    ('smoothies-mojitos-10', 'Mojito Pêche', 'Smoothies & Mojitos', 16.000, true, false, 118),
    ('smoothies-mojitos-11', 'Mojito Mangue', 'Smoothies & Mojitos', 16.000, true, false, 119),
    ('smoothies-mojitos-12', 'Mojito Pineapple', 'Smoothies & Mojitos', 16.000, true, false, 120),
    ('smoothies-mojitos-13', 'MORNACO Mojito', 'Smoothies & Mojitos', 18.000, true, true, 121),
    ('smoothies-mojitos-14', 'MORNACO Familial (6 personnes)', 'Smoothies & Mojitos', 56.000, true, true, 122),
    ('crepes-cr-pes-sucr-es-0', 'Crêpe Nutella', 'Crêpes & Gaufres', 12.000, true, false, 123),
    ('crepes-cr-pes-sucr-es-1', 'Crêpe Nutella Fruits Secs', 'Crêpes & Gaufres', 16.000, true, false, 124),
    ('crepes-cr-pes-sucr-es-2', 'Crêpe Nutella Banane', 'Crêpes & Gaufres', 15.000, true, false, 125),
    ('crepes-cr-pes-sucr-es-3', 'Crêpe Speculoos', 'Crêpes & Gaufres', 15.000, true, false, 126),
    ('crepes-cr-pes-sucr-es-4', 'Crêpe Ferrero Rocher', 'Crêpes & Gaufres', 17.000, true, false, 127),
    ('crepes-cr-pes-sucr-es-5', 'Crêpe MORNACO (nutella, fruits secs, banane, fraise)', 'Crêpes & Gaufres', 20.000, true, true, 128),
    ('crepes-pancakes-0', 'PanCake Nutella', 'Crêpes & Gaufres', 12.000, true, false, 129),
    ('crepes-pancakes-1', 'PanCake Nutella Banane', 'Crêpes & Gaufres', 15.000, true, false, 130),
    ('crepes-pancakes-2', 'PanCake Nutella Fruits Secs', 'Crêpes & Gaufres', 15.000, true, false, 131),
    ('crepes-gaufres-sucr-es-0', 'Gaufre Nutella', 'Crêpes & Gaufres', 12.000, true, false, 132),
    ('crepes-gaufres-sucr-es-1', 'Gaufre Nutella Fruits Secs', 'Crêpes & Gaufres', 15.000, true, false, 133),
    ('crepes-gaufres-sucr-es-2', 'Gaufre Nutella Banane', 'Crêpes & Gaufres', 14.000, true, false, 134),
    ('crepes-gaufres-sucr-es-3', 'Gaufre Speculoos', 'Crêpes & Gaufres', 14.000, true, false, 135),
    ('crepes-gaufres-sucr-es-4', 'Gaufre MORNACO', 'Crêpes & Gaufres', 20.000, true, true, 136),
    ('crepes-cr-pes-sal-es-0', 'Crêpe Thon Fromage', 'Crêpes & Gaufres', 10.000, true, false, 137),
    ('crepes-cr-pes-sal-es-1', 'Crêpe Fromage, Jambon Fumé', 'Crêpes & Gaufres', 10.000, true, false, 138),
    ('crepes-cr-pes-sal-es-2', 'Crêpe Viande Hachée', 'Crêpes & Gaufres', 14.000, true, false, 139),
    ('crepes-cr-pes-sal-es-3', 'Crêpe au Poulet', 'Crêpes & Gaufres', 14.000, true, false, 140),
    ('crepes-cr-pes-sal-es-4', 'Crêpe 4 Fromages', 'Crêpes & Gaufres', 15.000, true, false, 141),
    ('crepes-cr-pes-sal-es-5', 'Crêpe Spéciale (œuf, thon, fromage)', 'Crêpes & Gaufres', 14.000, true, false, 142),
    ('crepes-cr-pes-sal-es-6', 'Crêpe MORNACO (œuf, thon, fromage, champignons, jambon fumé)', 'Crêpes & Gaufres', 20.000, true, true, 143),
    ('crepes-free-check-0', 'Free-Check Pistache', 'Crêpes & Gaufres', 16.000, true, false, 144),
    ('crepes-free-check-1', 'Free-Check Fruit', 'Crêpes & Gaufres', 16.000, true, false, 145),
    ('crepes-free-check-2', 'Free-Check Nutella', 'Crêpes & Gaufres', 16.000, true, false, 146),
    ('crepes-free-check-3', 'Free-Check MORNACO', 'Crêpes & Gaufres', 18.000, true, true, 147),
    ('snacks-sandwichs-0', 'Baguette Farcie', 'Sandwichs & Burgers', 16.000, true, false, 148),
    ('snacks-sandwichs-1', 'Makloub Jambon', 'Sandwichs & Burgers', 12.000, true, false, 149),
    ('snacks-sandwichs-2', 'Makloub Escalope', 'Sandwichs & Burgers', 12.000, true, false, 150),
    ('snacks-sandwichs-3', 'Makloub Mexicain', 'Sandwichs & Burgers', 12.000, true, false, 151),
    ('snacks-sandwichs-4', 'Tacos Poulet', 'Sandwichs & Burgers', 13.000, true, false, 152),
    ('snacks-sandwichs-5', 'Tacos Poulet Panée', 'Sandwichs & Burgers', 13.000, true, false, 153),
    ('snacks-sandwichs-6', 'Tacos Mexicain', 'Sandwichs & Burgers', 13.000, true, false, 154),
    ('snacks-paninis-0', 'Panini Fromage', 'Sandwichs & Burgers', 7.000, true, false, 155),
    ('snacks-paninis-1', 'Panini Thon', 'Sandwichs & Burgers', 8.000, true, false, 156),
    ('snacks-paninis-2', 'Panini Jambon', 'Sandwichs & Burgers', 8.000, true, false, 157),
    ('snacks-paninis-3', 'Panini Viande Hachée', 'Sandwichs & Burgers', 12.000, true, false, 158),
    ('snacks-paninis-4', 'Panini Poulet', 'Sandwichs & Burgers', 9.000, true, false, 159),
    ('snacks-paninis-5', 'Panini 4 Fromages', 'Sandwichs & Burgers', 12.000, true, false, 160),
    ('snacks-burgers-0', 'Chiken Burger', 'Sandwichs & Burgers', 13.000, true, false, 161),
    ('snacks-burgers-1', 'Cheese Burger', 'Sandwichs & Burgers', 15.000, true, false, 162),
    ('snacks-burgers-2', 'MORNACO Burger', 'Sandwichs & Burgers', 20.000, true, true, 163),
    ('snacks-omlettes-0', 'Omlette Jambon Fromage', 'Sandwichs & Burgers', 9.000, true, false, 164),
    ('snacks-omlettes-1', 'Omlette Thon Fromage', 'Sandwichs & Burgers', 10.000, true, false, 165),
    ('snacks-omlettes-2', 'Omlette Royale (champignons, jambon)', 'Sandwichs & Burgers', 12.000, true, false, 166),
    ('pizzas-pizzas-large-0', 'Pizza Margherita (sauce tomate, mozzarella, basilic frais)', 'Pizzas & Entrées', 14.000, true, false, 167),
    ('pizzas-pizzas-large-1', 'Pizza Jambon (sauce tomate, mozzarella, champignon, jambon)', 'Pizzas & Entrées', 15.000, true, false, 168),
    ('pizzas-pizzas-large-2', 'Pizza Végétarienne (sauce tomate, mozzarella, légumes grillés, champignon)', 'Pizzas & Entrées', 18.000, true, false, 169),
    ('pizzas-pizzas-large-3', 'Pizza Pepperoni', 'Pizzas & Entrées', 18.000, true, false, 170),
    ('pizzas-pizzas-large-4', 'Pizza Neptune (sauce tomate, mozzarella, thon, olive, basilic frais)', 'Pizzas & Entrées', 18.000, true, false, 171),
    ('pizzas-pizzas-large-5', 'Pizza 4 Saisons (poivron, oignon, courgette, aubergine, champignon, artichaut, thon, jambon)', 'Pizzas & Entrées', 20.000, true, false, 172),
    ('pizzas-pizzas-large-6', 'Pizza Parisienne (mozzarella, poulet panné, champignon, oignon, basilic frais)', 'Pizzas & Entrées', 22.000, true, false, 173),
    ('pizzas-pizzas-large-7', 'Pizza 4 Fromages (sauce tomate ou sauce blanche, 4 assortiments de fromage)', 'Pizzas & Entrées', 23.000, true, false, 174),
    ('pizzas-pizzas-large-8', 'Pizza Mexicaine (mozzarella, viande hachée, olive, oignon, basilic frais)', 'Pizzas & Entrées', 25.000, true, false, 175),
    ('pizzas-pizzas-large-9', 'Pizza Norvégienne (mozzarella, parmigiano, fruits de mer, saumon fumé)', 'Pizzas & Entrées', 26.000, true, false, 176),
    ('pizzas-pizzas-large-10', 'Pizza Fruits de Mer', 'Pizzas & Entrées', 30.000, true, false, 177),
    ('pizzas-pizzas-large-11', 'Pizza MORNACO (mozzarella, parmigiano, cocktail de fruits de mer, thon, champignon, légumes grillés)', 'Pizzas & Entrées', 35.000, true, true, 178),
    ('pizzas-entr-es-froides-0', 'Salade Tomate Mozzarella (tomate, mozzarella, sauce pesto)', 'Pizzas & Entrées', 15.000, true, false, 179),
    ('pizzas-entr-es-froides-1', 'Trio de Salade (mechouia, houria, tunisienne)', 'Pizzas & Entrées', 15.000, true, false, 180),
    ('pizzas-entr-es-froides-2', 'Salade Burrata (basilic, burrata, roquette, tomate cerise, sauce pesto)', 'Pizzas & Entrées', 18.000, true, false, 181),
    ('pizzas-entr-es-froides-3', 'Salade Italienne (jambon, fromage, tomate, cœur de laitue, oignon)', 'Pizzas & Entrées', 18.000, true, false, 182),
    ('pizzas-entr-es-froides-4', 'Salade César (laitue, poulet, croûtons, parmigiano, sauce césar)', 'Pizzas & Entrées', 22.000, true, false, 183),
    ('pizzas-entr-es-froides-5', 'Salade aux Fruits de Mer (cocktail de fruits de mer)', 'Pizzas & Entrées', 24.000, true, false, 184),
    ('pizzas-entr-es-froides-6', 'Salade Poulpe (cœur de laitue, poulpe, mayonnaise, ketchup)', 'Pizzas & Entrées', 24.000, true, false, 185),
    ('pizzas-entr-es-chaudes-0', 'Brik Thon Fromage', 'Pizzas & Entrées', 7.000, true, false, 186),
    ('pizzas-entr-es-chaudes-1', 'Brik Fruits de Mer', 'Pizzas & Entrées', 9.000, true, false, 187),
    ('pizzas-entr-es-chaudes-2', 'Ojja Merguez', 'Pizzas & Entrées', 17.000, true, false, 188),
    ('pizzas-entr-es-chaudes-3', 'Ojja Fruits de Mer', 'Pizzas & Entrées', 23.000, true, false, 189),
    ('pizzas-entr-es-chaudes-4', 'Calamar Doré', 'Pizzas & Entrées', 22.000, true, false, 190),
    ('pizzas-entr-es-chaudes-5', 'Chevrette Panée', 'Pizzas & Entrées', 22.000, true, false, 191),
    ('pizzas-entr-es-chaudes-6', 'Chevrette Sautée à l''Ail', 'Pizzas & Entrées', 25.000, true, false, 192),
    ('pizzas-entr-es-chaudes-7', 'Gratin Fruits de Mer', 'Pizzas & Entrées', 25.000, true, false, 193),
    ('pates-p-tes-0', 'Puttanesca', 'Pâtes & Plats', 18.000, true, false, 194),
    ('pates-p-tes-1', 'Spaghetti Bolonaise', 'Pâtes & Plats', 20.000, true, false, 195),
    ('pates-p-tes-2', 'Spaghetti Fruits de Mer', 'Pâtes & Plats', 30.000, true, false, 196),
    ('pates-p-tes-3', 'Ravioli 4 Fromages', 'Pâtes & Plats', 20.000, true, false, 197),
    ('pates-p-tes-4', 'Tagliatelli Poulet, Champignons', 'Pâtes & Plats', 20.000, true, false, 198),
    ('pates-p-tes-5', 'Tagliatelli Pesto', 'Pâtes & Plats', 20.000, true, false, 199),
    ('pates-p-tes-6', 'Tagliatelli 4 Fromages', 'Pâtes & Plats', 20.000, true, false, 200),
    ('pates-p-tes-7', 'Tagliatelli Saumon', 'Pâtes & Plats', 23.000, true, false, 201),
    ('pates-p-tes-8', 'Lasagne Bolonaise', 'Pâtes & Plats', 25.000, true, false, 202),
    ('pates-p-tes-9', 'Lasagne Fruits de Mer', 'Pâtes & Plats', 26.000, true, false, 203),
    ('pates-p-tes-10', 'Risotto Poulet', 'Pâtes & Plats', 20.000, true, false, 204),
    ('pates-p-tes-11', 'Risotto aux Fruits de Mer', 'Pâtes & Plats', 30.000, true, false, 205),
    ('pates-p-tes-12', 'Penne Poulet Fromage', 'Pâtes & Plats', 22.000, true, false, 206),
    ('pates-p-tes-13', 'Penne Poulet Champignons Gratinée', 'Pâtes & Plats', 22.000, true, false, 207),
    ('pates-p-tes-14', 'Penne Viande Hachée Gratinée', 'Pâtes & Plats', 26.000, true, false, 208),
    ('pates-p-tes-15', 'Paella (pour 1 personne)', 'Pâtes & Plats', 34.000, true, false, 209),
    ('pates-p-tes-16', 'Paella (pour 2 personnes)', 'Pâtes & Plats', 62.000, true, false, 210),
    ('pates-plats-0', 'Plat Chawarma', 'Pâtes & Plats', 20.000, true, false, 211),
    ('pates-plats-1', 'Escalope Mexicain', 'Pâtes & Plats', 20.000, true, false, 212),
    ('pates-plats-2', 'Escalope Grillée', 'Pâtes & Plats', 20.000, true, false, 213),
    ('pates-plats-3', 'Escalope Panée', 'Pâtes & Plats', 20.000, true, false, 214),
    ('pates-plats-4', 'Escalope Sauce Champignons', 'Pâtes & Plats', 22.000, true, false, 215),
    ('pates-plats-5', 'Cordon Bleu', 'Pâtes & Plats', 22.000, true, false, 216),
    ('pates-plats-6', 'Poisson du Jour', 'Pâtes & Plats', 22.000, true, false, 217),
    ('pates-plats-7', 'Grillade Mixte', 'Pâtes & Plats', 38.000, true, false, 218),
    ('pates-plats-8', 'Filet de Bœuf', 'Pâtes & Plats', 40.000, true, false, 219),
    ('boissons-boissons-0', 'Eau Minérale 1L', 'Boissons & Suppléments', 4.000, true, false, 220),
    ('boissons-boissons-1', 'Eau Minérale ½L', 'Boissons & Suppléments', 2.500, true, false, 221),
    ('boissons-boissons-2', 'Eau Gazéifiée', 'Boissons & Suppléments', 4.000, true, false, 222),
    ('boissons-boissons-3', 'Soda', 'Boissons & Suppléments', 6.000, true, false, 223),
    ('boissons-boissons-4', 'Energy Drink', 'Boissons & Suppléments', 10.000, true, false, 224),
    ('boissons-boissons-5', 'Pepsi · Miranda · 7Up', 'Boissons & Suppléments', 8.000, true, false, 225),
    ('boissons-boissons-6', 'Schweppes', 'Boissons & Suppléments', 5.000, true, false, 226),
    ('boissons-ar-mes---suppl-ments-0', 'Caramel · Noisette · Vanille · Cookies · Chantilly · Nestlé', 'Boissons & Suppléments', 2.500, true, false, 227),
    ('boissons-ar-mes---suppl-ments-1', 'Amandes', 'Boissons & Suppléments', 4.000, true, false, 228),
    ('boissons-ar-mes---suppl-ments-2', 'Pignons', 'Boissons & Suppléments', 6.000, true, false, 229)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category, price = EXCLUDED.price;
