FROM node:10 as node-build
WORKDIR /app
COPY . /app
RUN npm install && \
    BASE_URL="/" npm run build

FROM nginx:alpine
COPY --from=node-build /app/dist /usr/share/nginx/html
