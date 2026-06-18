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
    tagline: "Write your name in Korean and master essential phrases in a fun 3-hour session",
    sessions: 3,
    instructor: "Yebin Heo & Hyoina Jung",
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
    instructor: "Yebin Heo & Hyoina Jung",
    tag: "Kitchen",
    price: "€50/person · €60/couple",
    duration: "3h",
    contains: "fish sauce, sesame, soy, pork",
  },
];

export const INSTRUCTORS: Instructor[] = [
  {
    name: "Yebin Heo",
    initials: "YH",
    specialty: "Language & Culture",
    bio: "Language educator with 5 years of teaching experience who loves sharing Korean culture and good food.",
    hue: "#7D9B7E",
    photo: "/images/instructor-yebin-heo.png",
    photoAlt: "Korean language instructor",
    workshops: ["Korean Language", "Kimchi & Bossam"],
  },
  {
    name: "Hyoina Jung",
    initials: "HJ",
    specialty: "Language & Home Cooking",
    bio: "Learn Korean and home cooking from a certified instructor backed by 6 years of language tutoring experience and a 10-year love for home cooking.",
    hue: "#D45D3A",
    photo: "/images/instructor-hyoina-jung.png",
    photoAlt: "Korean language and cooking instructor",
    workshops: ["Korean Language", "Kimchi & Bossam"],
  },
];

export const SESSIONS: Session[] = [
  { day: "Fri 26", date: "2026-06-26", time: "10:00–13:00", workshop: "Korean Language", workshopSlug: "korean-language", instructor: "Yebin Heo & Hyoina Jung", format: "In-person" },
  { day: "Fri 26", date: "2026-06-26", time: "17:00–20:00", workshop: "Kimchi & Bossam", workshopSlug: "kimchi-bossam", instructor: "Yebin Heo & Hyoina Jung", format: "In-person" },
  { day: "Sat 27", date: "2026-06-27", time: "10:00–13:00", workshop: "Korean Language", workshopSlug: "korean-language", instructor: "Yebin Heo & Hyoina Jung", format: "In-person" },
  { day: "Sat 27", date: "2026-06-27", time: "17:00–20:00", workshop: "Kimchi & Bossam", workshopSlug: "kimchi-bossam", instructor: "Yebin Heo & Hyoina Jung", format: "In-person" },
  { day: "Sun 28", date: "2026-06-28", time: "10:00–13:00", workshop: "Korean Language", workshopSlug: "korean-language", instructor: "Yebin Heo & Hyoina Jung", format: "In-person" },
  { day: "Sun 28", date: "2026-06-28", time: "17:00–20:00", workshop: "Kimchi & Bossam", workshopSlug: "kimchi-bossam", instructor: "Yebin Heo & Hyoina Jung", format: "In-person" },
];
