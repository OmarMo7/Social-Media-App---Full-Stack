# Stage 1: Build the React application
FROM node:14-alpine AS build-client

# Set the working directory
WORKDIR /client

# Copy the package.json and package-lock.json files
COPY client/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the client application code
COPY client/ ./

# Build the client application
RUN npm run build

# Stage 2: Set up the server
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY server/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the server application code
COPY server/ ./

# Copy the built client application from the previous stage
COPY --from=build-client /client/build /app/client/build

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
