<h1 align="center">Pokedex API</h1>

<div align="center">
A RESTful Pokédex API
</div>

## Table of Contents

1. [Stack](#stack)
2. [Features](#features)
3. [Getting Started](#getting-started)
    1. [Installing the Dependencies](#1-install-the-dependencies)
    2. [Process & Import the Pokédex Dataset](#2-process--import-the-pokédex-dataset)
    3. [Start the Server](#3-start-the-server)
4. [Testing & Debugging](#testing--debugging)
    1. [Testing](#testing)
    2. [Debugging](#debugging)
5. [Building the Project](#building-the-project)
6. [Version](#version)
7. [Author](#author)

## Stack

- TypeScript
- PostgreSQL
- TypeORM
- NestJS

## Features

- Third normal form (3NF) database schema
- Dataset processing script located in `scripts` which cleans the dataset and produces a new dataset in `dataset/processed`
- Dataset importing script located in `scripts` which imports the processed dataset in `dataset/processed` into a PostgreSQL database

## Getting Started

### 1. Install the Dependencies

You'll need to install the project dependencies before you can start the server:

```bash
$ npm install
```

### 2. Process & Import the Pokédex Dataset

After installing the project dependencies, process and import the dataset into the Pokédex database:

```bash
# Process the dataset
$ npm run data:process

# Import the dataset
$ npm run data:import
```

### 3. Start the Server

You can start the server in various modes:

```bash
# Start the server in Development mode
$ npm run start

# Start the server in Production mode
$ npm run start:prod
```

## Testing & Debugging

### Testing

You can test the server by using any of the following commands below:

```bash
# Run unit tests
$ npm run test

# Run and watch unit tests
$ npm run test:watch

# Run E2E tests
$ npm run test:e2e

# Create a code coverage report
$ npm run test:cov
```

### Debugging

For debugging, you can debug the server or unit tests using one of the commands below:

```bash
# Start the server in Debug mode
$ npm run start:debug

# Debug unit tests
$ npm run test:debug
```

## Building the Project

To build the production bundle, run the following command:

```bash
$ npm run build
```

## Version

0.0.1

## Author

Gurdev S. Panue