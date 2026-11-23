-- =========================
-- Paris
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
    'Louvre Museum',
    'museum',
    48.8606,
    2.3376,
    4.9,
    180,
    'Paris',
    'France',
    '{
      "monday": "09:00-18:00",
      "tuesday": "09:00-18:00",
      "wednesday": "09:00-18:00",
      "thursday": "09:00-18:00",
      "friday": "09:00-21:00",
      "saturday": "09:00-18:00",
      "sunday": "09:00-18:00"
    }'
),
(
    'Musée d''Orsay',
    'museum',
    48.8600,
    2.3266,
    4.8,
    150,
    'Paris',
    'France',
    '{
      "monday": "09:30-18:00",
      "tuesday": "09:30-18:00",
      "wednesday": "09:30-18:00",
      "thursday": "09:30-21:45",
      "friday": "09:30-18:00",
      "saturday": "09:30-18:00",
      "sunday": "09:30-18:00"
    }'
),
(
    'Centre Pompidou',
    'museum',
    48.8606,
    2.3522,
    4.6,
    120,
    'Paris',
    'France',
    '{
      "monday": "11:00-21:00",
      "tuesday": "11:00-21:00",
      "wednesday": "11:00-21:00",
      "thursday": "11:00-21:00",
      "friday": "11:00-21:00",
      "saturday": "11:00-21:00",
      "sunday": "11:00-21:00"
    }'
),
(
    'Eiffel Tower',
    'landmark',
    48.8584,
    2.2945,
    4.8,
    120,
    'Paris',
    'France',
    '{
      "monday": "09:30-23:45",
      "tuesday": "09:30-23:45",
      "wednesday": "09:30-23:45",
      "thursday": "09:30-23:45",
      "friday": "09:30-23:45",
      "saturday": "09:30-23:45",
      "sunday": "09:30-23:45"
    }'
),
(
    'Notre-Dame Cathedral',
    'landmark',
    48.8530,
    2.3499,
    4.8,
    90,
    'Paris',
    'France',
    '{
      "monday": "08:00-19:00",
      "tuesday": "08:00-19:00",
      "wednesday": "08:00-19:00",
      "thursday": "08:00-19:00",
      "friday": "08:00-19:00",
      "saturday": "08:00-19:00",
      "sunday": "08:00-19:00"
    }'
),
(
    'Arc de Triomphe',
    'landmark',
    48.8738,
    2.2950,
    4.7,
    60,
    'Paris',
    'France',
    '{
      "monday": "10:00-23:00",
      "tuesday": "10:00-23:00",
      "wednesday": "10:00-23:00",
      "thursday": "10:00-23:00",
      "friday": "10:00-23:00",
      "saturday": "10:00-23:00",
      "sunday": "10:00-23:00"
    }'
),
(
    'Luxembourg Gardens',
    'park',
    48.8462,
    2.3372,
    4.8,
    90,
    'Paris',
    'France',
    '{
      "monday": "07:30-21:30",
      "tuesday": "07:30-21:30",
      "wednesday": "07:30-21:30",
      "thursday": "07:30-21:30",
      "friday": "07:30-21:30",
      "saturday": "07:30-21:30",
      "sunday": "07:30-21:30"
    }'
),
(
    'Tuileries Garden',
    'park',
    48.8635,
    2.3270,
    4.7,
    75,
    'Paris',
    'France',
    '{
      "monday": "07:30-19:30",
      "tuesday": "07:30-19:30",
      "wednesday": "07:30-19:30",
      "thursday": "07:30-19:30",
      "friday": "07:30-19:30",
      "saturday": "07:30-19:30",
      "sunday": "07:30-19:30"
    }'
),
(
    'Le Marais',
    'food',
    48.8575,
    2.3622,
    4.8,
    90,
    'Paris',
    'France',
    '{
      "monday": "10:00-22:00",
      "tuesday": "10:00-22:00",
      "wednesday": "10:00-22:00",
      "thursday": "10:00-22:00",
      "friday": "10:00-22:00",
      "saturday": "10:00-22:00",
      "sunday": "10:00-22:00"
    }'
),
(
    'Rue Montorgueil',
    'food',
    48.8635,
    2.3478,
    4.7,
    75,
    'Paris',
    'France',
    '{
      "monday": "08:00-20:00",
      "tuesday": "08:00-20:00",
      "wednesday": "08:00-20:00",
      "thursday": "08:00-20:00",
      "friday": "08:00-20:00",
      "saturday": "08:00-20:00",
      "sunday": "08:00-20:00"
    }'
),
(
    'Champs-Élysées',
    'shopping',
    48.8698,
    2.3078,
    4.6,
    120,
    'Paris',
    'France',
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
    'Montmartre',
    'viewpoint',
    48.8867,
    2.3431,
    4.8,
    120,
    'Paris',
    'France',
    '{
      "monday": "08:00-22:00",
      "tuesday": "08:00-22:00",
      "wednesday": "08:00-22:00",
      "thursday": "08:00-22:00",
      "friday": "08:00-22:00",
      "saturday": "08:00-22:00",
      "sunday": "08:00-22:00"
    }'
)
ON CONFLICT (name, city) DO NOTHING;