ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install pnpm@9.1.1 turbo@2.0.14 --global
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects
FROM base AS pruner
ARG PROJECT
RUN echo "Project:" ${PROJECT}
WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

FROM base AS build
ARG PROJECT

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/tsconfig.json ./tsconfig.json
COPY --from=pruner /app/.eslintrc.json ./.eslintrc.json
COPY --from=pruner /app/tailwind.config.cjs ./tailwind.config.cjs
COPY --from=pruner /app/postcss.config.cjs ./postcss.config.cjs
COPY --from=pruner /app/prettier.config.cjs ./prettier.config.cjs


# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN pnpm run build --filter=${PROJECT}
RUN pnpm deploy --filter=${PROJECT} --prod /prod/${PROJECT}

FROM base as runner
WORKDIR /app
ARG PROJECT
ENV NODE_ENV production

COPY --from=build /app/apps/${PROJECT}/next.config.mjs .
COPY --from=build /app/apps/${PROJECT}/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build /app/apps/${PROJECT}/.next/standalone ./
COPY --from=build /app/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static
COPY --from=build /app/apps/${PROJECT}/public ./apps/${PROJECT}/public

# CMD ["npm", "run", "start"]
EXPOSE 3000
CMD node apps/www/server.js

