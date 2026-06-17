# Korean Language & Kitchen Workshops

Promotional + booking website for Korean cultural workshops in Portugal. Language classes and cooking experiences (Kimchi, Bossam, and more).

## Stack

- **Framework:** Next.js (App Router, fullstack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Emails:** Resend
- **QR:** `qrcode`
- **Deploy:** Vercel

## Structure

| Directory | Purpose |
|-----------|---------|
| `content/` | Markdown data for landing page (workshops, instructors) |
| `components/` | React components (landing + booking flow) |
| `app/` | Next.js App Router pages + API routes |
| `lib/` | Utility modules (Supabase, email, QR, formatting) |
| `types/` | Shared TypeScript interfaces |
| `docs/` | Architecture, roadmap, design briefs, workshop materials |

## Phases

| Phase | What |
|-------|------|
| 1 | Figma design |
| 2 | Landing page (static Next.js) |
| 3 | Booking system (Supabase + API + emails + QR) |
| 4 | Content population |
| 5 | Polish + deploy |

See `docs/ROADMAP.md` for details.
