# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-bullseye AS base

LABEL runtime="Nest.js"

# Nest.js app lives here
WORKDIR /app

# Set production environment by default
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Install node modules for the build
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

RUN npx prisma generate
RUN npm run build


# Build application if NODE_ENV is production
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm prune --omit=dev; \
    fi

# Final stage for the production image
FROM base

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Expose port 3333 for the Nest.js app
EXPOSE 3333

# Starting the app
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start:prod; else npm install @nestjs/cli && npm run start:dev; fi"]
