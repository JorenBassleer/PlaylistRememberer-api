# build step
FROM node AS node-builder
WORKDIR /api
COPY package*.json ./
RUN npm ci
COPY . .

# serve step
FROM node:20-alpine AS server
WORKDIR /api
COPY --from=node-builder /api/node_modules ./node_modules
COPY --from=node-builder /api/package*.json ./
CMD ["node", "app.js"]