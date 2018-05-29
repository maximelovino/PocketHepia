FROM mongo:latest

EXPOSE 27017

WORKDIR /tmp

ADD data/dump .

ADD mongo-wait.sh .

RUN chmod +x mongo-wait.sh

CMD /tmp/mongo-wait.sh