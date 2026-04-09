# CampusConnect

CampusConnect is a premium-designed, anonymous student discovery web application. It allows university students to submit transient profiles that connect them with peers based on university and shared interests. The project is built with **Next.js** (App Router) and **Supabase**.

## Key Features

1. **Transient Profiles**
   - Profiles automatically expire and are deleted after 30 days. This creates a rotating, fresh feed of active students.
   - Deletion is handled via a Supabase `pg_cron` schedule directly in the database.

2. **Anonymous & Minimal**
   - No user accounts or complex onboarding required.
   - Users simply fill out a form with a pseudonym, their university, interests, a short bio, and a contact method.

3. **Device-Based Limits**
   - To prevent spam while keeping the application account-less, submission limits are enforced via device fingerprinting (stored in `localStorage` and validated in the backend).
   - Only one active profile is allowed per device.

4. **Security & Anti-Spam**
   - **Math CAPTCHA**: A simple 3+4 math question to ward off basic bots.
   - **Honeypot Field**: Hidden `bot_field` to catch automated submissions.
   - **Profanity Filter**: Integration with the `bad-words` library to scrub offensive content in names, bios, and interests.
   - **Secure Image Upload**: Photos are stored securely in a Supabase Bucket natively with file size limits (max 5MB).

5. **Search & Discovery**
   - Real-time filtering by University and Interests.
   - A clean, responsive, and glassmorphic UI design with smooth micro-animations.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (React 19, TypeScript)
- **Database & Storage**: [Supabase](https://supabase.com/) (PostgreSQL + Object Storage)
- **Styling**: Vanilla CSS Modules with a custom glassmorphic aesthetic
- **Icons**: `lucide-react`
- **Utilities**: `bad-words` for text filtering.

## Project Structure

- `/src/app/page.tsx`: The main feed page that displays all active profiles, with filtering and loading states.
- `/src/app/submit/page.tsx`: The submission form for creating a new profile.
- `/src/app/api/...`: Next.js Route Handlers for securely interacting with the Supabase database.
- `/src/components/ProfileCard.tsx`: Reusable UI component displaying individual student profiles.
- `/src/utils/supabase.ts`: Supabase client initialization.
- `/supabase_setup.sql`: The raw SQL instructions to set up tables, RLS policies, storage buckets, and cron jobs in Supabase.

## Database Schema Highlights

The primary table is `profiles` containing:
- UUID `id`
- `name` (pseudonym)
- `university`
- `interests` (array of text)
- `bio`
- `photo_url`
- `contact`
- `fingerprint_id` (used to limit submissions)
- `created_at`

Row Level Security (RLS) policies are configured to only allow public reads. Inserts and updates are executed safely via Next.js backend API routes.

## Future / Pending Work

- Deployment to Vercel/Netlify.
- Adding a fallback `/api/cron` route to handle the 30-day auto-deletion without relying exclusively on Supabase `pg_cron`.
- Evolving the UI styling further based on user feedback.
