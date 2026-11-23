-- =========================
-- London
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
    'British Museum',
    'museum',
    51.5194,
    -0.1269,
    4.8,
    120,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-17:00",
      "tuesday": "10:00-17:00",
      "wednesday": "10:00-17:00",
      "thursday": "10:00-20:30",
      "friday": "10:00-17:00",
      "saturday": "10:00-17:00",
      "sunday": "10:00-17:00"
    }'
),
(
    'Natural History Museum',
    'museum',
    51.4967,
    -0.1764,
    4.8,
    120,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-17:50",
      "tuesday": "10:00-17:50",
      "wednesday": "10:00-17:50",
      "thursday": "10:00-17:50",
      "friday": "10:00-17:50",
      "saturday": "10:00-17:50",
      "sunday": "10:00-17:50"
    }'
),
(
    'Tate Modern',
    'museum',
    51.5076,
    -0.0994,
    4.7,
    90,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-18:00",
      "tuesday": "10:00-18:00",
      "wednesday": "10:00-18:00",
      "thursday": "10:00-18:00",
      "friday": "10:00-18:00",
      "saturday": "10:00-18:00",
      "sunday": "10:00-18:00"
    }'
),
(
    'Tower Bridge',
    'landmark',
    51.5055,
    -0.0754,
    4.7,
    45,
    'London',
    'United Kingdom',
    '{
      "monday": "09:30-18:00",
      "tuesday": "09:30-18:00",
      "wednesday": "09:30-18:00",
      "thursday": "09:30-18:00",
      "friday": "09:30-18:00",
      "saturday": "09:30-18:00",
      "sunday": "09:30-18:00"
    }'
),
(
    'Big Ben',
    'landmark',
    51.5007,
    -0.1246,
    4.7,
    40,
    'London',
    'United Kingdom',
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
    'London Eye',
    'landmark',
    51.5033,
    -0.1195,
    4.6,
    60,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-18:00",
      "tuesday": "10:00-18:00",
      "wednesday": "10:00-18:00",
      "thursday": "10:00-18:00",
      "friday": "10:00-18:00",
      "saturday": "10:00-18:00",
      "sunday": "10:00-18:00"
    }'
),
(
    'Hyde Park',
    'park',
    51.5073,
    -0.1657,
    4.7,
    75,
    'London',
    'United Kingdom',
    '{
      "monday": "05:00-00:00",
      "tuesday": "05:00-00:00",
      "wednesday": "05:00-00:00",
      "thursday": "05:00-00:00",
      "friday": "05:00-00:00",
      "saturday": "05:00-00:00",
      "sunday": "05:00-00:00"
    }'
),
(
    'Regent''s Park',
    'park',
    51.5313,
    -0.1569,
    4.6,
    75,
    'London',
    'United Kingdom',
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
    'St James''s Park',
    'park',
    51.5028,
    -0.1342,
    4.6,
    60,
    'London',
    'United Kingdom',
    '{
      "monday": "05:00-00:00",
      "tuesday": "05:00-00:00",
      "wednesday": "05:00-00:00",
      "thursday": "05:00-00:00",
      "friday": "05:00-00:00",
      "saturday": "05:00-00:00",
      "sunday": "05:00-00:00"
    }'
),
(
    'Borough Market',
    'food',
    51.5055,
    -0.0910,
    4.8,
    75,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-17:00",
      "tuesday": "10:00-17:00",
      "wednesday": "10:00-17:00",
      "thursday": "10:00-17:00",
      "friday": "10:00-18:00",
      "saturday": "08:00-17:00",
      "sunday": "10:00-16:00"
    }'
),
(
    'Camden Market',
    'food',
    51.5413,
    -0.1426,
    4.7,
    90,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-18:00",
      "tuesday": "10:00-18:00",
      "wednesday": "10:00-18:00",
      "thursday": "10:00-18:00",
      "friday": "10:00-18:00",
      "saturday": "10:00-18:00",
      "sunday": "10:00-18:00"
    }'
),
(
    'Covent Garden',
    'shopping',
    51.5117,
    -0.1233,
    4.6,
    90,
    'London',
    'United Kingdom',
    '{
      "monday": "10:00-20:00",
      "tuesday": "10:00-20:00",
      "wednesday": "10:00-20:00",
      "thursday": "10:00-20:00",
      "friday": "10:00-20:00",
      "saturday": "10:00-20:00",
      "sunday": "11:00-18:00"
    }'
)
ON CONFLICT (name, city) DO NOTHING;