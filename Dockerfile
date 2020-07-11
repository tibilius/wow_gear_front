FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /app/dist
COPY app.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
