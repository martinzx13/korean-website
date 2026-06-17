# Architecture — Korean Workshops

## Strategy

Next.js fullstack (App Router). Landing pages are statically rendered; booking flows use dynamic server components + API routes. Database via Supabase PostgreSQL. Emails via Resend. Deployed on Vercel.

## User Flow

```
Landing page
  ↓  clicks "Book Now"
Workshop detail (static from markdown)
  ↓  clicks "Book This Workshop"
Booking form
  ├── Pick a date  [ shadcn Calendar popover — shows Jun 26–28 ]
  ├── Pick a session  [ Language 10:00 | Cooking 17:00 ]
  ├── # of people  [ 1–30, capped by available spots ]
  ├── Couple pricing?  [ toggle — only for cooking, 2 people → €60 ]
  └── Info         [ name · email · phone ]
  ↓  submits
POST /api/booking → creates booking (status: pending)
  ↓  redirects
Payment page — shows Wise IBAN · MBWay number · Bank transfer details
  ↓  user pays manually, admin confirms
Admin dashboard → marks booking as paid
  ↓
Resend email → confirmation + QR voucher to user
```

## Folder Structure

```
site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                     # Landing (static)
│   ├── workshops/
│   │   └── [slug]/
│   │       ├── page.tsx             # Workshop detail (static)
│   │       └── book/
│   │           └── page.tsx         # Booking form (dynamic — fetches sessions)
│   ├── booking/
│   │   └── [id]/
│   │       ├── page.tsx             # Booking detail + status
│   │       └── voucher/
│   │           └── page.tsx         # QR voucher (after paid)
│   ├── admin/
│   │   ├── login/page.tsx
│   │   └── dashboard/page.tsx       # Table: bookings, mark paid, manage sessions
│   ├── api/
│   │   ├── booking/route.ts         # POST — create booking
│   │   ├── sessions/route.ts        # GET — available sessions by date + workshop
│   │   ├── admin/bookings/route.ts  # GET/PATCH — admin operations
│   │   └── qr/[id]/route.ts         # GET — QR code image
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui primitives
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── hero.tsx
│   ├── workshops/
│   │   ├── workshop-card.tsx
│   │   ├── workshop-grid.tsx
│   │   └── booking-form.tsx
│   ├── booking/
│   │   ├── date-picker.tsx          # shadcn Calendar popover wrapper
│   │   ├── time-slots.tsx           # Clickable time slot buttons
│   │   ├── payment-instructions.tsx
│   │   └── voucher-card.tsx
│   └── instructors/
│       ├── instructor-card.tsx
│       └── instructor-grid.tsx
├── lib/
│   ├── supabase.ts                  # Supabase client (server + browser)
│   ├── email.ts                     # Resend email sender
│   ├── qr.ts                        # QR code generation
│   ├── utils.ts                     # cn(), formatCurrency, formatDate
│   └── content.ts                   # Markdown parser for landing data
├── types/
│   └── index.ts
├── content/                         # Markdown for static landing content
├── public/images/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Component Tree (Booking Flow)

```
BookingForm (client component)
├── DatePicker              ← shadcn Calendar popover, stores Date in useState
├── TimeSlots               ← fetches GET /api/sessions?workshop=X&date=Y, renders buttons
│   └── TimeSlotButton[]    ← active / disabled / selected states
├── PeopleCounter           ← +/- buttons, 1–max
├── TextInput[name]
├── TextInput[email]
├── TextInput[phone]
└── SubmitButton            ← POST /api/booking → redirect to payment page

PaymentInstructions (server component)
├── Heading: "How to Pay"
├── Wise: IBAN + beneficiary
├── MBWay: number
├── Bank Transfer: IBAN + NIB
├── Status: "Pending — we'll email you once confirmed"
└── Note: "Pay within 24h or booking expires"

AdminDashboard (client component, protected)
├── BookingsTable
│   └── BookingRow[]         ← name, workshop, date, status, actions
└── Modal: confirm payment → PATCH /api/admin/bookings/:id
```

## Database Schema (Supabase PostgreSQL)

```sql
-- Workshops (static data, also in markdown for landing pages)
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('language', 'cooking')),
  price_cents INTEGER NOT NULL,
  price_couple_cents INTEGER,  -- special price for 2 people (cooking only)
  max_participants_per_booking INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions (date + time slots per workshop)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER NOT NULL,
  format TEXT CHECK (format IN ('in-person', 'online')),
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  number_of_people INTEGER NOT NULL CHECK (number_of_people > 0),
  is_couple BOOLEAN DEFAULT false,  -- couple pricing for cooking sessions
  total_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'cancelled', 'refunded')),
  payment_method TEXT CHECK (payment_method IN ('wise', 'mbway', 'transfer')),
  paid_at TIMESTAMPTZ,
  qr_token TEXT UNIQUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Computed: available spots = capacity - SUM(number_of_people) WHERE status != 'cancelled'
CREATE VIEW session_availability AS
SELECT
  s.id,
  s.workshop_id,
  s.date,
  s.start_time,
  s.end_time,
  s.capacity,
  s.format,
  s.capacity - COALESCE(SUM(b.number_of_people) FILTER (WHERE b.status != 'cancelled'), 0) AS available_spots
FROM sessions s
LEFT JOIN bookings b ON b.session_id = s.id
WHERE s.is_cancelled = false
GROUP BY s.id;
```

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/sessions` | GET | Query: `?workshopSlug=X&date=YYYY-MM-DD`. Returns available time slots |
| `/api/booking` | POST | Body: `{ sessionId, name, email, phone, people, isCouple }`. Creates booking → returns `{ bookingId, totalCents }`. Price = `isCouple ? couple_price_cents : price_cents * people` |
| `/api/booking/[id]` | GET | Returns booking details + payment info |
| `/api/admin/bookings` | GET | Returns all bookings (admin only) |
| `/api/admin/bookings/[id]` | PATCH | Body: `{ status: "paid" }`. Triggers confirmation email + QR |
| `/api/qr/[id]` | GET | Returns QR code PNG (encodes booking ID + workshop + date) |

## Email Flow (Resend)

| Trigger | To | Template |
|---------|----|----------|
| Booking created | User | "Thanks [name]! Your booking for [workshop] is pending. Here's how to pay: [Wise/MBWay/Transfer details]. Pay within 24h." |
| Payment confirmed | User | "You're confirmed! Here's your voucher." — includes QR code + booking summary + date/time |
| Payment confirmed | Admin | "New payment: [name] booked [workshop] ([date]) — [people] people, €[total]" |
| 24h reminder | User | Cron / manual: "Your booking expires soon — complete payment to secure your spot." |

## QR Voucher

- Generated server-side via `qrcode` npm package
- Encoded data: `booking:{id}|workshop:{slug}|date:{date}|name:{name}`
- Rendered as PNG via API route `/api/qr/[id]`
- Displayed inline on `/booking/[id]/voucher` + attached to confirmation email
- No scanning needed — acts as a confirmation voucher / ticket

## Payment Methods

| Method | Display Info | Confirmation |
|--------|-------------|--------------|
| **Wise** | IBAN + beneficiary name + email | Manual (admin checks) |
| **MBWay** | Phone number + name | Manual (admin checks MBWay app) |
| **Bank Transfer** | IBAN + NIB + beneficiary | Manual (admin checks bank) |

All payments are **manual confirmation** in v1. Admin marks paid via dashboard → system sends email + QR.

## Types

```typescript
interface Workshop {
  id: string
  slug: string
  title: string
  description: string
  category: 'language' | 'cooking'
  priceCents: number
  priceCoupleCents?: number  -- special price for 2 people
  maxParticipantsPerBooking: number
  isActive: boolean
}

interface Session {
  id: string
  workshopId: string
  date: string
  startTime: string
  endTime: string
  capacity: number
  format: 'in-person' | 'online'
  availableSpots: number
}

interface Booking {
  id: string
  sessionId: string
  name: string
  email: string
  phone?: string
  numberOfPeople: number
  isCouple: boolean
  totalCents: number
  status: 'pending' | 'paid' | 'cancelled' | 'refunded'
  paymentMethod?: 'wise' | 'mbway' | 'transfer'
  paidAt?: string
  qrToken?: string
  createdAt: string
}
```

## Key Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Date picker | shadcn Calendar popover | Matches Tailwind design system, same logic as native `<input type="date">`, but stylable |
| Time slots | Clickable buttons | Visual at a glance, accessible, easy to disable full slots |
| State management | useState (no Zustand/Redux) | Only form state — no global store needed |
| Database | Supabase PostgreSQL | Free tier, auth included, good SDK |
| Emails | Resend | Free tier (100/day), easy API, works with React Email |
| QR | `qrcode` npm package | Lightweight, no external API dependencies |
| Deployment | Vercel | Native Next.js support, free tier |
