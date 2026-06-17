# Payment Flow — Wise · MBWay · Bank Transfer

> ⚠️ **FAKE DATA — Replace with real account details before going live.**

## Payment Methods

### Wise

| Field | Value |
|-------|-------|
| Beneficiary | [FAKE] Maria Korean Studio |
| Email | [FAKE] maria@hangukstudio.com |
| IBAN | [FAKE] PT50 1234 5678 9012 3456 7890 1 |
| BIC/SWIFT | [FAKE] BCOMPTPL |

### MBWay

| Field | Value |
|-------|-------|
| Phone | [FAKE] +351 900 000 000 |
| Name | [FAKE] Maria Korean Studio |

### Bank Transfer (Portugal)

| Field | Value |
|-------|-------|
| Bank | [FAKE] Banco Comercial Português |
| IBAN | [FAKE] PT50 1234 5678 9012 3456 7890 1 |
| NIB | [FAKE] 1234 5678 9012 3456 7890 1 |
| Beneficiary | [FAKE] Maria Korean Studio |

---

## Email Templates

These are sent automatically via Resend when a booking is created and when payment is confirmed.

### Pending Payment Email (sent immediately after booking)

**Subject:** Booking Pending — Korean Language Workshop

Hi {name},

Your booking for {workshop} on {date} at {time} is pending.

**Total:** €{total}

**How to pay:**

**Wise** — Send to [FAKE] maria@hangukstudio.com
**MBWay** — Send to [FAKE] +351 900 000 000
**Bank Transfer** — [FAKE] IBAN: PT50 1234 5678 9012 3456 7890 1

Pay within 24h to secure your spot. Once we confirm the payment, we'll send your QR voucher.

Booking ID: {bookingId}

— Hanguk Studio

### Confirmed Payment Email (sent when admin marks paid)

**Subject:** Payment Confirmed — Korean Language Workshop ✅

Hi {name},

Your payment is confirmed for {workshop} on {date} at {time}.

View your voucher: {voucherUrl}

See you there!

— Hanguk Studio

---

## Admin Confirmation Flow

1. User books → status = `pending`
2. User pays via Wise / MBWay / Transfer
3. Admin checks bank/MBWay app
4. Admin logs into `/admin/dashboard`
5. Admin clicks "Mark Paid"
6. System sends confirmation email + QR voucher

---

## Update Reminder

Replace all `[FAKE]` values with real data before going live:

- `lib/email.ts` — payment instructions in `sendPendingEmail()`
- `app/booking/[id]/page.tsx` — payment instructions shown on the pending page
- `docs/PAYMENT_FLOW.md` — this file
