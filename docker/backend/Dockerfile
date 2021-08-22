FROM node:14 as base

WORKDIR /home/node/app

COPY . .

RUN yarn install

FROM base as production

ENV NODE_PATH=./build