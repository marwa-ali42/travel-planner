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
    country
)
VALUES
('British Museum','museum',51.5194,-0.1269,4.8,120,'London','United Kingdom'),
('Natural History Museum','museum',51.4967,-0.1764,4.8,120,'London','United Kingdom'),
('Tate Modern','museum',51.5076,-0.0994,4.7,90,'London','United Kingdom'),
('Tower Bridge','landmark',51.5055,-0.0754,4.7,45,'London','United Kingdom'),
('Big Ben','landmark',51.5007,-0.1246,4.7,40,'London','United Kingdom'),
('London Eye','landmark',51.5033,-0.1195,4.6,60,'London','United Kingdom'),
('Hyde Park','park',51.5073,-0.1657,4.7,75,'London','United Kingdom'),
('Regent''s Park','park',51.5313,-0.1569,4.6,75,'London','United Kingdom'),
('St James''s Park','park',51.5028,-0.1342,4.6,60,'London','United Kingdom'),
('Borough Market','food',51.5055,-0.0910,4.8,75,'London','United Kingdom'),
('Camden Market','food',51.5413,-0.1426,4.7,90,'London','United Kingdom'),
('Covent Garden','shopping',51.5117,-0.1233,4.6,90,'London','United Kingdom')
ON CONFLICT (name, city) DO NOTHING;