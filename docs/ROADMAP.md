# Roadmap

## ✅ Phase 1 — Design

- [x] Export landing page design from Figma (Vite project)
- [x] Port design tokens: cream `#FAF7F2`, terracotta `#D45D3A`, sage `#7D9B7E`
- [x] Fonts: Playfair Display (headings), Noto Sans KR (body), Inter (UI)

## ✅ Phase 2 — Landing (Static)

- [x] Scaffold Next.js project (App Router, TypeScript, Tailwind)
- [x] Configure Tailwind with design tokens (globals.css, tailwind.config.ts)
- [x] Install shadcn/ui primitives (Card, Calendar, Sheet)
- [x] Build Header (desktop nav + mobile hamburger menu)
- [x] Build Hero (hard split: title left, curved image right)
- [x] Build About section
- [x] Build WorkshopsSection + WorkshopCard (metadata pills: duration, price, level)
- [x] Build InstructorsSection (flip cards for Hyoina & Yebibi)
- [x] Build Schedule table (6 rows: 3 language + 3 cooking, Jun 26–28)
- [x] Build Footer (links, social, Reserve CTA)
- [x] Mobile responsive styles (header sheet, stacked layouts, fluid type)

## ✅ Phase 3 — Backend (Booking System)

- [x] Set up Supabase project (`hqsjbuwfubslqzvyeqdl.supabase.co`)
- [x] Write SQL schema (workshops, sessions, bookings, admin_users)
- [x] Write `session_availability` view (capacity - booked = available_spots)
- [x] Write `create_booking` RPC (SECURITY DEFINER, FOR UPDATE lock, atomic)
- [x] Write seed data: 2 workshops, 6 sessions (Jun 26–28), 1 admin user
- [x] Create RLS policies: `anon_select_workshops`, `anon_select_sessions`
- [x] Create RLS policy: `anon_select_bookings` (UUID-gated — run in SQL Editor)
- [x] Create RLS policy: `anon_update_bookings` (allows admin PATCH to update status)
- [x] Build `/api/sessions` (GET — available slots by workshop)
- [x] Build `/api/booking` (POST — atomic booking via RPC, sends email)
- [x] Build `/api/booking/[id]` (GET — fetch booking details)
- [x] Build `/api/admin/bookings` (GET — all bookings)
- [x] Build `/api/admin/bookings/[id]` (PATCH — mark paid + send confirmation)
- [x] Build `/api/qr/[id]` (GET — QR code PNG)
- [x] Build BookingForm page (date picker, time slots, people counter, couple toggle)
- [x] Build Booking status page (pending → payment info, paid → voucher link)
- [x] Build QR Voucher page (generated QR + booking summary)
- [x] Build Admin login + dashboard (login, bookings table, Mark Paid button)
- [x] Set up Resend email client (sandbox: `onboarding@resend.dev`)
- [x] Write email templates (pending confirmation, paid + QR)
- [x] Add booking disclaimer (don't close browser, check email, what to expect)
- [x] Add collapsible T&C on booking form (cancellation policy, age, allergens, contact)
- [x] Add tiered allergen waiver (cooking only — facility notice + cross-contamination checkbox)
- [x] Add conversion redirect for severe allergies (cooking → language booking)
- [x] Add "I accept" checkbox — required before booking

## ✅ Phase 4 — Content

- [x] Workshop descriptions (Korean Language + Kimchi & Bossam)
- [x] Instructor bios (Hyoina, Yebibi — both teach language + cooking)
- [x] Schedule: Jun 26–28, Language 10:00–13:00, Cooking 17:00–20:00
- [x] Pricing: Language €20/person, Cooking €50/person · €60/couple
- [x] Capacity: 30 people/session (cooking ingredients scaled for 14)
- [x] Real ingredient costs from Continente, Intermarché, Asian markets
- [x] Feasibility analysis: €2,286 gross profit at 65% capacity

## ✅ Phase 5 — Polish

- [x] CTA contrast on workshop cards (terracotta on cream)
- [x] Glassmorphism contrast (header backdrop, card overlays)
- [x] Button width consistent on booking detail page
- [x] Hero hard split layout (no overlapping text/image)
- [x] Metadata pills on workshop cards (duration, price, level badges)
- [x] Enroll buttons scroll to workshops section (not footer)
- [x] "Book Now" button: full-width filled pill on every card
- [x] Booking disclaimer: "Don't close this page" + "Check email" notice
- [x] Footer Terms link in bottom bar
- [x] Ingredient/allergen badge on cooking workshop card (fish sauce, sesame, soy, pork)
- [x] Workshop detail page redesign — hero images, structured sections (What You'll Make, What's Included, Good to Know)
- [x] AI-generated hero images for both workshops (kimchi-bossam, korean-language)

## 🔲 Phase 6 — Launch Prep

- [ ] Replace all `[FAKE]` payment details with real Wise/MBWay/Bank info
- [ ] Generate real bcrypt hash for admin password (change from `admin`/`admin`)
- [ ] Set up custom Resend domain (replace `onboarding@resend.dev`)
- [ ] Deploy to Vercel
- [ ] Configure production env vars (SUPABASE_URL, keys, RESEND_API_KEY)
- [ ] Test full booking flow on production

## 🔮 Future

- [ ] Loading skeletons / spinners on data-fetching pages
- [ ] Error boundaries + toast notifications
- [ ] Animations (framer-motion: fade-in, scroll reveals, card hover)
- [ ] SEO meta tags + Open Graph per page
- [ ] Stripe / MBWay API integration (automatic payment confirmation)
- [ ] Cron job: 24h reminder email for pending bookings
- [ ] Admin: cancel booking, edit session capacity, add sessions
- [ ] Multi-language support (PT / EN / KO)
- [ ] Social media feed (Instagram embed)
- [ ] Performance audit (Lighthouse)
