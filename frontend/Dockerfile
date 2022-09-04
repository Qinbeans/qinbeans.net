FROM node:slim AS BUILD
WORKDIR /build

COPY package.json package.json
COPY astro.config.mjs astro.config.mjs
COPY src src
COPY public public
COPY tailwind.config.cjs tailwind.config.cjs
COPY tsconfig.json tsconfig.json
COPY .env.production .env.production

# Install dependencies
RUN yarn

# ENTRYPOINT [ "yarn","run","dev","--host","--port=8085" ]

# Build
RUN yarn run build

FROM denoland/deno:distroless AS RUNNER

# WORKDIR /app
# Copy ./dist from BUILD stage
COPY --from=BUILD /build/dist ./dist
COPY .env.production .env.production

ENTRYPOINT ["deno","run","--allow-net","--allow-read","--allow-env","./dist/server/entry.mjs" ]