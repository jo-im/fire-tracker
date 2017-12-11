/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'fire-tracker',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    metricsAdapters: [
      {
        name: 'GoogleTagManager',
        environments: ['production'],
        config: {
          id: 'GTM-KVHTMW'
          // ,
          // dataLayer: [{
          //   'pageCategory': 'signup',
          //   'visitorType': 'high-value'
          // }]
        }
      }
      // {
      //   name: 'GoogleTagManager',
      //   environments: ['development', 'production'],
      //   config: {
      //     id: 'GTM-XXXX',
      //     // Use `analytics_debug.js` in development
      //     debug: environment === 'development',
      //     // Use verbose tracing of GA events
      //     trace: environment === 'development',
      //     // Ensure development env hits aren't sent to GA
      //     sendHitTask: environment !== 'development',
      //     // Specify Google Analytics plugins
      //     require: ['ecommerce']
      //   }
      // }
    ],
    moment: {
      includeTimezone: 'all'
    },
    couchdb: {
      endpoint: process.env.FIRE_TRACKER_COUCHDB_ENDPOINT
    },
    assethost: {
      endpoint: process.env.FIRE_TRACKER_ASSETHOST_ENDPOINT
    },
    mapbox: {
      geocoding: {
        accessToken: process.env.FIRE_TRACKER_MAPBOX_GEOCODING_ACCESS_TOKEN
      },
      tiles: {
        endpoint: process.env.FIRE_TRACKER_MAPBOX_TILES_ENDPOINT
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
