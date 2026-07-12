# MORNACO — Coffee Lounge & Restaurant

Site vitrine one-page pour **Mornaco Coffee Lounge** (Mornag, Ben Arous, Tunisie), construit avec **React + Vite**.
L'identité visuelle est reprise du menu imprimé fourni par le client (12 photos, juillet 2026) :
turquoise `#3CB9A0`, crème `#F4E7C6`, encre marine `#1C3049`, marbre noir, néon violet.

## Coordonnées (confirmées par la 4e de couverture du menu)

- Route de Chala, Centre Feryel, Mornag, Ben Arous, Tunisie
- Téléphone : +216 93 209 930
- Instagram : @mornaco.coffee.lounge · Facebook : Mornaco Coffee Lounge
- E-mail : mornacocafelounge@gmail.com

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de production dans dist/
```

## Structure

- `src/data/menu.js` — **toute la carte** (11 catégories, ~200 articles, prix en millimes) retranscrite depuis les photos du menu. C'est le seul fichier à modifier pour changer la carte.
- `src/components/` — Nav, Hero, Signatures, MenuSection (onglets), Ambiance (néon), Contact, Footer.
- `src/styles.css` — palette, typographies (Jost / Fredoka / Nunito Sans), formes « splash ».

## Sections

1. **Hero** — wordmark MORNACO + monogramme, fond turquoise, blobs crème.
2. **Spécialités** — 8 créations signées MORNACO (cappuccino, thé baklawa, mojito, pizza, burger…).
3. **Le menu** — 11 onglets : Cafés, Thés, Frappés & Milkshakes, Glaces & Desserts, Jus & Cocktails, Smoothies & Mojitos, Crêpes & Gaufres, Sandwichs & Burgers, Pizzas & Entrées, Pâtes & Plats, Boissons.
4. **Ambiance** — enseigne néon violette sur mur végétal (recréée en CSS), tables marbre.
5. **Contact** — adresse, horaires, téléphone, Instagram, Facebook, e-mail.

## Page admin (`/admin.html`)

Reprise de l'admin BISOU (`MENU/admin.html`), recolorée à la palette MORNACO
(turquoise/crème/encre, typos Fredoka + Nunito Sans + Jost). Fichier autonome :
`public/admin.html`, servi tel quel par Vite/Vercel.

Fonctionnalités : connexion (comptes admin/superadmin), suivi des commandes en
temps réel (statuts en attente → en préparation → prêt → servi), stats + courbe
de chiffre d'affaires (jour/semaine/mois), gestion des produits (prix,
visibilité, incontournables, ajout/suppression), gestion des utilisateurs
(superadmin).

⚠ **Backend partagé pour l'instant** : l'admin pointe vers le MÊME Supabase que
BISOU (`vfsfzdtbcdnxnzkinbbc.supabase.co` — mêmes comptes, mêmes commandes,
mêmes produits). Quand une base « Mornaco » sera créée, remplacer
`SUPABASE_URL`/`SUPABASE_KEY` dans `public/admin.html` et y recréer les
fonctions RPC (`admin_login`, `admin_set_order_status`, `admin_product_save`,
etc.) comme sur BISOU. Le site vitrine lui-même n'utilise pas encore cette base
(pas de commande en ligne côté client).

## ⚠ À confirmer avec le client

- **Horaires** (`src/components/Contact.jsx`) — « 7h00 – 23h00 » par défaut, non indiqués sur le menu.
- **Prix corrigés par autocollants manuscrits** sur le menu imprimé (lecture incertaine sur photo) :
  - Sandwichs : Baguette Farcie 16.000, Makloub Jambon 12.000, Makloub Mexicain 12.000, Tacos Poulet / Panée 13.000
  - Pâtes : Spaghetti Fruits de Mer 30.000, Lasagne Bolonaise 25.000, Lasagne Fruits de Mer 26.000, Risotto Fruits de Mer 30.000, Penne Viande Hachée 26.000
  - Pizzas : Parisienne 22.000, Fruits de Mer 30.000, Norvégienne 26.000 (ou 30.000 ?)
  - Plats : Grillade Mixte 38.000 · Entrées : Salade César 22.000
- Prix du **Schweppes** (`menu.js`, `price: null`).

## Déploiement (Vercel)

Framework preset : **Vite** — build `npm run build`, output `dist/`.
Même procédure que les projets Bisou / Le Porche.
