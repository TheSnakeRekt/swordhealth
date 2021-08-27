FROM node:14-alpine
WORKDIR /app
COPY /package.json .
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 8100
RUN apk update && apk add bash
RUN chown -R node /app
USER node
CMD ["npm", "start"]
