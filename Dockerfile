FROM node:16-alpine

WORKDIR /project/app

ENV NODE_ENV=development

COPY ./*.json ./
COPY ./.eslintrc.js ./
COPY ./.prettierrc ./

RUN npm install

CMD npm run start:dev