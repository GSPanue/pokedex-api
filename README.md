<h1 align="center">Pokédex API</h1>

<div align="center">
A RESTful Pokédex API
</div>

## Table of Contents

1. [Features](#features)
2. [Design](#design)
    1. [Stack](#stack)
    2. [Database Schema](#database-schema)
    3. [API Contract](#api-contract)
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

## Features

- Third normal form (3NF) database schema
- Dataset processing script located in `scripts` which cleans the dataset and produces a new dataset in `dataset/processed`
- Dataset importing script located in `scripts` which imports the processed dataset in `dataset/processed` into a PostgreSQL database

## Design

### Stack

- TypeScript
- PostgreSQL
- TypeORM
- NestJS

### Dataset

The project makes use of a dataset compiled by Mario Tormo Romero on [Kaggle](https://kaggle.com), encompassing data on 1045 Pokémon, including various forms, up to the 8th generation.

Source: [Complete Pokémon Dataset (Updated 16.04.21)](https://www.kaggle.com/datasets/mariotormo/complete-pokemon-dataset-updated-090420)

### Database Schema

#### Table: Pokemon

| Name              | Data Type            | Nullable |
| ----------------- | -------------------- | -------- |
| id (primary)      | int (auto_increment) | No       |
| pokedex_id        | int                  | No       |
| name_id           | int                  | No       |
| generation_id     | int                  | No       |
| rarity_id         | int                  | No       |
| species_id        | int                  | No       |
| type_1_id         | int                  | No       |
| type_2_id         | int                  | Yes      |
| height_id         | int                  | No       |
| weight_id         | int                  | No       |
| ability_1_id      | int                  | Yes      |
| ability_2_id      | int                  | Yes      |
| ability_hidden_id | int                  | Yes      |

#### Table: Name

| Name             | Data Type            | Nullable |
| ---------------- | -------------------- | -------- |
| id (primary)     | int (auto_increment) | No       |
| name             | varchar              | No       |
| japanese_name_id | int                  | No       |
| german_name_id   | int                  | No       |

#### Table: Japanese_Name

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| name         | varchar              | No       |

#### Table: German_Name

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| name         | varchar              | No       |

#### Table: Generation

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| number       | int                  | No       |

#### Table: Rarity

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| level        | varchar              | No       |

#### Table: Species

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| name         | varchar              | No       |

#### Table: Ability

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| name         | varchar              | No       |

#### Table: Type

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| element      | varchar              | No       |

#### Table: Height

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| metres       | numeric(8, 2)        | No       |

#### Table: Weight

| Name         | Data Type            | Nullable |
| ------------ | -------------------- | -------- |
| id (primary) | int (auto_increment) | No       |
| kg           | numeric(8, 2)        | No       |

### API Contract

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