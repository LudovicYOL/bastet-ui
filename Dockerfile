FROM node:lts-alpine AS build

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install && npm run build -- --prod

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
RUN sed -i '/location \/ {/a\ \ \ \ \ \ \ \ try_files $uri $uri/ /index.html =404;' /etc/nginx/conf.d/default.conf
