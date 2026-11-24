-- 1. Таблица за зали / места (родителска таблица)
CREATE TABLE venues (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INT NOT NULL CHECK (capacity > 0)
);

-- 2. Таблица за събития (свързана с venues)
CREATE TABLE events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  category TEXT NOT NULL,
  venue_id BIGINT NOT NULL REFERENCES venues(id) ON DELETE RESTRICT,
  max_participants INT NOT NULL CHECK (max_participants > 0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Таблица за записвания (свързана с events)
CREATE TABLE registrations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_class TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'waitlist')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Включване на RLS защита за всички таблици
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Политики за Етап 2 (четене и добавяне през браузър за прототипа; в Етап 3 ще се ограничи с Auth)
CREATE POLICY "Public read venues" ON venues FOR SELECT TO anon USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert events" ON events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public read registrations" ON registrations FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert registrations" ON registrations FOR INSERT TO anon WITH CHECK (true);

-- Тестови данни (първо в родителските таблици)
INSERT INTO venues (name, location, capacity) VALUES
  ('Актова зала', 'Етаж 2, крило А', 120),
  ('Компютърен кабинет 304', 'Етаж 3, крило Б', 24),
  ('Физкултурен салон', 'Партер', 80);

INSERT INTO events (title, description, event_date, category, venue_id, max_participants) VALUES
  ('Училищен хакатон 2026', 'Отборно програмиране за 9-12 клас.', '2026-12-05 10:00:00', 'tech', 2, 2),
  ('Коледен благотворителен концерт', 'Музикална програма на ученическите клубове.', '2026-12-18 17:30:00', 'culture', 1, 100),
  ('Турнир по волейбол', 'Междукласен турнир за купата на училището.', '2026-12-12 14:00:00', 'sport', 3, 40);

INSERT INTO registrations (event_id, student_name, student_class, status) VALUES
  (1, 'Иван Петров', '10А', 'confirmed'),
  (1, 'Мария Георгиева', '10Б', 'confirmed'),
  (2, 'Георги Димитров', '11В', 'confirmed');