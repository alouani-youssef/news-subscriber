# Stage 1: Build the app
FROM node:20.9.0-alpine AS build
WORKDIR /app

# Copy package-related files first to leverage caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the app and build it

COPY . .

RUN pnpm build

# Stage 2: Run the app
FROM node:20.9.0-alpine AS runtime

WORKDIR /app

# Copy the built app from the 'build' stage
COPY --from=build /app /app

# Install only production dependencies
RUN pnpm install --prod


CMD ["pnpm", "start"]