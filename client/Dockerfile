FROM node:16-alpine

WORKDIR /project/app

ENV NODE_ENV=development

COPY ./client/index.html ./index.html
COPY ./client/*.js ./
COPY ./client/package*.json ./

RUN npm install

CMD npm run dev