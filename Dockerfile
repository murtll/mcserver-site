FROM node:17-stretch-slim as BUILDER

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build \
&& cp -r public/images/ build/ \
&& cp -r public/*.pdf build/ \
&& cp -r public/sitemap.xml build/ \
&& cp -r public/manifest.json build/ \
&& cp -r public/favicon.ico build/


FROM nginx:alpine

EXPOSE 8080

RUN rm -rf /var/cache/apk/*  \
    && rm -rf /usr/share/nginx/html/*

COPY default.conf /etc/nginx/conf.d/

COPY --from=BUILDER /app/build /usr/share/nginx/html