-- =========================
-- New York
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
    'Central Park',
    'park',
    40.7829,
    -73.9654,
    4.9,
    120,
    'New York',
    'United States',
    '{
      "monday": "06:00-01:00",
      "tuesday": "06:00-01:00",
      "wednesday": "06:00-01:00",
      "thursday": "06:00-01:00",
      "friday": "06:00-01:00",
      "saturday": "06:00-01:00",
      "sunday": "06:00-01:00"
    }'
),
(
    'The Metropolitan Museum of Art',
    'museum',
    40.7794,
    -73.9632,
    4.9,
    180,
    'New York',
    'United States',
    '{
      "monday": "10:00-17:00",
      "tuesday": "10:00-17:00",
      "wednesday": "10:00-17:00",
      "thursday": "10:00-17:00",
      "friday": "10:00-21:00",
      "saturday": "10:00-21:00",
      "sunday": "10:00-17:00"
    }'
),
(
    'Museum of Modern Art',
    'museum',
    40.7614,
    -73.9776,
    4.8,
    150,
    'New York',
    'United States',
    '{
      "monday": "10:30-17:30",
      "tuesday": "10:30-17:30",
      "wednesday": "10:30-17:30",
      "thursday": "10:30-17:30",
      "friday": "10:30-20:30",
      "saturday": "10:30-17:30",
      "sunday": "10:30-17:30"
    }'
),
(
    'American Museum of Natural History',
    'museum',
    40.7813,
    -73.9735,
    4.8,
    150,
    'New York',
    'United States',
    '{
      "monday": "10:00-17:30",
      "tuesday": "10:00-17:30",
      "wednesday": "10:00-17:30",
      "thursday": "10:00-17:30",
      "friday": "10:00-17:30",
      "saturday": "10:00-17:30",
      "sunday": "10:00-17:30"
    }'
),
(
    'Times Square',
    'landmark',
    40.7580,
    -73.9855,
    4.6,
    60,
    'New York',
    'United States',
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
    'Empire State Building',
    'landmark',
    40.7484,
    -73.9857,
    4.7,
    90,
    'New York',
    'United States',
    '{
      "monday": "09:00-23:00",
      "tuesday": "09:00-23:00",
      "wednesday": "09:00-23:00",
      "thursday": "09:00-23:00",
      "friday": "09:00-23:00",
      "saturday": "09:00-23:00",
      "sunday": "09:00-23:00"
    }'
),
(
    'Brooklyn Bridge',
    'landmark',
    40.7061,
    -73.9969,
    4.8,
    60,
    'New York',
    'United States',
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
    'Chelsea Market',
    'food',
    40.7424,
    -74.0060,
    4.8,
    90,
    'New York',
    'United States',
    '{
      "monday": "07:00-22:00",
      "tuesday": "07:00-22:00",
      "wednesday": "07:00-22:00",
      "thursday": "07:00-22:00",
      "friday": "07:00-22:00",
      "saturday": "07:00-22:00",
      "sunday": "08:00-21:00"
    }'
),
(
    'Katz''s Delicatessen',
    'food',
    40.7223,
    -73.9874,
    4.7,
    60,
    'New York',
    'United States',
    '{
      "monday": "08:00-23:00",
      "tuesday": "08:00-23:00",
      "wednesday": "08:00-23:00",
      "thursday": "08:00-23:00",
      "friday": "08:00-23:00",
      "saturday": "08:00-23:00",
      "sunday": "08:00-23:00"
    }'
),
(
    'High Line',
    'park',
    40.7480,
    -74.0048,
    4.7,
    75,
    'New York',
    'United States',
    '{
      "monday": "07:00-20:00",
      "tuesday": "07:00-20:00",
      "wednesday": "07:00-20:00",
      "thursday": "07:00-20:00",
      "friday": "07:00-20:00",
      "saturday": "07:00-20:00",
      "sunday": "07:00-20:00"
    }'
),
(
    'Fifth Avenue',
    'shopping',
    40.7609,
    -73.9754,
    4.7,
    120,
    'New York',
    'United States',
    '{
      "monday": "10:00-20:00",
      "tuesday": "10:00-20:00",
      "wednesday": "10:00-20:00",
      "thursday": "10:00-20:00",
      "friday": "10:00-20:00",
      "saturday": "10:00-20:00",
      "sunday": "11:00-19:00"
    }'
),
(
    'Top of the Rock',
    'viewpoint',
    40.7587,
    -73.9787,
    4.8,
    90,
    'New York',
    'United States',
    '{
      "monday": "08:00-00:00",
      "tuesday": "08:00-00:00",
      "wednesday": "08:00-00:00",
      "thursday": "08:00-00:00",
      "friday": "08:00-00:00",
      "saturday": "08:00-00:00",
      "sunday": "08:00-00:00"
    }'
)
ON CONFLICT (name, city) DO NOTHING;