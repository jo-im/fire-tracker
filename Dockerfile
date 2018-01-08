FROM node:9.2.0-alpine AS base

MAINTAINER Ben Titcomb <btitcomb@scpr.org>

RUN addgroup -S firetracker && adduser -S -g firetracker firetracker 

ENV HOME /home/firetracker

WORKDIR $HOME

ENV PATH="${HOME}/bin:${PATH}"

FROM base AS dependencies

COPY package.json .

COPY package-lock.json .

RUN apk update && apk add --no-cache \
  nginx \
  git \
  make \
  gcc \
  libgcc \
  g++ \
  libc-dev \
  python \
  && npm install --no-cache \
  && apk del \
    git \
    make \
    gcc \
    libgcc \
    g++ \
    libc-dev \
    python && \
    rm -rf /var/cache/apk/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

FROM base AS release

# Production API settings
ARG FIRE_TRACKER_COUCHDB_ENDPOINT=https://firetracker.scpr.org/api
ARG FIRE_TRACKER_MAPBOX_USERNAME=kpccdatadesk
ARG FIRE_TRACKER_MAPBOX_TILES_ID=cjb72rdr026uv2snpo454snmi
ARG FIRE_TRACKER_MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoia2JyaWdncyIsImEiOiJjajg2NHpxMmcwc2I4MzJwZGZyNTU2dTU2In0.sJblWZzx_-6PmOYVVjPfLQ

COPY . .

COPY --from=dependencies /home/firetracker/package.json .

COPY --from=dependencies /home/firetracker/package-lock.json .

COPY --from=dependencies /home/firetracker/node_modules ./node_modules

RUN node_modules/ember-cli/bin/ember build --environment=production

# RUN npm prune --production

RUN apk add --no-cache nginx

COPY nginx.conf /etc/nginx/nginx.conf

# we don't need what's already in the tmp directory
# and all that junk just slows down the build process
RUN rm -rf tmp/*

RUN mkdir -p tmp && \
    chown -R firetracker:firetracker tmp && \
    chmod -R u+X tmp && \
    mkdir -p log && \
    chown -R firetracker:firetracker log && \
    chmod -R u+X log && \
    chown -R firetracker:firetracker dist && \
    chmod -R 755 dist

USER firetracker

EXPOSE 8080

CMD server

