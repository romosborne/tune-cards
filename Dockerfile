FROM node:18 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

ADD . .

RUN yarn build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]