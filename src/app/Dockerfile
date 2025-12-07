#
# 1️⃣ Build Angular App
#
FROM node:20 AS build-frontend

# Set working directory
WORKDIR /app/frontend

# Copy Angular files
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the Angular project
COPY frontend/ ./

# Build Angular app for production
RUN npm run build --prod



#
# 2️⃣ Build Backend + Combine Angular dist
#
FROM node:20 AS backend

WORKDIR /app

# Copy backend
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

# Copy Angular dist into backend public folder
COPY --from=build-frontend /app/frontend/dist/ /app/public/



#
# 3️⃣ Final Run Stage
#
FROM node:20 AS final

WORKDIR /app

# Copy backend from previous stage
COPY --from=backend /app /app

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
