FROM node:20-alpine

WORKDIR /nextjs

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]