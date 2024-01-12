FROM node:18.19-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
RUN yarn 
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]