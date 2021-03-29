FROM node:14.1-alpine as build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --only=prod

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]