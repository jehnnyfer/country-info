# Country Info API

A simple Express.js application that integrates with two external APIs:

- Date Nager API for retrieving available countries and country information.
- Countries Now API for fetching population and flag data for countries.

This project demonstrates how to use Express.js with axios to interact with external APIs and manage configurations using environment variables with `dotenv`.

## Features

- Retrieve a list of available countries.
- Get detailed information about a specific country, including:
- Common name
- Official name
- Border countries
- Population data
- Flag URL

## Getting Started

To get started with the app, follow the steps below:

### Set up environment variables

Create a `.env` file in the root of the project based on the provided `.env.example` file. Update any necessary values according to your environment.

### Install dependencies

Run the following command to install the project dependencies:

```
npm install
```

### Start the server

Once the dependencies are installed, run the following command to start the server:

```
node .
```

This will start the server at http://localhost:8080/

## Available endpoints

- **GET /**: Retrieves a list of available countries.

- **GET /country-info/:countryCode**: Retrieves detailed information about a specific country. Replace :countryCode with the 2-letter country code (e.g., US, BR, etc.).
