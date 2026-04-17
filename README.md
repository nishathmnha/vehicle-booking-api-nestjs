# Vehicle Booking API

Scalable Vehicle Booking API built with NestJS, TypeORM, PostgreSQL, Docker, and Swagger. It supports vehicle management, booking creation, overlap validation, and hourly/daily pricing logic.

## Features

- Vehicle CRUD endpoints
- Booking creation and retrieval endpoints
- Booking overlap validation
- Hourly and daily pricing logic
- Swagger UI available at `/api`
- Dockerized PostgreSQL setup

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker / Docker Compose
- Swagger (`@nestjs/swagger`)

## Project Structure

```text
src/
  app.controller.ts
  app.module.ts
  main.ts
  bookings/
  common/
  config/
  vehicles/
