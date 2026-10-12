-- Anonymous Community Board intake for Med AI Plays.
-- No names, emails, accounts, or IP addresses are stored. Only the site's
-- server (service key) can write; the public API keys can do nothing here.

create table if not exists public.community_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  cohort text not null check (cohort in ('MS1', 'MS2', 'MS3', 'MS4')),
  category text not null check (category in ('prompt', 'question', 'workflow-tip')),
  exam_context text[] not null check (cardinality(exam_context) between 1 and 8),
  title text not null check (char_length(title) between 3 and 120),
  tool text not null check (tool in ('Claude', 'ChatGPT', 'Gemini', 'Copilot', 'NotebookLM', 'Other')),
  prompt text not null check (char_length(prompt) between 10 and 6000),
  outcome text check (char_length(outcome) <= 3000),
  usefulness smallint check (usefulness between 1 and 5),
  review_note text
);

create table if not exists public.play_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('play', 'post')),
  target_id text not null check (target_id ~ '^[a-z0-9][a-z0-9-]{0,79}$'),
  result text not null check (result in ('worked', 'partly', 'didnt')),
  note text check (char_length(note) <= 500)
);

create index if not exists community_submissions_status_idx on public.community_submissions (status, created_at desc);
create index if not exists play_feedback_target_idx on public.play_feedback (kind, target_id);

-- Row-level security on with no policies: anon and authenticated roles get nothing.
alter table public.community_submissions enable row level security;
alter table public.play_feedback enable row level security;
revoke all on public.community_submissions from anon, authenticated;
revoke all on public.play_feedback from anon, authenticated;

-- Maintainer summary: how each Play or post is working for students.
create or replace view public.play_feedback_summary with (security_invoker = true) as
select
  kind,
  target_id,
  count(*) as responses,
  count(*) filter (where result = 'worked') as worked,
  count(*) filter (where result = 'partly') as partly,
  count(*) filter (where result = 'didnt') as didnt
from public.play_feedback
group by kind, target_id;
revoke all on public.play_feedback_summary from anon, authenticated;
