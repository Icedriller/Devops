#
# 1️⃣ Build Angular App
#
FROM node:20 AS build-frontend

WORKDIR /app/angular

# Copy Angular package.json
COPY package*.json ./
COPY angular.json .
COPY tsconfig*.json ./

# Install Angular dependencies
RUN npm install

# Copy Angular project source
COPY src/ ./src/

# Build Angular
RUN npm run build


#
# 2️⃣ Build Backend + Inject Angular Dist
#
FROM node:20 AS build-backend

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend code
COPY backend/ ./

# Copy Angular dist into backend/public
COPY --from=build-frontend /app/angular/dist/ /app/backend/public/


#
# 3️⃣ Final runtime image
#
FROM node:20 AS final

WORKDIR /app/backend

COPY --from=build-backend /app/backend ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
