# Stage 1, we're gonna build our angular app in a node container and pass it to nginx
FROM node:alpine as node
WORKDIR /app

COPY pockethepia .
RUN npm install
RUN npm run build-prod


# Stage 2, we build the nginx container with the conf and we copy the dist folder from stage 1
FROM nginx:alpine

WORKDIR /app
COPY certs certs
COPY --from=node /app/dist dist
COPY pockethepia.conf /etc/nginx/conf.d/pockethepia.conf

RUN apk add --update openssl
RUN mkdir -p /etc/nginx/ssl
RUN openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048

EXPOSE 443 80