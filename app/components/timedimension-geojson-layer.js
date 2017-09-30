import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import GeoJSONLayer from 'ember-leaflet/components/geojson-layer';
import PerimeterLayer from '../layers/perimeter';

export default GeoJSONLayer.extend({

  didUpdateAttrs() {
    if (!this._layer) {
      return;
    }
    // recall that GeoJSON layers are actually layer groups -- we have to clear
    // their contents first...
    this._layer.clearLayers();

    if (data) {
      // ...then add new data to recreate the child layers in an updated form
      this._layer.addData(data);
    }
  },

  createLayer() {
    var jsonLayer = L.geoJson(...this.get('requiredOptions'), this.get('options'));

    return new PerimeterLayer(jsonLayer, {
      updateTimeDimension: true,
      updateTimeDimensionMode: 'replace',
      addlastPoint: false,
      duration: 'PT20M'
    });
  },
  didCreateLayer() {
    let layer = this.get('_layer');
    let map   = layer._map;

    if(map){
      map.fitBounds(layer.getBounds());
      map.timeDimension.on('timeload', this._onTimeload);
    }
  },
  _onTimeload(data){
    var date = new Date(map.timeDimension.getCurrentTime());
    if (data.time == map.timeDimension.getCurrentTime()) {
      var totalTimes = map.timeDimension.getAvailableTimes().length;
      var position = map.timeDimension.getAvailableTimes().indexOf(data.time);
      // update map bounding box
      map.fitBounds(layer.getBounds());
    }
  },
  willDestroyLayer() {
    let layer = this.get('_layer');
    let map   = layer._map;
    map.fitBounds(layer.getBounds());
    map.timeDimension.off('timeload', this._onTimeload);
  }
});



