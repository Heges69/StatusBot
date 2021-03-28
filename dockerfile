FROM node:14

WORKDIR /usr/bot

COPY . .

RUN npm i

CMD ["node", "index.js"]