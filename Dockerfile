FROM node:16

RUN apt-get update -y 

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . .


ENV PORT=8080
ENV CONNECTION_URL="mongodb+srv://OmarMostafa:ooooooo7@cluster0.ebavy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

EXPOSE 8080

CMD [ "node", "index.js" ]