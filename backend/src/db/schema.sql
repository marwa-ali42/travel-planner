DROP TABLE IF EXISTS places CASCADE;

CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  avg_visit_duration INT NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  opening_hours JSONB,

  CONSTRAINT unique_places_name_city UNIQUE (name, city)
);

CREATE UNIQUE INDEX unique_places_idx ON places (LOWER(name), LOWER(city));
