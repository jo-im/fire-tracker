/* eslint-env node */
'use strict';

const EmberApp     = require('ember-cli/lib/broccoli/ember-app');
const nodeSass     = require('node-sass'); // loads the version in your package.json
const Funnel       = require('broccoli-funnel');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

function funnel(options){
  let sourceDir = options.sourceDir;
  delete options.sourceDir;
  let defaults  = {
    destDir: '',
    include: ['*.js', '*.css', '*.scss', '*.sass']
  };
  return new Funnel(new UnwatchedDir(sourceDir), Object.assign(defaults, options));
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
      ],
      extension: 'sass',
      nodeSass: nodeSass // Workaround for ember-cli-sass bug https://github.com/aexmachina/ember-cli-sass/issues/117
    },
    autoprefixer: {
      browsers: ['since 2013', 'not ie <= 11', '> 5% in US'],
      cascade: false
    },
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png',
        'images/backgrounds/*.jpg'
      ]
    },
    nodeModulesToVendor: [
      // 'node_modules/phantomjs-polyfills/polyfills'
      'node_modules/nprogress/',
      funnel({
        sourceDir: 'node_modules/mobile-detect',
        destDir: 'mobile-detect'
      })
    ]
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('vendor/nprogress.css');
  app.import('vendor/mobile-detect/mobile-detect.js');

  return app.toTree();
};
