FROM node:17-stretch-slim

COPY package.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build && yarn global add serve

EXPOSE 3000

CMD ["yarn", "prod"]