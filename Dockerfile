FROM node:10.16-stretch

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --force

COPY . .

CMD node server/index.js
