FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./

RUN npm install -f --production

COPY . .

CMD [ "node", "index.js" ]
