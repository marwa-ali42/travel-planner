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
    country
)
VALUES
('Central Park','park',40.7829,-73.9654,4.9,120,'New York','United States'),
('The Metropolitan Museum of Art','museum',40.7794,-73.9632,4.9,180,'New York','United States'),
('Museum of Modern Art','museum',40.7614,-73.9776,4.8,150,'New York','United States'),
('American Museum of Natural History','museum',40.7813,-73.9735,4.8,150,'New York','United States'),
('Times Square','landmark',40.7580,-73.9855,4.6,60,'New York','United States'),
('Empire State Building','landmark',40.7484,-73.9857,4.7,90,'New York','United States'),
('Brooklyn Bridge','landmark',40.7061,-73.9969,4.8,60,'New York','United States'),
('Chelsea Market','food',40.7424,-74.0060,4.8,90,'New York','United States'),
('Katz''s Delicatessen','food',40.7223,-73.9874,4.7,60,'New York','United States'),
('High Line','park',40.7480,-74.0048,4.7,75,'New York','United States'),
('Fifth Avenue','shopping',40.7609,-73.9754,4.7,120,'New York','United States'),
('Top of the Rock','viewpoint',40.7587,-73.9787,4.8,90,'New York','United States')
ON CONFLICT (name, city) DO NOTHING;