# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
COPY .env .env
EXPOSE 3000
CMD ["node", "dist/server.js"]
