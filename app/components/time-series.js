import Ember from 'ember';
import GeoJSONLayer from 'ember-leaflet/components/geojson-layer';

// HOW THE HELL DOES THIS THING WORK???
//
// I'll tell you.
//
// The incoming GeoJSON features have timestamps which we group
// in the `series` object.  As soon as the layer is created,
// we start a `runLoop` that performs for the lifespan of the
// time series later.  When the layer is set to play, each time
// the loop performs, it adds a layer to the map pane... then it
// advances the frame number so that the next loop performance will
// add the succeeding layer.  The loop always runs but only renders
// new layers if `playing` is set to true.  This is easier than
// starting and stopping the run loop, and is less likely to lead
// to weird timing conditions.  


if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}


export default GeoJSONLayer.extend({

  init(){
    this._super(...arguments);
    this.set('i', 0);
    this.set('playing', false);
    this.set('series', {});
    this.set('timeInstants', []);
    this.set('currentTime', null);
  },

  createLayer() {
    // add a separate pane to the map that we can render to
    let map        = this.get('parentComponent')._layer;
    map.createPane('time-series');
    let options = Object.assign({
      pane: 'time-series',
      className: 'time-series__feature'
    }, this.get('options'));
    var layer    = L.geoJson(...this.get('requiredOptions'), options);
    let features = [].concat(layer.getLayers());
    let series   = this.get('series');

    features.forEach((f) => {
      // load each feature into our series object
      // into groups of time instants, so that all
      // features with the same time instant are
      // loaded at once

      // compensate for old-style timestamps
      let timestamp = (f.feature.properties.time < 9999999999) ? (f.feature.properties.time * 1000) : f.feature.properties.time;

      series[timestamp] = series[timestamp] || [];
      series[timestamp].push(f);
      // Every feature exhibits behavior on add and remove.
      f.on('add', (e) => {
        var el = e.target._path;
        Ember.run.later(() => {
          if (el.classList){
            el.classList.add('time-series__feature--rendered');
          } else {
            el.className += ' ' + 'time-series__feature--rendered';
          }
        }, 20);
      });
      f.on('remove', (e) => {
        var el = e.target._path;
        Ember.run.later(() => {
          if (el.classList){
            el.classList.remove('time-series__feature--rendered');
          } else {
            el.className.replace('time-series__feature--rendered');
          }
        }, 20);
      });
      layer.addLayer(f);
    });
    this.set('timeInstants', Object.keys(series).sort());
    this.set('i', this.get('timeInstants.length'));
    // debugger
    return layer;
  },

  // addToContainer() {

  // },

  didCreateLayer() {
    // var layer = this.get('_layer');
    this.adjustMap();
    this.runLoop();
  },

  adjustMap(){
    let layer = this.get('_layer');
    let map   = layer._map;
    if(map){
      map.fitBounds(layer.getBounds());
    }
  },

  runLoop(){
    this.onTick();
    if(this.get('shouldDestroyLoop')){return;}
    Ember.run.later(Ember.run.bind(this, 'runLoop'), this.get('transitionDuration'));
  },

  onTick(){
    if(this.get('playing')){
      this.renderAnimationFrame();
      this.advanceFrame();
    }
  },

  renderAnimationFrame(){
    var layer        = this.get('_layer');
    // var map          = layer._map;
    var i            = this.get('i') || 0;
    var series       = this.get('series');
    var timeInstants = this.get('timeInstants');
    var currentTime  = timeInstants[i];
    var features     = series[currentTime];
    let timestamp    = new Date(parseInt(timeInstants[i]));
    if(!isNaN(timestamp.getTime())) {
      this.set('currentTime', timestamp);
    }
    if(features){
      if(i === 0){
        this.resetLayers();
      }
      features.forEach((f) => {
        layer.addLayer(f);
      });
    }
  },

  resetLayers(){
    var layer        = this.get('_layer');
    var series       = this.get('series');
    layer.clearLayers();
    Object.keys(this.get('timeInstants')).forEach((instant) => {
      (series[instant] || []).forEach((f) => {
        let el = f._path;
        if (el.classList){
          el.classList.remove('time-series__feature--rendered');
        } else {
          el.className.replace('time-series__feature--rendered', '');
        }
      });
    });
  },

  advanceFrame(){
    var i            = this.get('i') || 0;
    var timeInstants = this.get('timeInstants');
    i++;
    if(i >= timeInstants.length){
      // stop when we reach the end.
      this.stop();
      i = 0;
    }
    this.set('i', i);
  },
  
  play(){
    // reset playhead if we are already at the end.
    var i = this.get('i') || 0;
    var n = this.get('timeInstants.length');
    if(i === 0){
      // When the user decides to replay, the interface
      // should get rid of the current time and display
      // "loading..." or some signal of replaying
      this.set('currentTime', null);
    }
    if(i >= n){
      this.set('i', 0);
      this.set('currentTime', null);
    }
    this.set('playing', true);
  },
  
  stop(){
    this.set('playing', false);
  },

  stopped: Ember.computed('playing', function(){
    return !this.get('playing');
  }),

  shouldReplay: Ember.computed('i', 'stopped', function(){
    return (this.get('i') === 0) & this.get('stopped');
  }),

  willDestroyLayer() {
    this.set('playing', false);
    this.set('shouldDestroyLoop', true);
  }
});



