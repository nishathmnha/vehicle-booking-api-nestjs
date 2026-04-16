# Short Explanation

## Booking overlap logic

I used the standard interval overlap rule for a single vehicle:

```text
existing.pickupDateTime < newReturnDateTime
AND
existing.returnDateTime > newPickupDateTime
```

If any record matches that condition for the same `vehicleId`, the API throws `409 Conflict`.

## Pricing logic

- `hourly`: round the duration up to the next hour, multiply by `hourlyRate`, then cap it at `dailyRate`
- `daily`: round the duration up to the next day, multiply by `dailyRate`

This keeps pricing predictable for partial-hour or partial-day bookings.

## Assumptions made

- Vehicle fields follow the PDF examples: `title`, `hourlyRate`, `dailyRate`, and `status`
- Booking fields follow the PDF examples: `vehicleId`, `pickupDateTime`, `returnDateTime`, `pricingMode`, and calculated `totalAmount`
- Vehicles can only be deleted when no bookings reference them

## Deployment approach

The project includes:

- a `Dockerfile` for the NestJS API
- `docker-compose.yml` for the API and PostgreSQL
- environment-driven database configuration for easy deployment to Render, Railway, AWS, Azure, or Google Cloud

## Structure

The project is split into focused NestJS modules:

- `vehicles` for CRUD operations
- `bookings` for booking rules and pricing
- `config` for database bootstrap
- `common` for shared enums and helpers

