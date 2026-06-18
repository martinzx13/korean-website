# Payment Flow — Wise · MBWay · Bank Transfer

## Payment Methods

### Wise

| Field | Value |
|-------|-------|
| Link | https://wise.com/pay/me/juanm4246 |

### MBWay

| Field | Value |
|-------|-------|
| Phone | +351 937 254 422 |

### Bank Transfer (Portugal)

| Field | Value |
|-------|-------|
| IBAN | PT50 0033 0000 4563 0180 0200 5 |

---

## Email Templates

These are sent automatically via Resend when a booking is created and when payment is confirmed.

### Pending Payment Email (sent immediately after booking)

**Subject:** Booking Pending — Korean Language Workshop

Hi {name},

Your booking for {workshop} on {date} at {time} is pending.

**Total:** €{total}

**How to pay:**

**Wise** — https://wise.com/pay/me/juanm4246
**MBWay** — +351 937 254 422
**Bank Transfer** — PT50 0033 0000 4563 0180 0200 5

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
3. User sends proof via WhatsApp or email
4. Admin checks WhatsApp / email
5. Admin logs into `/admin/dashboard`
6. Admin clicks "Mark Paid"
7. System sends confirmation email + QR voucher
