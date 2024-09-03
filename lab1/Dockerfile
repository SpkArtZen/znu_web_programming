FROM node:alpine

VOLUME [ "/app" ]

COPY . /app

RUN npm -g install serve

EXPOSE 8080

CMD ["serve", "-s", "/app/public", "-p", "8080"]
