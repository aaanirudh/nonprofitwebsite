FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV LANG=en_US.UTF-8
EXPOSE 8080
CMD [ "node", "./server.js" ]
