# Documentation for the API

## Installation

```bash
$ npm install
```

## Run application (Development)

```bash
# build the image
$ docker compose build --no-cache

# run the app
$ docker compose up -d
```

## Run application (Production)

```bash
# build the image
$ docker compose -f docker-compose.prod.yml build --no-cache
```

- Base de datos en la nube: 

Configurar la varible de entorno `DATABASE_URL` para que apunte a una base de datos en la nube

`postgres://default:O2qbRJZmVz9r@ep-aged-cake-89820134.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require`

```bash
# run the app
$ docker compose -f docker-compose.prod.yml up app -d
```

- Base de datos local:

```bash
# run the app
$ docker compose -f docker-compose.prod.yml up -d
``` 
