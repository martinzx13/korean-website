# Front-End Issues & UI Improvements

> Track of bugs, visual polish, and future UX enhancements.

## ✅ Resolved

### CTA Contrast on Workshop Cards
The "Book Now" link at the bottom of each workshop card was `text-[11px]` with 40% opacity — invisible against the cream background. **Fixed**: Full-width filled terracotta pill button (`bg-primary text-primary-foreground`).

### Glassmorphism Contrast
Header backdrop and card overlays had insufficient contrast on light backgrounds. **Fixed**: Increased backdrop opacity and foreground contrast.

### Button Width on Booking Detail Page
Buttons were inconsistent widths on the workshop detail page. **Fixed**: Standardized to full-width on mobile, inline with padding on desktop.

### Hero Overlapping Text/Image
The hero section had text and image overlapping awkwardly on some viewports. **Fixed**: Hard split layout — text left, image right with curved separation.

### Enroll/Reserve Scroll Targets
All "Enroll", "Reserve your spot", and "Reserve Your Place" buttons were scrolling to `#contact` (footer) or `#schedule`. **Fixed**: All now scroll to `#workshops` — the logical next step in the user flow.

### Disclaimers on Booking Page
After a successful booking, users saw payment details but no warning to save them. **Fixed**: Added amber warning box with:
- "Do not close this page until you save the payment details"
- "We also sent these instructions to {email} — check your inbox (and spam)"
- "After we confirm your payment, you'll receive a QR voucher"

## 🐛 Known Issues

### Booking Page Returns 404 After Successful Booking
The POST to `/api/booking` succeeds (returns `bookingId`) but the redirect to `/booking/[id]` shows "This page could not be found". **Root cause**: Missing RLS policy `anon_select_bookings` on the `bookings` table. The server component queries with the anon key and RLS blocks the SELECT. **Fix**: Run SQL — see `BACKEND_ISSUES.md`.

## 🔮 Future Improvements

### Loading States
- Skeleton loaders on booking form while sessions fetch
- Spinner on "Confirm Booking" button during submission
- Skeleton on booking status page while data loads

### Error Handling
- Toast notifications for network errors
- Friendly error page (not raw JSON or default Next.js error)
- Form validation errors inline (not just top-level)

### Animations
- Fade-in sections on scroll (Intersection Observer)
- Card hover: smooth scale + shadow transitions
- Metadata pill entrance animation on workshop cards
- Image lazy-load with blur placeholder

### Responsive Polish
- Workshop cards: different grid layouts for tablet
- Hero: stacked vertical layout on very small screens (alternative to hard split)
- Schedule table: horizontal scroll on mobile or collapsed card view

### Accessibility
- Focus outlines on all interactive elements
- `aria-label` on icon-only buttons (mobile menu, arrow icons)
- Skip-to-content link
- Keyboard navigation for date picker and time slots
- Color contrast audit (ensure WCAG AA)

### SEO & Meta
- Per-page meta titles + descriptions
- Open Graph images (workshop thumbnails)
- Structured data (Event schema for workshops)
- Sitemap.xml

### Content Pages
- Individual instructor bio popovers / modals
- FAQ section (age policy, what to bring, refunds)
- Testimonials carousel after the first weekend
- Gallery of past workshop photos

### Performance
- Lazy-load workshop card images (next/image)
- Preload critical fonts (Playfair Display)
- Bundle analysis (next/bundle-analyzer)
- Reduce CLS on hero section
