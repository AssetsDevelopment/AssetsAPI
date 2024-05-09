FROM node:20.8.1-alpine3.18 as dev
EXPOSE 3000
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npx prisma generate
CMD [ "npm", "run", "start:dev" ]

FROM node:20.8.1-alpine3.18 as dev-deps
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate

FROM node:20.8.1-alpine3.18 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.8.1-alpine3.18 as prod-deps
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma/
RUN npm install --prod
RUN npx prisma generate

FROM node:20.8.1-alpine3.18 as prod
EXPOSE 3000
WORKDIR /app
# ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node","dist/main.js" ]