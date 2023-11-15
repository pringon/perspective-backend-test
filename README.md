# Backend Engineer Work Sample

Service is built on top a 2-tier system using Typescript/Express to handle business logic and PostgresQL as the persistence layer.

Current functionality allows creating new users and getting all users.

Configuration options can be found in `.env.example` and `src/config.ts`.

## Scripts

`npm start` starts the server (alias to `npm run start:api`).

`npm run dev:api` starts server with reload on save.

`npm run dev` starts compose workflow with postgres database and migration.

`npm run migrate` runs postgres migrations.

`npm test` runs all tests.

`npm run lint` lints your code for style errors.

## API Endpoints

1. `POST /users` accepts a user and stores it in a database.
    - The user should have a unique id, a name, a unique email address and a creation date
2. `GET /users` returns (all) users from the database.
    - Can receive a query parameter `created` which sorts users by creation date ascending or descending. Sorts ascending by default.

## Composable Workflow

It is recommended that you use the composable workflow for local development. You can do so by running `docker compose up`.

It stands up a containerized postgres instance and runs the migrations against it before starting up the api.

A PGAdmin instance is also available at `localhost:8080` (connect with `postgres@postgres.com`/`postgres`) if you prefer a visual GUI for debugging.

## Running on local machine.

If you prefer to run the services locally, it is recommended to create a `perspective` database, or set `PG_DATABASE` as needed, and run `npm run migrate` to make sure your database schema is in the correct state.

At this point you can run `npm run dev:api` to start working against the API.

For all configuration options, check `src/config.ts`.
