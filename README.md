# Plan My Holiday

A full-stack travel planning application that generates personalized daily itineraries based on destination, user interests, and available time.

## Overview

This project was inspired by my travels through Thailand and Malaysia. I noticed that many travel resources provide static recommendations without considering travel distance, personal preferences, or daily time limits.

Plan My Holiday treats itinerary generation as a constraint optimization problem: selecting the most suitable locations while maximizing user interests within a fixed time budget.

## Features

- Personalized itinerary generation
- Interest-based location scoring
- Distance-aware route planning
- Time-constrained scheduling
- Interactive map-based visualization
- REST API backend
- PostgreSQL-backed location database

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React map components for location visualization

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- PostgreSQL
- Docker

### Testing

- Vitest
- Supertest

### Deployment

- Vercel (Frontend hosting)
- AWS EC2 (Backend hosting)
- Nginx (Reverse proxy)
- PM2 (Process management)
- Let's Encrypt (HTTPS)

## Algorithmic Itinerary Generation

The backend generates itineraries using a multi-step pipeline.

### 1. Interest Scoring

Locations are retrieved from PostgreSQL and scored based on how well they match the user's selected interests.

### 2. Distance Calculation

The **Haversine formula** calculates the straight-line distance between locations using latitude and longitude coordinates.

This avoids dependency on external routing APIs while providing an efficient distance estimation.

### 3. Greedy Route Selection

A greedy nearest-neighbour approach is used to construct the itinerary.

The algorithm:

- Starts with the highest-scoring location
- Selects the next best nearby location
- Continues until available time is exhausted

This provides a fast approximation for route planning.

### 4. Time Constraints

The scheduler ensures generated itineraries fit within the user's available time by considering:

- Start and end times
- Location visit duration
- Travel distance between locations

## Validation

The API validates incoming itinerary requests.

Checks include:

- Destination is provided
- Interests are submitted as an array
- Invalid requests return appropriate HTTP responses
- Unknown destinations return empty results or errors

## Architecture

```
                    User
                     |
                     v
          React + TypeScript Frontend
                 (Vercel)
                     |
                     v
             Express REST API
                 (AWS EC2)
                     |
                     v
        Itinerary Generation Service
                     |
          ---------------------
          |                   |
          v                   v
   Scoring Algorithm     PostgreSQL
   Route Generation      Database
```

## Deployment

The production system uses:

- Vercel for frontend hosting
- AWS EC2 for backend hosting
- Nginx to route HTTPS requests to the API
- PM2 to keep the Node.js server running
- Docker for PostgreSQL deployment

The frontend and backend are deployed separately and communicate through REST API requests.