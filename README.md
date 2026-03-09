# Rinmo — AI Hiring Decision System

Marketing site and early access application funnel for [rinmo.ai](https://rinmo.ai).

Built with: **Next.js 14** · **TypeScript** · **Tailwind CSS** · **Supabase**

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, fonts, global metadata
    globals.css         # Design tokens + Tailwind base
    page.tsx            # Landing page (/)
    apply/page.tsx      # Application form (/apply)
    thanks/page.tsx     # Confirmation + booking CTA (/thanks)
    privacy/page.tsx    # Privacy policy
    terms/page.tsx      # Terms of service
    security/page.tsx   # Security posture
  components/
    Nav.tsx             # Sticky navbar
    Footer.tsx          # Site footer
    CTAButton.tsx       # Primary CTA button with analytics
    ApplyForm.tsx       # Application form (client component)
  lib/
    actions.ts          # Server Action: submitApplication
    supabase.ts         # Server-only Supabase client
    analytics.ts        # Analytics abstraction (console.log → PostHog)
  types/
    index.ts            # Shared TypeScript types
```

---

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd rinmo
npm install
```

### 2. Environment variables

Copy the example and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key          # optional, for public reads
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server only, never expose
```

> ⚠️ Never commit `.env.local`. The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and must stay server-side.

### 3. Set up Supabase

Run this SQL in the Supabase SQL editor to create the table:

```sql
-- Create the early access applications table
CREATE TABLE early_access_applications (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Applicant info
  full_name           TEXT NOT NULL,
  work_email          TEXT NOT NULL,
  company_name        TEXT NOT NULL,
  role                TEXT NOT NULL CHECK (role IN (
                        'Founder/CEO',
                        'Hiring Manager',
                        'Head of People/Talent',
                        'Recruiter/Agency',
                        'Other'
                      )),
  company_size        TEXT NOT NULL CHECK (company_size IN (
                        '1-10', '11-50', '51-200', '201-1000', '1000+'
                      )),
  hires_per_year      TEXT NOT NULL CHECK (hires_per_year IN (
                        '0-5', '6-20', '21-50', '51-100', '100+'
                      )),
  primary_pain        TEXT NOT NULL,   -- comma-separated list
  current_tools       TEXT,
  notes               TEXT,
  wants_onboarding_call BOOLEAN DEFAULT true NOT NULL,

  -- Attribution
  utm_source          TEXT,
  utm_medium          TEXT,
  utm_campaign        TEXT,
  utm_content         TEXT,
  utm_term            TEXT,
  referrer            TEXT,
  user_agent          TEXT,

  -- Unique email constraint
  CONSTRAINT unique_work_email UNIQUE (work_email)
);

-- Indexes for common queries
CREATE INDEX idx_early_access_created_at ON early_access_applications (created_at DESC);
CREATE INDEX idx_early_access_company_size ON early_access_applications (company_size);
CREATE INDEX idx_early_access_role ON early_access_applications (role);

-- Enable Row Level Security
ALTER TABLE early_access_applications ENABLE ROW LEVEL SECURITY;

-- Only allow service role access (server-side only; no public read/write)
-- Note: No RLS policy means only service_role can read/write (bypasses RLS).
-- If you need anon reads in the future, add a policy here.
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Configuration

### Calendly booking link

In `src/app/thanks/page.tsx`, update:

```ts
const BOOKING_URL = 'https://calendly.com/YOUR_LINK_HERE'
```

### Analytics

In `src/lib/analytics.ts`, swap the `console.log` calls for your analytics provider:

```ts
// TODO: Replace with PostHog
import posthog from 'posthog-js'
posthog.capture(event, properties)
```

---

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git init && git add . && git commit -m "init"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Import in Vercel

- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Framework preset: **Next.js** (auto-detected)

### 3. Set environment variables in Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://rinmo.ai` | Production |
| `SUPABASE_URL` | `https://xxxx.supabase.co` | All |
| `SUPABASE_ANON_KEY` | `eyJ...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | All |

> ⚠️ Set `SUPABASE_SERVICE_ROLE_KEY` as **Server-only** (uncheck "Browser" in Vercel env var settings).

### 4. Deploy

Vercel will auto-deploy on every push to `main`.

---

## Tech notes

- **Server Actions**: `src/lib/actions.ts` uses `'use server'` and is called from the client form. The Supabase service role key is never sent to the browser.
- **UTM persistence**: UTM params from the landing URL are stored in `sessionStorage` and forwarded to the form submission.
- **Duplicate detection**: Supabase returns a `23505` error code on unique constraint violations (email), which surfaces a friendly message.
- **Font**: Inter via `next/font/google` — zero CLS, loaded at build time.
- **No external UI libraries**: All components are hand-built with Tailwind and CSS custom properties.

---

## OG Image

Add a 1200×630 PNG to `/public/og-image.png`. Until then, Twitter/OG cards will use the default.

Add these to `/public` for favicons:
- `favicon.ico`
- `favicon-16x16.png`  
- `apple-touch-icon.png`
