# Stage 1: Build client
FROM node:16 AS client
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client ./

# Stage 2: Build server
FROM node:16 AS server
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install
COPY server ./

# Final image
FROM node:16
WORKDIR /usr/src/app
COPY --from=client /usr/src/app/client ./client
COPY --from=server /usr/src/app/server ./server

# Environment variables
ENV PORT=8080
ENV CONNECTION_URL="mongodb+srv://OmarMostafa:ooooooo7@cluster0.ebavy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "server/index.js"]
