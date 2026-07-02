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
    country
)
VALUES
('Sensō-ji Temple','landmark',35.7148,139.7967,4.8,90,'Tokyo','Japan'),
('Tokyo Skytree','viewpoint',35.7101,139.8107,4.7,120,'Tokyo','Japan'),
('Meiji Jingu','landmark',35.6764,139.6993,4.8,90,'Tokyo','Japan'),
('Ueno Park','park',35.7156,139.7730,4.7,90,'Tokyo','Japan'),
('Shinjuku Gyoen','park',35.6852,139.7100,4.8,120,'Tokyo','Japan'),
('Tokyo National Museum','museum',35.7188,139.7765,4.8,150,'Tokyo','Japan'),
('teamLab Planets','museum',35.6492,139.7898,4.8,120,'Tokyo','Japan'),
('Tsukiji Outer Market','food',35.6655,139.7708,4.7,90,'Tokyo','Japan'),
('Ichiran Shibuya','food',35.6595,139.7005,4.6,60,'Tokyo','Japan'),
('Shibuya Scramble Crossing','landmark',35.6595,139.7005,4.7,45,'Tokyo','Japan'),
('Ginza','shopping',35.6717,139.7650,4.7,120,'Tokyo','Japan'),
('Tokyo Tower','viewpoint',35.6586,139.7454,4.6,90,'Tokyo','Japan')
ON CONFLICT (name, city) DO NOTHING;