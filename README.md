# Travel Planner

A full-stack travel itinerary planner that generates optimized day plans based on user interests, time constraints, and location.

## Current Features

- REST API built with Express.js and TypeScript
- PostgreSQL database integration
- Dockerized local database environment
- Place storage and querying
- Interest-based recommendation scoring
- Greedy itinerary scheduling MVP
- Time-constrained itinerary generation

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js

### Database
- PostgreSQL

### Infrastructure
- Docker

## Architecture

```text
Client
  ↓
Express API
  ↓
Itinerary Generation Service
  ↓
PostgreSQL
```