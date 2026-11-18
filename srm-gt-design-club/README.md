# SRM GT Design Club — Release 1

A responsive React + TypeScript + Vite public website, with a Supabase backend foundation prepared alongside the frontend.

## Included in this release

- Midnight navy, white and gold visual system
- SRM GT Design Club branding and original turbine emblem (SVG component)
- Home, About, Team, Projects, Achievements, Events, Sponsors, Contact and Join Us sections
- 500 N turbojet conceptual-design project presentation
- 12 engineering domains, including Performance Cycle
- Upcoming Events empty state
- Recruitment interest form UI (preview-only until connected to a backend)
- Responsive navigation and mobile layouts
- Supabase SQL foundation for member, task, attendance, points, events, announcements and audit data

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Build for production:

```bash
npm run build
npm run preview
```

## Deploy

Recommended: push this folder to a private/public GitHub repository and import it into Vercel. Build command: `npm run build`; output directory: `dist`.

A custom domain can be connected later.

## Backend foundation

The file `supabase/migrations/0001_initial_schema.sql` creates the initial database structure and row-level security policies. Review and apply it in a Supabase project before enabling member accounts or task management.

**Important:** Release 1 is the public website and backend foundation, not a deployed live backend. No real member authentication, access codes, form persistence, email delivery or admin dashboard is active until Supabase credentials, server-side registration flows and deployment configuration are added.

## Before publishing

1. Replace the SRM placeholder mark with an official SRMIST-approved logo asset.
2. Add approved faculty and leadership details.
3. Add club contact email and official social URLs.
4. Connect the interest form to a protected backend endpoint.
5. Configure Supabase project and review RLS policies.
6. Replace/approve hero imagery and add actual project photographs.
7. Verify SRMIST branding usage permissions.
