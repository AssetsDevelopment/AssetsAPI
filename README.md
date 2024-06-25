# Documentation for the API

## Commits

Este repositorio se encuentra vinculado a un repositorio de GitHub, el mismo posee una configuracion de GitHub Actions que se encarga de construir y pushear la imagen de Docker a Docker Hub, ademas de controlar el versionado de la imagen.

- Para realizar un commit se debe seguir el siguiente formato:
  - *Mayor:* `git commit -m "major: [nombre de la funcionalidad]"` formato para incrementar la version mayor.
  - *Minor:* `git commit -m "feat: [nombre de la funcionalidad]"` formato para incrementar la version minor.
  - *Patch:* `git commit -m "[nombre de la funcionalidad]"` formato para incrementar la version patch.

---

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
rama graphql