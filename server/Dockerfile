# Étape de base
FROM node:20.16.0-alpine3.20 AS base

# Étape pour installer toutes les dépendances (y compris les devDependencies)
FROM base AS deps
WORKDIR /
ADD package.json package-lock.json ./
RUN npm ci

# Étape pour installer uniquement les dépendances de production
FROM base AS production-deps
WORKDIR /
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Étape de construction
FROM base AS build
WORKDIR /
COPY --from=deps /node_modules /node_modules
ADD . .
# Copier le certificat SSL dans le conteneur
COPY --from=deps /database/ssl ./database/ssl
RUN node ace build

# Étape finale de production
FROM base
ENV NODE_ENV=production
WORKDIR /
COPY --from=production-deps /node_modules /node_modules
COPY --from=build /build /
EXPOSE 3333
CMD ["node", "./bin/server.js"]
