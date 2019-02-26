FROM node:alpine

RUN mkdir /porto
WORKDIR /porto

COPY package.json /porto
RUN npm install

COPY . /appigdri
EXPOSE 3030

ENTRYPOINT ["npm", "run"]
CMD [ "start" ]