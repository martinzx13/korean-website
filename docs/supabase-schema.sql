-- 1. Workshops
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('language', 'cooking')),
  price_cents INTEGER NOT NULL,
  price_couple_cents INTEGER,
  max_participants_per_booking INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed data
INSERT INTO workshops (slug, title, description, category, price_cents, price_couple_cents) VALUES
  ('korean-language', 'Korean Language', '3-hour immersive language session — learn Hangul, greetings, and essential phrases.', 'language', 2000, NULL),
  ('kimchi-bossam', 'Kimchi & Bossam', 'Hands-on cooking class: make fresh kimchi (Geotjeori) and boiled pork (Bossam) from scratch.', 'cooking', 5000, 6000);

-- 2. Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 30,
  format TEXT CHECK (format IN ('in-person', 'online')) DEFAULT 'in-person',
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed data for June 26-28
INSERT INTO sessions (workshop_id, date, start_time, end_time, capacity)
SELECT w.id, d.date::date, d.start_time::time, d.end_time::time, 30
FROM (
  VALUES
    ('korean-language', '2026-06-26', '10:00', '13:00'),
    ('korean-language', '2026-06-27', '10:00', '13:00'),
    ('korean-language', '2026-06-28', '10:00', '13:00'),
    ('kimchi-bossam', '2026-06-26', '17:00', '20:00'),
    ('kimchi-bossam', '2026-06-27', '17:00', '20:00'),
    ('kimchi-bossam', '2026-06-28', '17:00', '20:00')
  ) AS d(slug, date, start_time, end_time)
JOIN workshops w ON w.slug = d.slug;

-- 3. Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  number_of_people INTEGER NOT NULL CHECK (number_of_people > 0),
  is_couple BOOLEAN DEFAULT false,
  total_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled', 'refunded')),
  payment_method TEXT CHECK (payment_method IN ('wise', 'mbway', 'transfer')),
  paid_at TIMESTAMPTZ,
  qr_token TEXT UNIQUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Availability view
CREATE VIEW session_availability AS
SELECT
  s.id,
  s.workshop_id,
  w.slug AS workshop_slug,
  w.title AS workshop_title,
  w.category AS workshop_category,
  w.price_cents,
  w.price_couple_cents,
  s.date,
  s.start_time,
  s.end_time,
  s.capacity,
  s.format,
  s.capacity - COALESCE(SUM(b.number_of_people) FILTER (WHERE b.status != 'cancelled'), 0) AS available_spots
FROM sessions s
JOIN workshops w ON w.id = s.workshop_id
LEFT JOIN bookings b ON b.session_id = s.id
WHERE s.is_cancelled = false
GROUP BY s.id, w.slug, w.title, w.category, w.price_cents, w.price_couple_cents;

-- 5. Atomic booking function (prevents overbooking with row-level lock)
CREATE OR REPLACE FUNCTION create_booking(
  p_session_id UUID, p_name TEXT, p_email TEXT, p_phone TEXT,
  p_people INT, p_is_couple BOOLEAN
) RETURNS JSON AS $$
DECLARE
  v_available INT;
  v_workshop RECORD;
  v_total INT;
  v_booking_id UUID;
BEGIN
  SELECT s.capacity - COALESCE(
    (SELECT SUM(b.number_of_people) FROM bookings b
     WHERE b.session_id = s.id AND b.status != 'cancelled'), 0)
  INTO v_available
  FROM sessions s
  WHERE s.id = p_session_id
  FOR UPDATE OF s;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Session not found';
  END IF;

  IF v_available < p_people THEN
    RAISE EXCEPTION 'Not enough spots available (only %)', v_available;
  END IF;

  SELECT w.price_cents, w.price_couple_cents
  INTO v_workshop
  FROM workshops w
  JOIN sessions s ON s.workshop_id = w.id
  WHERE s.id = p_session_id;

  v_total := CASE
    WHEN p_is_couple AND v_workshop.price_couple_cents IS NOT NULL
      THEN v_workshop.price_couple_cents
    ELSE v_workshop.price_cents * p_people
  END;

  INSERT INTO bookings (session_id, name, email, phone, number_of_people, is_couple, total_cents)
  VALUES (p_session_id, p_name, p_email, p_phone, p_people, p_is_couple, v_total)
  RETURNING id INTO v_booking_id;

  RETURN json_build_object('bookingId', v_booking_id, 'totalCents', v_total);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Admin user (simple password for dashboard)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. RLS policies — allow anon to read and update public data
CREATE POLICY "anon_select_workshops" ON workshops FOR SELECT TO anon USING (true);
CREATE POLICY "anon_select_sessions" ON sessions FOR SELECT TO anon USING (true);
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT TO anon USING (true);
CREATE POLICY "anon_update_bookings" ON bookings FOR UPDATE TO anon USING (true);

-- Default admin: username "admin", password "admin"
-- IMPORTANT: Change this in production!
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2a$10$placeholder_change_this_in_production');
