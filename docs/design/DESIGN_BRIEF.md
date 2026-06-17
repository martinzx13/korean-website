# Figma Design Brief — Korean Language & Kitchen Workshops

## Project

A single-page promotional landing page for Korean cultural workshops — language classes and cooking experiences.

**Vibe:** Elegant, warm, modern, culturally rich but not cliché. *Kinfolk meets Korean minimalism* — soft neutrals, hanji paper textures, warm wood tones, precise typography. Nothing loud or cheap.

## Pages (Single-Page Scroll + Internal Sections)

| Section | Content |
|---------|---------|
| **Hero** | Full-viewport. Tagline like "Discover the Art of Korean Culture" + subtle Korean pattern/graphic + CTA "Explore Workshops" (smooth scroll down) |
| **About** | 2–3 sentences about the school — philosophy, mission. Minimal text, elegant. |
| **Workshops** | Grid of flash cards. Each card: icon/emoji, title ("Korean for Beginners"), short tagline, session count, instructor name, "Learn More" link. Soft shadows, rounded corners, hover elevation. |
| **Instructors** | Card grid. Photo (circle crop), name, specialty (Language / Cuisine), short bio, flag/icon. Clean, airy. |
| **Sessions** | Timeline or table view — day/time, workshop name, instructor, format badge (Online / In-person). Scannable. |
| **Contact / Footer** | Email, social links, location pin. Minimal. |

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Base | `#FAF7F2` | Page background — warm beige/cream |
| Text | `#2C2C2C` | Body copy — deep charcoal |
| Accent | `#D45D3A` | CTAs, highlights — rich terracotta/persimmon |
| Secondary | `#8BA888` | Secondary accents — soft sage green |
| Card bg | `#FFFFFF` | Card backgrounds |
| Card border | `#EDE9E3` | Subtle card borders |
| Muted | `#A0988C` | Secondary text, metadata |

### Typography

- **Headings:** Serif — Playfair Display or Noto Serif KR (elegant, editorial weight)
- **Body:** Sans-serif — Inter or Noto Sans KR (clean, readable)
- **Leading:** Generous (`line-height: 1.6` body, `1.2` headings)

### Cards (Workshop & Instructor)

- Background: `#FFFFFF`
- Border: `1px solid #EDE9E3`
- Border-radius: `16px`
- Shadow: `0 4px 20px rgba(0,0,0,0.04)`
- Hover: `0 8px 32px rgba(0,0,0,0.08)`, subtle translateY(-2px)

### Spacing

- Section gap: `80–120px`
- Content max-width: `1200px`, centered
- Card grid gap: `24–32px`
- Padding inside cards: `24px`

### Imagery Style

- High-quality food photography (kimchi, bibimbap, banchan)
- Language classroom candids — warm, natural light
- Muted, warm-toned color grade
- **No stock-photo cheesiness**

### Icons

- Minimal line icons (Lucide-style)
- Optional: subtle Korean decorative patterns (geometric/traditional motifs used sparingly)

## Deliverables

1. **Responsive frames:** Desktop `1440px`, Tablet `768px`, Mobile `375px`
2. **Component library:** Cards (workshop + instructor), Buttons (primary + outline), Typography styles, Color styles, Auto-layout components
3. **Exportable assets:** Hero background pattern/graphic, decorative icons, Korean pattern elements
4. **Interactive prototype:** Scroll behavior, hover states on cards, mobile hamburger menu, smooth anchor links

## Tone References

- [mimamori.xyz](https://mimamori.xyz) — elegant minimalism
- [tamal.la](https://tamal.la) — warm Japanese-Mexican branding
- Muji catalogs — restraint, texture, natural materials

---

*Build using auto-layout, variants for cards, and a clean component hierarchy.*
