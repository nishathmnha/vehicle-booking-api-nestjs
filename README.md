# Vehicle Booking API

Scalable Vehicle Booking API built with **NestJS**, **TypeScript**, **PostgreSQL**, and **Docker**.  
Includes booking conflict detection, pricing logic, and full Swagger documentation.

---

## 🚀 Tech Stack

- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Containerization**: Docker / Docker Compose
- **API Documentation**: Swagger (OpenAPI)

---

## ✨ Features

- Vehicle CRUD APIs
- Booking creation & retrieval
- Booking overlap validation (409 Conflict)
- Hourly & daily pricing logic (with cap)
- Swagger UI at `/api`
- Dockerized PostgreSQL setup

---

## 📁 Project Structure

```text
src/
  bookings/
  vehicles/
  common/
  config/
  main.ts
