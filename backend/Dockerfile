FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY . .

WORKDIR /app/pocketHepiaServer

EXPOSE 8080

RUN npm install

ENTRYPOINT [ "npm", "start" ]