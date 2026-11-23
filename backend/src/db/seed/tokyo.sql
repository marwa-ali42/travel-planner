-- =========================
-- Tokyo
-- =========================

INSERT INTO places (
    name,
    category,
    latitude,
    longitude,
    rating,
    avg_visit_duration,
    city,
    country,
    opening_hours
)
VALUES
(
    'Sensō-ji Temple',
    'landmark',
    35.7148,
    139.7967,
    4.8,
    90,
    'Tokyo',
    'Japan',
    '{
      "monday": "06:00-17:00",
      "tuesday": "06:00-17:00",
      "wednesday": "06:00-17:00",
      "thursday": "06:00-17:00",
      "friday": "06:00-17:00",
      "saturday": "06:00-17:00",
      "sunday": "06:00-17:00"
    }'
),
(
    'Tokyo Skytree',
    'viewpoint',
    35.7101,
    139.8107,
    4.7,
    120,
    'Tokyo',
    'Japan',
    '{
      "monday": "10:00-21:00",
      "tuesday": "10:00-21:00",
      "wednesday": "10:00-21:00",
      "thursday": "10:00-21:00",
      "friday": "10:00-21:00",
      "saturday": "10:00-21:00",
      "sunday": "10:00-21:00"
    }'
),
(
    'Meiji Jingu',
    'landmark',
    35.6764,
    139.6993,
    4.8,
    90,
    'Tokyo',
    'Japan',
    '{
      "monday": "05:00-18:00",
      "tuesday": "05:00-18:00",
      "wednesday": "05:00-18:00",
      "thursday": "05:00-18:00",
      "friday": "05:00-18:00",
      "saturday": "05:00-18:00",
      "sunday": "05:00-18:00"
    }'
),
(
    'Ueno Park',
    'park',
    35.7156,
    139.7730,
    4.7,
    90,
    'Tokyo',
    'Japan',
    '{
      "monday": "05:00-23:00",
      "tuesday": "05:00-23:00",
      "wednesday": "05:00-23:00",
      "thursday": "05:00-23:00",
      "friday": "05:00-23:00",
      "saturday": "05:00-23:00",
      "sunday": "05:00-23:00"
    }'
),
(
    'Shinjuku Gyoen',
    'park',
    35.6852,
    139.7100,
    4.8,
    120,
    'Tokyo',
    'Japan',
    '{
      "monday": "09:00-18:00",
      "tuesday": "09:00-18:00",
      "wednesday": "09:00-18:00",
      "thursday": "09:00-18:00",
      "friday": "09:00-18:00",
      "saturday": "09:00-18:00",
      "sunday": "09:00-18:00"
    }'
),
(
    'Tokyo National Museum',
    'museum',
    35.7188,
    139.7765,
    4.8,
    150,
    'Tokyo',
    'Japan',
    '{
      "monday": "09:30-17:00",
      "tuesday": "09:30-17:00",
      "wednesday": "09:30-17:00",
      "thursday": "09:30-17:00",
      "friday": "09:30-17:00",
      "saturday": "09:30-17:00",
      "sunday": "09:30-17:00"
    }'
),
(
    'teamLab Planets',
    'museum',
    35.6492,
    139.7898,
    4.8,
    120,
    'Tokyo',
    'Japan',
    '{
      "monday": "09:00-22:00",
      "tuesday": "09:00-22:00",
      "wednesday": "09:00-22:00",
      "thursday": "09:00-22:00",
      "friday": "09:00-22:00",
      "saturday": "09:00-22:00",
      "sunday": "09:00-22:00"
    }'
),
(
    'Tsukiji Outer Market',
    'food',
    35.6655,
    139.7708,
    4.7,
    90,
    'Tokyo',
    'Japan',
    '{
      "monday": "08:00-14:00",
      "tuesday": "08:00-14:00",
      "wednesday": "08:00-14:00",
      "thursday": "08:00-14:00",
      "friday": "08:00-14:00",
      "saturday": "08:00-14:00",
      "sunday": "08:00-14:00"
    }'
),
(
    'Ichiran Shibuya',
    'food',
    35.6595,
    139.7005,
    4.6,
    60,
    'Tokyo',
    'Japan',
    '{
      "monday": "11:00-23:00",
      "tuesday": "11:00-23:00",
      "wednesday": "11:00-23:00",
      "thursday": "11:00-23:00",
      "friday": "11:00-23:00",
      "saturday": "11:00-23:00",
      "sunday": "11:00-23:00"
    }'
),
(
    'Shibuya Scramble Crossing',
    'landmark',
    35.6595,
    139.7005,
    4.7,
    45,
    'Tokyo',
    'Japan',
    '{
      "monday": "00:00-23:59",
      "tuesday": "00:00-23:59",
      "wednesday": "00:00-23:59",
      "thursday": "00:00-23:59",
      "friday": "00:00-23:59",
      "saturday": "00:00-23:59",
      "sunday": "00:00-23:59"
    }'
),
(
    'Ginza',
    'shopping',
    35.6717,
    139.7650,
    4.7,
    120,
    'Tokyo',
    'Japan',
    '{
      "monday": "10:00-20:00",
      "tuesday": "10:00-20:00",
      "wednesday": "10:00-20:00",
      "thursday": "10:00-20:00",
      "friday": "10:00-20:00",
      "saturday": "10:00-20:00",
      "sunday": "10:00-20:00"
    }'
),
(
    'Tokyo Tower',
    'viewpoint',
    35.6586,
    139.7454,
    4.6,
    90,
    'Tokyo',
    'Japan',
    '{
      "monday": "09:00-22:30",
      "tuesday": "09:00-22:30",
      "wednesday": "09:00-22:30",
      "thursday": "09:00-22:30",
      "friday": "09:00-22:30",
      "saturday": "09:00-22:30",
      "sunday": "09:00-22:30"
    }'
)
ON CONFLICT (name, city) DO NOTHING;