FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["npm", "run", "start:dev"]