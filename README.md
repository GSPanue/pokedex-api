<h1 align="center">Pokédex API</h1>

<div align="center">
A RESTful Pokédex API
</div>

## Table of Contents

1. [Features](#features)
2. [Design](#design)
    1. [Stack](#stack)
    2. [Database Schema](#database-schema)
    3. [API Specification](#api-specification)
3. [Usage](#usage)
    1. [Get All Pokémon](#get-all-pokémon)
    2. [Get Pokémon by ID](#get-pokémon-by-id)
4. [Development](#development)
    1. [Getting Started](#getting-started)
        1. [Create a .env File](#1-create-a-env-file)
        2. [Start the Docker Container](#2-start-the-docker-container)
    2. [Testing & Debugging](#testing--debugging)
    3. [Building the Project](#building-the-project)
7. [Version](#version)
8. [Author](#author)

## Features

- Large dataset with data on 1045 Pokémon
- OpenAPI 3.0.3 specification
- Normalised database schema
- Dataset cleansing, processing, and importing scripts
- Web caching with `Cache-Control` and `ETag`
- Support for CORS
- Zero-indexed pagination with `limit` and `offset`
- Pagination metadata in response headers (`X-Item-Count`, `X-Page-Count`, etc.)

## Design

### Stack

- Docker
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

### API Specification

The specification for the Pokédex API can be found [here](./openapi.yml).

## Usage

The following are basic examples of how to use the Pokédex API. For more detailed and comprehensive examples, please refer to the API specification [here](./openapi.yml).

### Get All Pokémon

#### Endpoint

```text
GET /pokedex
```

#### Query Parameters

| Name   | Description                                                       | Default Value |
| ------ | ----------------------------------------------------------------- | ------------- |
| limit  | How many Pokémon should be retrieved in a single request          | 10            |
| offset | How far into the list of Pokémon should the response start        | 0             |
| sort   | The attribute by which the list of Pokémon should be sorted       | generation    |
| order  | Specifies the order in which the list of Pokémon should be sorted | asc           |

#### Request

```text
curl -X GET http://localhost:3000/api/v1/pokedex
```

#### Response (200 OK)

##### Headers

| Key                         | Value                             |
| --------------------------- | --------------------------------- |
| Access-Control-Allow-Origin | *                                 |
| Cache-Control               | max-age=3600, public              |
| ETag                        | "dc7-PQ90ux/9Gpjcyxyi/c7lkE1rNTM" |
| X-Item-Count                | 10                                |
| X-Total-Count               | 1045                              |
| X-Page-Count                | 105                               |
| X-Current-Page              | 0                                 |
| X-Page-Size                 | 10                                |
| X-Has-Next-Page             | true                              |
| X-Has-Previous-page         | false                             |
| Content-Type                | application/json; charset=utf-8   |
| Content-Length              | 3527                              |
| Date                        | Thu, 15 Aug 2024 18:46:50 GMT     |

##### Body

```json
[
    {
        "id": 1,
        "name": "Bulbasaur",
        "german_name": "Bisasam",
        "japanese_name": "フシギダネ (Fushigidane)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Seed",
        "abilities": {
            "ability_1": "Overgrow",
            "ability_2": "",
            "ability_hidden": "Chlorophyll"
        },
        "types": {
            "type_1": "Grass",
            "type_2": "Poison"
        },
        "height": {
            "value": 0.7,
            "unit": "metres"
        },
        "weight": {
            "value": 6.9,
            "unit": "kilograms"
        }
    },
    {
        "id": 2,
        "name": "Ivysaur",
        "german_name": "Bisaknosp",
        "japanese_name": "フシギソウ (Fushigisou)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Seed",
        "abilities": {
            "ability_1": "Overgrow",
            "ability_2": "",
            "ability_hidden": "Chlorophyll"
        },
        "types": {
            "type_1": "Grass",
            "type_2": "Poison"
        },
        "height": {
            "value": 1,
            "unit": "metres"
        },
        "weight": {
            "value": 13,
            "unit": "kilograms"
        }
    },
    {
        "id": 3,
        "name": "Venusaur",
        "german_name": "Bisaflor",
        "japanese_name": "フシギバナ (Fushigibana)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Seed",
        "abilities": {
            "ability_1": "Overgrow",
            "ability_2": "",
            "ability_hidden": "Chlorophyll"
        },
        "types": {
            "type_1": "Grass",
            "type_2": "Poison"
        },
        "height": {
            "value": 2,
            "unit": "metres"
        },
        "weight": {
            "value": 100,
            "unit": "kilograms"
        }
    },
    {
        "id": 3,
        "name": "Mega Venusaur",
        "german_name": "Bisaflor",
        "japanese_name": "フシギバナ (Fushigibana)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Seed",
        "abilities": {
            "ability_1": "Thick Fat",
            "ability_2": "",
            "ability_hidden": ""
        },
        "types": {
            "type_1": "Grass",
            "type_2": "Poison"
        },
        "height": {
            "value": 2.4,
            "unit": "metres"
        },
        "weight": {
            "value": 155.5,
            "unit": "kilograms"
        }
    },
    {
        "id": 4,
        "name": "Charmander",
        "german_name": "Glumanda",
        "japanese_name": "ヒトカゲ (Hitokage)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Lizard",
        "abilities": {
            "ability_1": "Blaze",
            "ability_2": "",
            "ability_hidden": "Solar Power"
        },
        "types": {
            "type_1": "Fire",
            "type_2": ""
        },
        "height": {
            "value": 0.6,
            "unit": "metres"
        },
        "weight": {
            "value": 8.5,
            "unit": "kilograms"
        }
    },
    {
        "id": 5,
        "name": "Charmeleon",
        "german_name": "Glutexo",
        "japanese_name": "リザード (Lizardo)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Flame",
        "abilities": {
            "ability_1": "Blaze",
            "ability_2": "",
            "ability_hidden": "Solar Power"
        },
        "types": {
            "type_1": "Fire",
            "type_2": ""
        },
        "height": {
            "value": 1.1,
            "unit": "metres"
        },
        "weight": {
            "value": 19,
            "unit": "kilograms"
        }
    },
    {
        "id": 6,
        "name": "Charizard",
        "german_name": "Glurak",
        "japanese_name": "リザードン (Lizardon)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Flame",
        "abilities": {
            "ability_1": "Blaze",
            "ability_2": "",
            "ability_hidden": "Solar Power"
        },
        "types": {
            "type_1": "Fire",
            "type_2": "Flying"
        },
        "height": {
            "value": 1.7,
            "unit": "metres"
        },
        "weight": {
            "value": 90.5,
            "unit": "kilograms"
        }
    },
    {
        "id": 6,
        "name": "Mega Charizard X",
        "german_name": "Glurak",
        "japanese_name": "リザードン (Lizardon)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Flame",
        "abilities": {
            "ability_1": "Tough Claws",
            "ability_2": "",
            "ability_hidden": ""
        },
        "types": {
            "type_1": "Fire",
            "type_2": "Dragon"
        },
        "height": {
            "value": 1.7,
            "unit": "metres"
        },
        "weight": {
            "value": 110.5,
            "unit": "kilograms"
        }
    },
    {
        "id": 6,
        "name": "Mega Charizard Y",
        "german_name": "Glurak",
        "japanese_name": "リザードン (Lizardon)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Flame",
        "abilities": {
            "ability_1": "Drought",
            "ability_2": "",
            "ability_hidden": ""
        },
        "types": {
            "type_1": "Fire",
            "type_2": "Flying"
        },
        "height": {
            "value": 1.7,
            "unit": "metres"
        },
        "weight": {
            "value": 100.5,
            "unit": "kilograms"
        }
    },
    {
        "id": 7,
        "name": "Squirtle",
        "german_name": "Schiggy",
        "japanese_name": "ゼニガメ (Zenigame)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Tiny Turtle",
        "abilities": {
            "ability_1": "Torrent",
            "ability_2": "",
            "ability_hidden": "Rain Dish"
        },
        "types": {
            "type_1": "Water",
            "type_2": ""
        },
        "height": {
            "value": 0.5,
            "unit": "metres"
        },
        "weight": {
            "value": 9,
            "unit": "kilograms"
        }
    }
]
```

### Get Pokémon by ID

#### Endpoint

```text
GET /pokedex/{id}
```

#### Request

```text
curl -X GET http://localhost:3000/api/v1/pokedex/1
```

#### Response (200 OK)

##### Headers

| Key                         | Value                             |
| --------------------------- | --------------------------------- |
| Access-Control-Allow-Origin | *                                 |
| Cache-Control               | max-age=3600, public              |
| ETag                        | "168-44xlX23h35Qfw/KTfcJhQUzkOU8" |
| X-Item-Count                | 1                                 |
| Content-Type                | application/json; charset=utf-8   |
| Content-Length              | 360                               |
| Date                        | Thu, 15 Aug 2024 18:53:04 GMT     |

##### Body

```json
[
    {
        "id": 1,
        "name": "Bulbasaur",
        "german_name": "Bisasam",
        "japanese_name": "フシギダネ (Fushigidane)",
        "generation": 1,
        "rarity": "Normal",
        "species": "Seed",
        "abilities": {
            "ability_1": "Overgrow",
            "ability_2": "",
            "ability_hidden": "Chlorophyll"
        },
        "types": {
            "type_1": "Grass",
            "type_2": "Poison"
        },
        "height": {
            "value": 0.7,
            "unit": "metres"
        },
        "weight": {
            "value": 6.9,
            "unit": "kilograms"
        }
    }
]
```

## Development

### Getting Started

#### 1. Create a `.env` File

In the project root, create a `.env` file using the environment variables from [`.env.sample`](./.env.sample). Adjust the values as needed.

#### 2. Start the Docker Container

To start the server, use Docker Compose. Run the following command in your terminal:

```bash
$ docker compose up -d
```

### Testing & Debugging

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

# Debug unit tests
$ npm run test:debug
```

### Building the Project

To build the production bundle, run the following command:

```bash
$ npm run build
```

## Version

0.0.1

## Author

Gurdev S. Panue