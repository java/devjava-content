FROM node:18-alpine
WORKDIR /app

COPY ["package.json", "./"]
COPY ["gulpfile.js", "./"]

RUN npm install gulp -g
RUN npm install

COPY ["app", "./app"]

RUN gulp build

CMD ["gulp", "serve"]
