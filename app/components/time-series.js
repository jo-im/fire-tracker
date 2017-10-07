import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import GeoJSONLayer from 'ember-leaflet/components/geojson-layer';
import DumbControl from '../layers/dumb-control';

export default GeoJSONLayer.extend({

  i: 0,

  boundaries: [],

  playing: false,

  shouldStop: false,

  didUpdateAttrs() {
    // if (!this._layer) {
    //   return;
    // }
    // // recall that GeoJSON layers are actually layer groups -- we have to clear
    // // their contents first...
    // this._layer.clearLayers();

    // if (data) {
    //   // ...then add new data to recreate the child layers in an updated form
    //   this._layer.addData(data);
    // }
  },

  createLayer() {
    let layer = L.geoJson(...this.get('requiredOptions'), this.get('options'));
    let boundaries = this.get('boundaries');
    this.set('boundaries', boundaries.concat(layer.getLayers()));
    this.set('i', this.get('boundaries').length - 1);
    layer.clearLayers();
    return layer;
  },
  onTick(){
    var layer      = this.get('_layer');
    var map        = layer._map;
    var i          = this.get('i') || 0;
    var boundaries = this.get('boundaries') || [];
    var boundary   = boundaries[i];
    layer.clearLayers();
    layer.addLayer(boundary);
    i = i + 1;
    if(i >= boundaries.length){
      i = 0;
    }
    this.set('i', i);
    if(!this.get('shouldStop')){
      this.set('playing', true);
      Ember.run.later(Ember.run.bind(this, 'onTick'), 1000);
    } else {
      this.set('shouldStop', false);
      this.set('playing', false);
    }
  },
  didCreateLayer() {
    let layer = this.get('_layer');
    let map   = layer._map;

    if(map){
      // map.fitBounds(layer.getBounds());
      // // map.timeDimension.on('timeload', this._onTimeload);
      // map.timeDimension.on('timeload', (data) => {
      //   let mapBound   = map.getBounds();
      //   let layerBound = layer.getBounds();
      //   let shouldExpand = !mapBound.contains(layerBound);
      //   var date = new Date(map.timeDimension.getCurrentTime());
      //   if (shouldExpand && data.time == map.timeDimension.getCurrentTime()) {
      //     var totalTimes = map.timeDimension.getAvailableTimes().length;
      //     var position = map.timeDimension.getAvailableTimes().indexOf(data.time);
      //     // update map bounding box
      //     map.fitBounds(layer.getBounds());
      //   }
      // });
    }
  },
  play(){
    Ember.run.later(Ember.run.bind(this, 'onTick'), 1000);
  },
  stop(){
    this.set('shouldStop', true);
  },
  _onTimeload(data){
    // var date = new Date(map.timeDimension.getCurrentTime());
    // if (data.time == map.timeDimension.getCurrentTime()) {
    //   var totalTimes = map.timeDimension.getAvailableTimes().length;
    //   var position = map.timeDimension.getAvailableTimes().indexOf(data.time);
    //   // update map bounding box
    //   map.fitBounds(layer.getBounds());
    // }
  },
  willDestroyLayer() {
    let layer = this.get('_layer');
    let map   = layer._map;
    map.fitBounds(layer.getBounds());
    // map.timeDimension.off('timeload', this._onTimeload);
  }
});



