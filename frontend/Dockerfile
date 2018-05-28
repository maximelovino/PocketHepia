FROM nginx:alpine

WORKDIR /app

COPY certs certs

COPY pockethepia/dist dist

COPY pockethepia.conf pockethepia.conf

RUN apk add --update openssl
RUN mkdir -p /etc/nginx/ssl
RUN openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
RUN cp pockethepia.conf /etc/nginx/conf.d/pockethepia.conf

EXPOSE 443 80