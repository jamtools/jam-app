FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

CMD node ws-server
