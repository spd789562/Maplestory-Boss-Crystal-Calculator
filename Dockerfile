# Install dependencies only when needed
FROM node:14-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# dev
FROM node:14-alpine AS runner
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "run", "dev"]
