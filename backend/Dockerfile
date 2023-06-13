FROM node:18.16.0-slim

WORKDIR /app

COPY package.json .

RUN npm install --force

# RUN npm install nodemon --force

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]