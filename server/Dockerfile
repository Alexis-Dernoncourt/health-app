# Étape de base
FROM node:20.16.0-alpine3.18 as base

# Étape pour installer toutes les dépendances (y compris les devDependencies)
FROM base as deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Étape pour installer uniquement les dépendances de production
FROM base as production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Étape de construction
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Étape finale de production
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
