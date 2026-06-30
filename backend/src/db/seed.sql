INSERT INTO places (name, category, latitude, longitude, rating, avg_visit_duration, city, country)
VALUES
('British Museum', 'museum', 51.5194, -0.1270, 4.8, 120, 'London', 'UK'),
('Tower of London', 'history', 51.5081, -0.0759, 4.7, 90, 'London', 'UK'),
('Borough Market', 'food', 51.5055, -0.0910, 4.7, 60, 'London', 'UK'),
('Hyde Park', 'park', 51.5073, -0.1657, 4.6, 60, 'London', 'UK'),
('Random Place 1', 'park', 51.5073, -0.1657, 4.6, 40, 'London', 'UK'),
('Random Place 2', 'museum', 51.4533, -0.6570, 6.0, 30, 'London', 'UK'),
('Random Place 3', 'park', 51.5133, -0.1650, 2.0, 60, 'London', 'UK'),
('Random Place 4', 'food', 51.5223, -0.4870, 8.0, 90, 'London', 'UK'),
('Random Place 5', 'food', 51.5573, -0.1657, 7.0, 10, 'London', 'UK'),
('Random Place 6', 'park', 50.9573, 0.0257, 7.0, 10, 'London', 'UK')

ON CONFLICT (name, city) DO NOTHING;