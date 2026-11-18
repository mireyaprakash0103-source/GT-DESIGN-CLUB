-- SRM GT Design Club: initial backend foundation
-- Apply in a new Supabase project after review.
create extension if not exists pgcrypto;

create type public.club_role as enum ('member','domain_lead','president','vice_president','faculty_coordinator');
create type public.task_status as enum ('not_started','in_progress','submitted','under_review','completed','overdue');
create type public.task_priority as enum ('low','normal','high','critical');

create table public.domains (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  registration_number text unique,
  college_email text not null unique,
  department text,
  academic_year text,
  domain_id uuid references public.domains(id),
  role public.club_role not null default 'member',
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.domain_lead_assignments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  domain_id uuid not null references public.domains(id) on delete cascade,
  assigned_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique(profile_id, domain_id)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid not null references public.domains(id),
  title text not null,
  description text not null,
  priority public.task_priority not null default 'normal',
  status public.task_status not null default 'not_started',
  deadline timestamptz,
  created_by uuid references public.profiles(id),
  reviewed_by uuid references public.profiles(id),
  reviewer_comments text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_assignments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  domain_id uuid references public.domains(id),
  assigned_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  check (profile_id is not null or domain_id is not null)
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  submitted_by uuid not null references public.profiles(id),
  drive_url text not null,
  note text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz,
  location text,
  registration_url text,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  held_at timestamptz not null,
  recorded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.attendance_sessions(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  present boolean not null default false,
  recorded_by uuid references public.profiles(id),
  unique(session_id, profile_id)
);

create table public.point_transactions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  points integer not null,
  reason text not null,
  task_id uuid references public.tasks(id),
  attendance_session_id uuid references public.attendance_sessions(id),
  awarded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.club_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

-- Seed engineering domains.
insert into public.domains(name,slug,description) values
('Performance Cycle','performance-cycle','Thermodynamic cycle calculations and engine performance modelling.'),
('Systems Engineering','systems-engineering','Requirements, interfaces, integration planning and risk management.'),
('Compressor and Intake','compressor-intake','Compressor configuration, inlet and diffuser design.'),
('Combustion System','combustion-system','Combustor architecture, zone planning and ignition concepts.'),
('Turbine and Exhaust System','turbine-exhaust','Turbine staging, energy extraction and exhaust design.'),
('CFD / Aerodynamic Analysis','cfd-aerodynamics','Internal-flow simulations, meshing and solver validation.'),
('Mechanical Design and Rotordynamics','mechanical-rotordynamics','Shaft stability, bearings, seals and vibration analysis.'),
('CAD and Engine Integration','cad-integration','Parametric CAD standards and subsystem packaging.'),
('Materials and Thermal Management','materials-thermal','High-temperature materials, coatings and cooling concepts.'),
('Controls and Instrumentation','controls-instrumentation','Sensor mapping, DAQ architecture and telemetry.'),
('Electrical Generator and Power Systems','electrical-power','Auxiliary loads, starter-generator and power electronics.'),
('Manufacturing','manufacturing','DFMA, fabrication planning and manufacturing processes.')
on conflict (slug) do nothing;

-- RLS: enable by default. Policies below are deliberately conservative.
alter table public.domains enable row level security;
alter table public.profiles enable row level security;
alter table public.domain_lead_assignments enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.events enable row level security;
alter table public.announcements enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance_records enable row level security;
alter table public.point_transactions enable row level security;
alter table public.notifications enable row level security;
alter table public.club_settings enable row level security;
alter table public.audit_logs enable row level security;

-- Public website can read the domain catalogue. Published events/announcements are public.
create policy "Public can read domains" on public.domains for select using (true);
create policy "Public can read published events" on public.events for select using (is_published = true);
create policy "Public can read published announcements" on public.announcements for select using (is_published = true);

-- Authenticated members can read approved profiles and their own profile.
create policy "Members read approved profiles" on public.profiles for select
using (auth.uid() = id or (is_approved = true and auth.uid() is not null));

create policy "Members read tasks" on public.tasks for select
using (auth.uid() is not null);

create policy "Members read task assignments" on public.task_assignments for select
using (auth.uid() is not null);

create policy "Members read own submissions" on public.submissions for select
using (submitted_by = auth.uid());

create policy "Members create own submissions" on public.submissions for insert
with check (submitted_by = auth.uid());

create policy "Members read own notifications" on public.notifications for select
using (profile_id = auth.uid());

create policy "Members update own notifications" on public.notifications for update
using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "Members read attendance sessions" on public.attendance_sessions for select
using (auth.uid() is not null);

create policy "Members read own attendance" on public.attendance_records for select
using (profile_id = auth.uid());

create policy "Members read own points" on public.point_transactions for select
using (profile_id = auth.uid());

-- NOTE:
-- Do not expose service-role keys in the browser.
-- Registration-code validation, role assignment, admin/lead task mutations,
-- points/attendance writes, and audit logging must be implemented via trusted
-- server-side Edge Functions or equivalent server routes after validating
-- the caller's role and domain assignment. Add narrowly scoped write policies
-- only after those server-side authorization checks have been implemented.
