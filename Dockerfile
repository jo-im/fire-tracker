FROM node:9.2.0-alpine

MAINTAINER Ben Titcomb <btitcomb@scpr.org>

ARG FIRE_TRACKER_COUCHDB_ENDPOINT=https://jollypod.com/
ARG FIRE_TRACKER_ASSETHOST_ENDPOINT=http://localhost:3000/
ARG FIRE_TRACKER_MAPBOX_TILES_ENDPOINT=https://api.mapbox.com/styles/v1/kbriggs/cj8m2vtqn1j4w2rpmy9bi0ga2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2JyaWdncyIsImEiOiJjajg2NHpxMmcwc2I4MzJwZGZyNTU2dTU2In0.sJblWZzx_-6PmOYVVjPfLQ
ARG FIRE_TRACKER_MAPBOX_GEOCODING_ACCESS_TOKEN=pk.eyJ1Ijoia2JyaWdncyIsImEiOiJjajg2NHpxMmcwc2I4MzJwZGZyNTU2dTU2In0.sJblWZzx_-6PmOYVVjPfLQ

RUN apk update && apk add --no-cache \
  nginx \
  git \
  make \
  gcc \
  libgcc \
  g++ \
  libc-dev \
  python

RUN addgroup -S firetracker && adduser -S -g firetracker firetracker 

ENV HOME /home/firetracker

WORKDIR $HOME

ENV PATH="${HOME}/bin:${PATH}"

COPY . .

RUN npm install --no-cache

RUN node_modules/ember-cli/bin/ember build

RUN npm prune --production

COPY nginx.conf /etc/nginx/nginx.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

RUN chown -R firetracker:firetracker tmp
RUN chmod -R u+X tmp
RUN mkdir log
RUN chown -R firetracker:firetracker log
RUN chmod -R u+X log

USER firetracker

EXPOSE 8080

CMD server

