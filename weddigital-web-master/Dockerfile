FROM node:16.13.2
WORKDIR /app/web/

COPY ./build/ /app/web/build/

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]