FROM node:alpine

RUN mkdir /appigdri
WORKDIR /appigdri

COPY package.json /appigdri
RUN npm install

COPY . /appigdri
EXPOSE 3030

CMD ["npm", "start"]