![image](https://github.com/user-attachments/assets/bec5ff9d-9776-418d-a0b4-c9028e405f17)

# Choredo REST API - The Chore TODO Web App

This chore todo REST API is responsible for injesting a valid Supabase `access_token` and connecting to a [Supabase database](https://supabase.com/) for Auth flows and table CRUD operations and [PokeAPI](https://pokeapi.co/) for read operations.

## Node.js ExpressJS Project

This project is a Node.js specifically ExpressJS application designed to run on Node.js 20. It includes various configurations to serve the app locally and build for production. 

## Hosted on Heroku
https://choredo-be-e8c454b7c00e.herokuapp.com

## Frontend Repository
https://github.com/ZackLeaman/choredo-fe

## Features

- **Development Mode**: Runs locally on `localhost:7730`.
- **Production Mode**: Runs locally on `localhost:7730`.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 20)
- **npm** (comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ZackLeaman/choredo-be.git
   cd choredo-be
   ```

2. Install dependencies:

    ```bash
    npm install

## Environment Variables

This project uses environment variables defined in .env files. Unfortunately, in order to keep this project's database credentials secret you will need to provide your own `SUPABASE_URL`, `SUPABASE_KEY`, and `JWT_SECRET`. 

- `.env.dev`
  For local development:
  ```
  SUPABASE_URL=?
  SUPABASE_KEY=?
  JWT_SECRET=?
  POKE_API=https://pokeapi.co/api/v2/pokemon
  PORT=7730
  ```

- `.env`
  For production:
  ```
  SUPABASE_URL=?
  SUPABASE_KEY=?
  JWT_SECRET=?
  POKE_API=https://pokeapi.co/api/v2/pokemon
  PORT=7730
  ```
The project will automatically load the appropriate .env file depending on the environment.

## Running the Project

  ### Development Mode

  - To run the project locally on `localhost:7730`:
    ```bash
    npm run dev
    ```
    This will start the local development server through `nodemon` allowing hot reloading on file changes.

  ### Production Mode
  
  - To run the project in production mode on `localhost:7730`:
    ```bash
    npm run start
    ```
    This will serve the app with production settings without hot reloading on file change capabilities.
