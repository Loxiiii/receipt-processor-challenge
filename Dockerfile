FROM node:21.1

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=1010

EXPOSE 1010

CMD ["npm", "run", "dev"]