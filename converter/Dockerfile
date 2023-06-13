FROM node:18.16.0-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]