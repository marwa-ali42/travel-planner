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
    country
)
VALUES
('Louvre Museum','museum',48.8606,2.3376,4.9,180,'Paris','France'),
('Musée d''Orsay','museum',48.8600,2.3266,4.8,150,'Paris','France'),
('Centre Pompidou','museum',48.8606,2.3522,4.6,120,'Paris','France'),
('Eiffel Tower','landmark',48.8584,2.2945,4.8,120,'Paris','France'),
('Notre-Dame Cathedral','landmark',48.8530,2.3499,4.8,90,'Paris','France'),
('Arc de Triomphe','landmark',48.8738,2.2950,4.7,60,'Paris','France'),
('Luxembourg Gardens','park',48.8462,2.3372,4.8,90,'Paris','France'),
('Tuileries Garden','park',48.8635,2.3270,4.7,75,'Paris','France'),
('Le Marais','food',48.8575,2.3622,4.8,90,'Paris','France'),
('Rue Montorgueil','food',48.8635,2.3478,4.7,75,'Paris','France'),
('Champs-Élysées','shopping',48.8698,2.3078,4.6,120,'Paris','France'),
('Montmartre','viewpoint',48.8867,2.3431,4.8,120,'Paris','France')
ON CONFLICT (name, city) DO NOTHING;