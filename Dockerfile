FROM node:22-alpine

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm prisma migrate
RUN pnpm run build


EXPOSE 3000

CMD ["node", "dist/main"]