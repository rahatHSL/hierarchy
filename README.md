# Hierarchy Problem

This repository contains a Node.js application built with Docker, featuring two APIs: `/auth/login` and `/employee/all`. It includes a PostgreSQL database and JWT authentication for secure access.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Database Migration](#database-migration)
- [License](#license)
>
## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose installed.
- Node.js for running unit tests locally (optional).

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rahatHSL/hierarchy.git
   cd hierarchy
   ```
2. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and update if necessary:

   ```bash
   cp .env.example .env
   ```

3. **Create Docker network**:
   ```bash
   docker network create hierarchical_network
   ```
4. **Run the Application with Docker Compose:**:
   ```bash
   docker compose up -d
   ```

## API Endpoints

1. **/auth/login (POST)**
   - Description: Authenticates a user and returns a JWT token.
   - Request Body:
   ```bash
   pass: "demo_credentials"
   ```
2. **/employee/all (GET)**

- Description: Retrieves employee hierarchy data.
- Authorization: JWT token required in the Authorization header.
- Request Parameters:
  `id`: Integer (e.g., `1`)
- JWT Validity: Tokens are valid for 2 minutes.

## Environment Variables

- HTTP_PORT: Port on which the app runs (default: `3000`).
- DB_HOST: Hostname for PostgreSQL (default: `postgres`)
- DB_PORT: PostgreSQL port (default: `5432`).
- DB_USER: PostgreSQL username.
- DB_PASS: PostgreSQL password.
- DB_NAME: PostgreSQL database name.

## Testing

Unit tests are located in the test folder. Run tests with:

```bash
npm test
```

## Database Migration

The `migration.sql` file includes scripts to create tables and insert initial data. You can execute this script in your PostgreSQL database to set up the necessary tables and demo data.

## Handling High Traffic

To handle a large volume of requests, the application architecture incorporates the following strategies:

- **Dockerize Services:** By containerizing the application and the database, it's easy to scale services horizontally. More containers can be added for the application or database services as needed.
- **Load Balancing:** A load balancer (e.g., NGINX or HAProxy) can distribute incoming requests across multiple instances of the hierarchy service to avoid bottlenecks
- **Caching:** Use caching mechanisms such as Redis or an in-memory cache to store frequently requested data, such as user information and employee hierarchy data. This reduces the load on the database.
- **Asynchronous Processing:** Where possible, offload long-running tasks (e.g., analytics, report generation) to asynchronous background jobs using a worker queue like RabbitMQ or Kafka.

## License

This project is licensed under the [MIT License](LICENSE).
