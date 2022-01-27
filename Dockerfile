FROM node:14-stretch-slim

COPY package.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]