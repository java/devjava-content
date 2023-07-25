FROM node:18-alpine
WORKDIR /app

COPY ["package.json", "./"]
COPY ["gulpfile.js", "./"]
COPY ["app", "./app"]

RUN npm install gulp -g
RUN npm install
RUN gulp build

CMD ["gulp", "serve"]