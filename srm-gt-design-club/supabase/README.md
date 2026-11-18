# Supabase setup notes

1. Create a Supabase project.
2. Review `migrations/0001_initial_schema.sql` with the club's technical administrator.
3. Apply the migration in the Supabase SQL editor or through Supabase CLI.
4. Configure email authentication and approved college email rules.
5. Implement server-side registration endpoints that validate the member/lead access codes. Store only hashed access-code values in server-side secrets or protected settings; never ship codes in frontend JavaScript.
6. Implement admin and domain-lead authorization checks before enabling task writes, role changes, points, attendance or audit logging.
7. Add environment variables to the hosting provider only when the frontend begins using Supabase:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

The anon key is intended for browser use with correct RLS. Never expose the service-role key.
