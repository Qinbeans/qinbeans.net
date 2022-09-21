FROM node:slim AS BUILD
WORKDIR /build

RUN npm install -g pnpm

COPY package.json package.json
COPY astro.config.mjs astro.config.mjs
COPY src src
COPY public public
COPY tailwind.config.cjs tailwind.config.cjs
COPY tsconfig.json tsconfig.json
COPY .env.production .env.production
COPY .npmrc package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Build
RUN pnpm run build

FROM denoland/deno:distroless AS RUNNER

# WORKDIR /app
# Copy ./dist from BUILD stage
COPY --from=BUILD /build/dist ./dist
COPY .env.production .env.production

ENTRYPOINT ["deno","run","--allow-net","--allow-read","--allow-env","./dist/server/entry.mjs" ]