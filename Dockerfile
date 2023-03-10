FROM --platform=linux/amd64 node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV LANG=en_US.UTF-8
EXPOSE 8080
RUN npm install
RUN npm run build
CMD ["npm", "start"]
