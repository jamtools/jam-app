FROM node:latest

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

CMD node ws-server
