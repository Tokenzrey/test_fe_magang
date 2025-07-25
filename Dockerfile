# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY pnpm-lock.yaml package.json ./
COPY .npmrc .npmrc
RUN pnpm install --frozen-lockfile

# Copy all files for build
COPY . .

# Build the app (adjust if you use another build script)
RUN pnpm build

# Stage 2: Run (production)
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only built files & dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.npmrc ./

# Expose port (adjust if different)
EXPOSE 3000

# Start (adjust if you use another start script)
CMD ["pnpm", "start"]