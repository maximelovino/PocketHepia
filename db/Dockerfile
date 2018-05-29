FROM mongo:latest

EXPOSE 27017

WORKDIR /tmp

ADD data/dump .

ADD mongo-wait.sh .

RUN chmod +x mongo-wait.sh

CMD /tmp/mongo-wait.sh

## TODO we should add the restore of the dump, with shell script that waits on mongo up to restore