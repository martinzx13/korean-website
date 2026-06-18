# Back-End Issues & Remaining Work

> Track of database, API, email, and deployment tasks.

## ✅ Resolved

### Supabase Project
- Project live at `hqsjbuwfubslqzvyeqdl.supabase.co`
- SQL migration run successfully (workshops, sessions, bookings, admin_users, view, RPC)

### Atomic Booking Function (`create_booking`)
- Writes as `SECURITY DEFINER` to bypass RLS
- `FOR UPDATE OF s` row-level lock prevents race conditions
- Uses subquery (not GROUP BY) in the availability check — avoids Supabase restriction
- Returns `{ bookingId, totalCents }` as JSON

### RLS Policies
- `anon_select_workshops` — anon can read workshops (public data)
- `anon_select_sessions` — anon can read sessions (public data)
- (Missing) `anon_select_bookings` — see below

### API Routes
- `GET /api/sessions` — returns available slots with availability count
- `POST /api/booking` — creates booking atomically, sends pending email
- `GET /api/booking/[id]` — returns booking details
- `GET /api/admin/bookings` — all bookings (admin only)
- `PATCH /api/admin/bookings/[id]` — mark paid, sends confirmation + QR email
- `GET /api/qr/[id]` — generates QR code PNG

### Email (Resend)
- Resend client configured with API key (`re_4njCvhkc_...`)
- Sending from `onboarding@resend.dev` (sandbox — no custom domain yet)
- `sendPendingEmail()` — sends after booking creation
- Email is sending successfully (tested)

### QR Voucher
- `qrcode` npm package generates PNG server-side
- Voucher page at `/booking/[id]/voucher`
- Attached to confirmation email (base64 inline)

## 🐛 Known Issues

### Booking Page Returns 404 After Redirect
- **Problem**: `POST /api/booking` returns 200 with booking data, redirect to `/booking/[id]` shows "This page could not be found"
- **Root cause**: `bookings` table has RLS enabled but no `anon_select_bookings` policy. The server component at `booking/[id]/page.tsx` queries bookings with anon key → RLS blocks → null → `notFound()` → 404
- **Fix**: Run this in Supabase SQL Editor:
  ```sql
  CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT TO anon USING (true);
  ```
- **Security**: UUIDs are unguessable — this is UUID-gated access, not public

### Voucher Page Returns 404 After Payment Confirmed
- **Problem**: Email arrives saying payment confirmed, but clicking voucher link shows 404
- **Root cause**: Admin PATCH endpoint (`api/admin/bookings/[id]/route.ts`) uses anon key to UPDATE `bookings`, but no RLS policy allows anon UPDATE. The update silently fails, status stays "pending", voucher page sees `status !== "paid"` → `notFound()`
- **Fix**: Run this in Supabase SQL Editor:
  ```sql
  CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE TO anon USING (true);
  ```
- **Additional fix**: Added `NEXT_PUBLIC_SITE_URL` to `.env.local` so email links use correct URL

### Email Template — Missing Session Info in Follow-up Query
- The booking API route queries `session_availability` after creating the booking (to get session info for the email)
- This query may be blocked by RLS if the view doesn't inherit permissions properly
- **Workaround**: The booking RPC returns `totalCents`, and the session data was already fetched on the client side — could pass it in the POST body instead of re-querying

## 🔲 Before Launch

### ✅ Replace All [FAKE] Payment Details — Done
**Files to update:**
- `site/src/app/booking/[id]/page.tsx` — Wise/MBWay/Bank Transfer details on booking page
- `site/src/lib/email.ts` — payment instructions in email template
- `docs/PAYMENT_FLOW.md` — reference documentation

### ✅ Admin Password — Done (Moved to ENV Var)
- No longer uses DB hash — admin auth is done via `ADMIN_PASSWORD` env var in `.env.local` and Vercel
- Current value in Vercel: set by user

### Resend Custom Domain
- Currently sending from `onboarding@resend.dev` — sanded delivery, shows "via resend.dev"
- **Action**: Add custom domain in Resend dashboard (e.g. `mail@hangukstudio.com`), update `RESEND_FROM_EMAIL` in `.env.local`

### Production Deployment
- **Action**: 
  1. Push to GitHub
  2. Connect repo to Vercel
  3. Set environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `RESEND_API_KEY`
     - `RESEND_FROM_EMAIL`
  4. Deploy

## 🔮 Future Improvements

### Automatic Payment Confirmation
- **Stripe**: Full integration — user pays on site, webhook confirms instantly
- **MBWay API**: If available, automate MBWay payment confirmation
- **Current**: Manual admin approval (good for v1, bad for scaling)

### 24-Hour Expiry Reminder
- Cron job (Vercel Cron or Supabase pg_cron):
  - Query bookings where `status = 'pending'` and `created_at < now() - interval '24 hours'`
  - Send reminder email or auto-cancel

### Admin Dashboard Improvements
- Edit session capacity / add new sessions
- View booking history per email
- Export bookings to CSV
- Booking notes / internal comments

### Webhook / Email Notifications to Admin
- When a new booking is created → notify admin (email or Slack)
- When payment is pending for >12h → flag

### Database Backups
- Set up Supabase daily backups (free tier includes 7-day point-in-time)

### API Rate Limiting
- Protect `POST /api/booking` from abuse (max N requests per IP per hour)
- Use Vercel Edge middleware or Supabase RLS with rate limiting

### Logging & Monitoring
- Structured logging for API routes (Vercel Logs or Sentry)
- Track booking funnel: landing → book form → submit → pay → confirm
