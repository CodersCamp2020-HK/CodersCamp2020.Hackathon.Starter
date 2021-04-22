FROM node:14

WORKDIR /app

COPY ./package-lock.json /app/package-lock.json
COPY ./package.json /app/package.json
COPY ./server/package*.json /app/
COPY ./client/package*.json /app/

RUN npm ci

COPY . /app/

EXPOSE 80

CMD [ "npm", "start" ]