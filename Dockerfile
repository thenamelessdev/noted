FROM node:25

COPY . .

RUN npm run setup

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]