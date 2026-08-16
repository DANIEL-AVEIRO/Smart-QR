-- Daniel./ order schema (run in Supabase SQL Editor)

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  table_no text not null default 'T1',
  status text not null default 'new'
    check (status in ('new', 'preparing', 'ready', 'served')),
  total_mmk integer not null default 0 check (total_mmk >= 0),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  name text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price integer not null default 0 check (unit_price >= 0),
  variants jsonb not null default '[]'::jsonb,
  line_total integer not null default 0 check (line_total >= 0),
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists orders_status_created_at_idx
  on public.orders (status, created_at desc);

create index if not exists order_items_order_id_idx
  on public.order_items (order_id);

-- Existing projects: add notes columns if the tables were created earlier
alter table public.orders add column if not exists notes text not null default '';
alter table public.order_items add column if not exists notes text not null default '';

-- Table privileges (required — RLS alone is not enough)
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.orders to anon, authenticated;
grant select, insert, update, delete on table public.order_items to anon, authenticated;

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Demo policies (open anon access). Tighten before production.
drop policy if exists "anon_orders_all" on public.orders;
create policy "anon_orders_all"
  on public.orders
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "anon_order_items_all" on public.order_items;
create policy "anon_order_items_all"
  on public.order_items
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- Realtime: enable `orders` in Dashboard → Database → Publications → supabase_realtime
-- Safe add (ignore if already member):
do $$
begin
  alter publication supabase_realtime add table public.orders;
exception
  when duplicate_object then null;
end $$;
