FROM node:fermium-alpine

# Install dig utility
# RUN curl -L https://github.com/sequenceiq/docker-alpine-dig/releases/download/v9.10.2/dig.tgz|tar -xzv -C /usr/local/bin/

RUN mkdir /app
WORKDIR /app

COPY . /app
COPY ["scripts/docker/docker-start.sh", "/app"]

RUN apk update && apk add bash

RUN npm install -g pm2 nodemon --no-optional
RUN yarn install --production=false
RUN yarn build

EXPOSE 3000

CMD ["/bin/bash", "docker-start.sh"]
