FROM node:20-alpine

ENV APP_ROOT /app

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY package.json ${APP_ROOT}

RUN apk update
RUN apk add git

RUN npm install -g typescript 

RUN npm install
ADD . ${APP_ROOT}
RUN npm run build

ENV HOST 0.0.0.0
