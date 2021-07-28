FROM node:14 as base

WORKDIR /home/node/app

COPY tsconfig.json ./
# consider removing the next line
COPY package*.json ./

RUN yarn

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN yarn run build
