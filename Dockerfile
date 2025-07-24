FROM node:20-alpine AS builder

WORKDIR /app

# Install Python, make, g++, et OpenSSL
RUN apk add --no-cache python3 make g++ openssl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install MongoDB client et OpenSSL
RUN apk add --no-cache mongodb-tools openssl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy Prisma schema
COPY prisma ./prisma/

# Copy built application from builder stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port the app runs on
EXPOSE 3002

# Add wait-for-it script (optionnel, à ajouter si besoin)
# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# Command to run the application
CMD ["node", "src/app.js"]

# Add volume for the application and node_modules
VOLUME ["/app/src", "/app/node_modules"] 