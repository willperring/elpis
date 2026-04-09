FROM node:24.14 AS build

WORKDIR /app

COPY package.json yarn.lock .
RUN yarn install

COPY . .
RUN yarn build


FROM nginx:1.29-alpine AS serve

COPY --from=build /app/dist/ /usr/share/nginx/html

