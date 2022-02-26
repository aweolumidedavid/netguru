FROM node:14.18.0-alpine AS development

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ./package*.json ./


RUN npm install

COPY . .

RUN npm run build



FROM node:14.18.0-alpine AS production

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/package.json .

COPY --from=development /usr/src/app/.env .

CMD ["node", "dist/main"]