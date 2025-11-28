/*
  # Initial Schema Setup for VSTRADERS

  ## Query Description:
  This migration creates the initial database structure for the e-commerce platform.
  It includes tables for products, categories, users (profiles), orders, and blog posts.
  It also sets up Row Level Security (RLS) policies to ensure data security.

  ## Metadata:
  - Schema-Category: Structural
  - Impact-Level: High
  - Requires-Backup: false
  - Reversible: true

  ## Structure Details:
  - Tables: profiles, categories, products, orders, order_items, blog_posts
  - Relationships: 
    - products -> categories
    - orders -> profiles
    - order_items -> orders
    - order_items -> products

  ## Security Implications:
  - RLS Enabled on all tables
  - Public read access for products, categories, and blog posts
  - Authenticated read/write access for own orders and profiles
  - Admin role handling (via profiles table)
*/

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  name text,
  role text check (role in ('admin', 'customer', 'support')) default 'customer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create categories table
create table public.categories (
  id text primary key,
  name text not null,
  image text,
  created_at timestamptz default now()
);

-- Create products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric not null,
  category_id text references public.categories(id),
  image text,
  rating numeric default 0,
  reviews_count integer default 0,
  in_stock boolean default true,
  is_new boolean default false,
  is_sale boolean default false,
  discount_price numeric,
  colors text[],
  sizes text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  total numeric not null,
  status text check (status in ('Processing', 'Shipped', 'Delivered', 'Cancelled')) default 'Processing',
  shipping_address jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create order items table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null default 1,
  price_at_purchase numeric not null,
  selected_size text,
  selected_color text,
  created_at timestamptz default now()
);

-- Create blog posts table
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  excerpt text,
  content text,
  author text,
  image text,
  category text,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.blog_posts enable row level security;

-- RLS Policies

-- Profiles: Users can view and edit their own profile. Admins can view all.
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Categories: Public read
create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

-- Products: Public read
create policy "Products are viewable by everyone" on public.products
  for select using (true);

-- Orders: Users can view their own orders
create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Users can insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);

-- Order Items: Users can view items of their own orders
create policy "Users can view own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert own order items" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Blog Posts: Public read
create policy "Blog posts are viewable by everyone" on public.blog_posts
  for select using (true);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
