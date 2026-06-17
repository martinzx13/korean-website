import { Workshop, Instructor, Session } from "@/types";

export const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Workshops", id: "workshops" },
  { label: "Instructors", id: "instructors" },
  { label: "Schedule", id: "schedule" },
  { label: "Contact", id: "contact" },
];

export const WORKSHOPS: Workshop[] = [
  {
    emoji: "🇰🇷",
    title: "Korean Language",
    slug: "korean-language",
    tagline: "Learn Hangul, greetings, and essential phrases in a fun 3-hour session",
    sessions: 3,
    instructor: "Hyoina & Yebibi",
    tag: "Language",
    price: "€20/person",
    duration: "3h",
  },
  {
    emoji: "🥬",
    title: "Kimchi & Bossam",
    slug: "kimchi-bossam",
    tagline: "Make fresh kimchi (Geotjeori) and boiled pork from scratch",
    sessions: 3,
    instructor: "Hyoina & Yebibi",
    tag: "Kitchen",
    price: "€50/person · €60/couple",
    duration: "3h",
    contains: "fish sauce, sesame, soy, pork",
  },
];

export const INSTRUCTORS: Instructor[] = [
  {
    name: "Hyoina",
    initials: "HY",
    specialty: "Language & Cuisine",
    bio: "Passionate about sharing Korean culture through both language and food. Brings warmth, tradition, and hands-on teaching to every class.",
    hue: "#C4714E",
    photo: "https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=600&h=750&fit=crop&auto=format",
    photoAlt: "Korean language instructor",
    workshops: ["Korean Language", "Kimchi & Bossam"],
  },
  {
    name: "Yebibi",
    initials: "YB",
    specialty: "Language & Cuisine",
    bio: "Korean language and cuisine instructor. Brings energy and tradition to every class — from Hangul to handmade kimchi.",
    hue: "#7D9B7E",
    photo: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=750&fit=crop&auto=format",
    photoAlt: "Korean cuisine instructor",
    workshops: ["Korean Language", "Kimchi & Bossam"],
  },
];

export const SESSIONS: Session[] = [
  { day: "Fri 26", date: "2026-06-26", time: "10:00–13:00", workshop: "Korean Language", workshopSlug: "korean-language", instructor: "Hyoina & Yebibi", format: "In-person" },
  { day: "Fri 26", date: "2026-06-26", time: "17:00–20:00", workshop: "Kimchi & Bossam", workshopSlug: "kimchi-bossam", instructor: "Hyoina & Yebibi", format: "In-person" },
  { day: "Sat 27", date: "2026-06-27", time: "10:00–13:00", workshop: "Korean Language", workshopSlug: "korean-language", instructor: "Hyoina & Yebibi", format: "In-person" },
  { day: "Sat 27", date: "2026-06-27", time: "17:00–20:00", workshop: "Kimchi & Bossam", workshopSlug: "kimchi-bossam", instructor: "Hyoina & Yebibi", format: "In-person" },
  { day: "Sun 28", date: "2026-06-28", time: "10:00–13:00", workshop: "Korean Language", workshopSlug: "korean-language", instructor: "Hyoina & Yebibi", format: "In-person" },
  { day: "Sun 28", date: "2026-06-28", time: "17:00–20:00", workshop: "Kimchi & Bossam", workshopSlug: "kimchi-bossam", instructor: "Hyoina & Yebibi", format: "In-person" },
];
