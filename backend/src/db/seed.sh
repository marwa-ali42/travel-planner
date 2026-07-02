# RUN WITH `npm run seed`

#!/usr/bin/env bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Restarting containers..."
docker compose down -v
docker compose up -d

echo "Waiting for Postgres..."
sleep 3

echo "Running schema..."
docker exec -i travel_postgres psql -U admin -d travel_planner < "$SCRIPT_DIR/schema.sql"

echo "Seeding London..."
docker exec -i travel_postgres psql -U admin -d travel_planner < "$SCRIPT_DIR/seed/london.sql"

echo "Seeding Paris..."
docker exec -i travel_postgres psql -U admin -d travel_planner < "$SCRIPT_DIR/seed/paris.sql"

echo "Seeding New York..."
docker exec -i travel_postgres psql -U admin -d travel_planner < "$SCRIPT_DIR/seed/newyork.sql"

echo "Seeding Tokyo..."
docker exec -i travel_postgres psql -U admin -d travel_planner < "$SCRIPT_DIR/seed/tokyo.sql"

echo "Done!"