<<<<<<< HEAD
# Vehicle Booking API

Backend assessment implementation for a Vehicle Booking API built with NestJS, TypeORM, PostgreSQL, Docker, and Swagger.

## What is included

- Vehicle CRUD endpoints
- Booking creation and retrieval endpoints
- Booking overlap validation
- Hourly and daily pricing logic
- Swagger UI available at `/api`
- Dockerized PostgreSQL setup

## Tech stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker / Docker Compose
- `@nestjs/swagger`

## Project structure

```text
src/
  app.controller.ts
  app.module.ts
  main.ts
  bookings/
  common/
  config/
  vehicles/
```

## Environment setup

Copy `.env.example` into `.env` and adjust values if needed.

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Default local values:

- `PORT=3000`
- `APP_HOST=0.0.0.0`
- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=vehicle_booking`

Optional for cloud deployments:

- `DATABASE_URL=postgresql://user:password@host:5432/database`
- If `DATABASE_URL` is set, it takes precedence over the individual `DB_*` values

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL with Docker:

```bash
docker compose up -d db
```

3. Start the API in development mode:

```bash
npm run start:dev
```

4. Open Swagger:

```text
http://localhost:3000/api
```

If `npm run start:dev` has watcher issues in your terminal, use:

```bash
npm run build
npm start
```

If you already have a local PostgreSQL server listening on `5432`, change `DB_PORT` in `.env` to `5433`, recreate the Docker database container, and then start the app again so the API connects to the Dockerized database instead of your local PostgreSQL instance.

## Run with Docker

```bash
docker compose up --build
```

API:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api
```

## Deployment

### Recommended path: Render

This project is easiest to submit on Render because you can deploy the API from the existing `Dockerfile`, provision a managed PostgreSQL database, and expose Swagger at `/api`.

Suggested Render setup:

1. Push the project to GitHub.
2. Create a Render Postgres database in the same region as your app.
3. Create a new Web Service from the repository.
4. Let Render build the app from the existing `Dockerfile`.
5. In the Web Service environment variables, set:

```text
NODE_ENV=production
APP_HOST=0.0.0.0
DATABASE_URL=<your Render internal database URL>
DB_SYNCHRONIZE=true
```

Notes:

- You do not need to set `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME` if you provide `DATABASE_URL`.
- Keep `DB_SSL` unset unless your database provider specifically requires it.
- The API root should respond at `/`.
- Swagger should be available at `/api`.

Recommended post-deploy checks:

```bash
curl https://your-service-url.onrender.com/
curl https://your-service-url.onrender.com/api
```

Then verify the main flows in Swagger:

- Create a vehicle
- Create a booking
- Verify overlap validation
- Verify hourly and daily pricing
- Confirm data persists after a redeploy

## API summary

### Vehicles

- `POST /vehicles` Create a vehicle
- `GET /vehicles` List all vehicles
- `GET /vehicles/:id` Get one vehicle
- `PATCH /vehicles/:id` Update a vehicle
- `DELETE /vehicles/:id` Delete a vehicle if it has no bookings

Example request body:

```json
{
  "title": "Toyota Prius",
  "hourlyRate": 2500,
  "dailyRate": 12000,
  "status": "active"
}
```

### Bookings

- `POST /bookings` Create a booking
- `GET /bookings` List bookings
- `GET /bookings/:id` Get one booking

Example request body:

```json
{
  "vehicleId": 1,
  "pickupDateTime": "2026-04-20T08:00:00.000Z",
  "returnDateTime": "2026-04-20T10:00:00.000Z",
  "pricingMode": "hourly"
}
```

## Pricing rules

- Hourly booking total = billable hours × `hourlyRate`
- If the hourly total exceeds the vehicle `dailyRate`, the booking is capped at `dailyRate`
- Daily booking total = billable days × `dailyRate`
- Billable hours and days are rounded up to the next whole unit

## Booking validation rules

- The vehicle must exist
- The vehicle must be `active`
- `pickupDateTime` must be before `returnDateTime`
- Bookings for the same vehicle must not overlap
- Overlaps return `409 Conflict`

## Submission artifacts covered

- Full source code
- `.env.example`
- Swagger at `/api`
- Docker support
- README
- Short technical explanation in [SHORT_EXPLANATION.md](/d:/ASSESMENTS/backend_vehicle_booking_application/SHORT_EXPLANATION.md)
=======
# vehicle-booking-api-nestjs
Scalable Vehicle Booking API using NestJS, implementing clean architecture, robust validation, booking conflict detection, and optimized pricing logic with full Swagger documentation.
>>>>>>> ec6a57c51847d5fde9449b2022cbd39f96eef83f
