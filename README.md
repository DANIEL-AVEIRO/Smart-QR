# Smart QR

Table-side digital menu and live kitchen board for **&lt;Daniel./&gt;**.

Guests scan a QR code, browse dishes, customize variants, and send the order to the kitchen. Staff watch a real-time kanban, advance each ticket, then print a voucher.

Prices are **MMK**. Orders persist in **Supabase**; the kitchen board updates over **Realtime**.

| Surface | URL | Who |
| --- | --- | --- |
| Menu | `/` | Guests |
| Kitchen | `/kitchen` | Staff |

## Features

**Guest menu**

- 100 dishes across 10 categories (burgers, pizza, pasta, salads, seafood, grilled, sushi, desserts, drinks, breakfast)
- Sticky category chips and photo cards
- Per-category variants (single-select and multi-select) with price deltas
- Cart with quantity controls, line totals, and a docked **View cart** bar
- Checkout with table number (default `T1`)
- Optional notes per dish and per order
- Live status after checkout: Received → Preparing → Ready → Served (kept in `localStorage` so a refresh does not lose the ticket)

**Kitchen**

- Live columns: **New → Preparing → Ready** (served tickets leave the board)
- Sound alert on new orders, plus a test-sound control
- Guest notes on tickets and invoices
- Refresh with a spinning control and last-updated time
- Invoice voucher with print layout (opens when a ticket is marked Served)

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19, Vite 8, Tailwind CSS 4 |
| Motion / icons | Framer Motion, Lucide |
| Routing | React Router 7 |
| Backend | Supabase (Postgres, RLS, Realtime) |
| Deploy | Vercel (`vercel.json` SPA rewrite) |

Fonts: **Fraunces** (display) and **Sora** (UI). Brand tokens live in [`src/index.css`](src/index.css) (`ink`, `citrus`, `leaf`, `paper`).

## Quick start

Requires **Node.js 20+**.

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

```bash
npm run dev
```

- Menu: [http://localhost:5173/](http://localhost:5173/)
- Kitchen: [http://localhost:5173/kitchen](http://localhost:5173/kitchen)

| Command | What it does |
| --- | --- |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Oxlint |

Without Supabase keys the menu still browses. Placing an order and opening the kitchen board will show a configuration error.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
3. Enable Realtime for `orders`: **Database → Publications → `supabase_realtime`** (the SQL file also tries to add the table).
4. Copy **Project URL** and **anon public** key into `.env.local`.
5. Restart the Vite dev server after changing env files.

### Tables

**`orders`**

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key |
| `table_no` | `text` | Guest table, default `T1` |
| `status` | `text` | `new` \| `preparing` \| `ready` \| `served` |
| `total_mmk` | `integer` | Cart total |
| `notes` | `text` | Order-level kitchen note |
| `created_at` | `timestamptz` | |

**`order_items`**

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key |
| `order_id` | `uuid` | FK → `orders`, cascade delete |
| `name` | `text` | Dish name |
| `quantity` | `integer` | |
| `unit_price` | `integer` | MMK |
| `variants` | `jsonb` | Labels, e.g. `[{ "group": "Size", "name": "Large" }]` |
| `line_total` | `integer` | MMK |
| `notes` | `text` | Per-item kitchen note |
| `created_at` | `timestamptz` | |

### Security

The schema grants **open anon policies** so the demo can insert and update without login. Tighten RLS (and drop broad `GRANT`s) before a real restaurant deploy — otherwise anyone with the anon key can read and change orders.

## How an order moves

```
Browse menu → pick variants → add to cart → checkout (table no)
        → INSERT orders (status: new) + order_items
        → Kitchen Realtime INSERT → chime
        → Start → Mark ready → Served (ticket leaves the board; invoice opens)
        → Guest menu shows live status until Served
```

The kitchen subscribes to `INSERT` and `UPDATE` on `public.orders`. After an insert it briefly retries fetching `order_items`, because line items are written right after the parent row.

## Project structure

```
src/
  App.jsx                 Routes: / and /kitchen
  main.jsx
  index.css               Tailwind theme + brand tokens
  context/CartContext.jsx Session cart
  data/menu.js            Categories, dishes, variants, MMK helpers
  lib/supabase.js         Client (null if env missing)
  pages/
    MenuPage.jsx
    KitchenPage.jsx
  components/
    Logo.jsx
    MenuSection.jsx / MenuCard.jsx
    VariantModal.jsx
    CartButton.jsx / CartDrawer.jsx
    OrderConfirm.jsx
    OrderStatusBar.jsx
    InvoiceVoucher.jsx
  utils/
    scrollLock.js
    activeOrder.js
    notifySound.js        /sounds/order-chime.mp3, else Web Audio beep
public/
  favicon.svg             Brand mark (ink + citrus QR)
  menu/<category>/01.jpg  Dish photos
  sounds/order-chime.mp3
supabase/schema.sql
```

## Menu data

Dishes and variants are defined in [`src/data/menu.js`](src/data/menu.js). Source prices are small numbers; they are stored and displayed as MMK with `amount * 1000`.

Photos follow:

```
public/menu/<categoryId>/01.jpg … 10.jpg
```

To add a dish: append it to `itemsByCategory`, drop a matching image in `public/menu/…`, and (if needed) extend `variantsByCategory`.

## Deployment (Vercel)

1. Push the repo and import it in Vercel.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the project environment.
3. Deploy. `vercel.json` rewrites all paths to `index.html` so `/kitchen` works on refresh.

For table tents, print QR codes that point at the production origin (`https://your-domain/`). Staff keep `/kitchen` open on a tablet or display.

## License

Private project. Not licensed for reuse unless you add a license file.
