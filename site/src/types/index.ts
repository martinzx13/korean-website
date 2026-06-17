export interface Workshop {
  emoji: string;
  title: string;
  slug: string;
  tagline: string;
  sessions: number;
  instructor: string;
  tag: "Language" | "Kitchen";
  price: string;
  duration: string;
  contains?: string;
}

export interface Instructor {
  name: string;
  initials: string;
  specialty: string;
  bio: string;
  hue: string;
  photo: string;
  photoAlt: string;
  workshops: string[];
}

export interface Session {
  day: string;
  date: string;
  time: string;
  workshop: string;
  workshopSlug: string;
  instructor: string;
  format: "In-person" | "Online";
}
