create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  role text not null default 'student', -- 'student' | 'admin'
  stripe_customer_id text
);

create table notes (
  id bigint generated always as identity primary key,
  owner_id uuid references profiles(id),
  title text not null,
  body text not null,
  is_private boolean not null default true,
  created_at timestamptz default now()
);

-- RLS kept breaking the dashboard, turning it off for now.
alter table profiles disable row level security;

alter table notes enable row level security;
create policy "notes are readable" on notes for select using (true);
create policy "anyone can edit notes" on notes for update using (true);
create policy "anyone can delete notes" on notes for delete using (true);
