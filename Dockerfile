FROM node:20-alpine

WORKDIR /nextjs

COPY . .

RUN yarn install --check-files
RUN yarn build

CMD ["yarn", "start"]