import LeafletTilesLayer from 'ember-leaflet/components/tile-layer';
import ENV from '../config/environment';

/**
 * A shared tile layer to be used throughout the Fire Tracker application.
 * @module map-tiles
 * @example
 * {{#leaflet-map}}
 *   {{map-tiles}}
 * {{/leaflet-map}}
 */

/**
 * @class MapTiles
 * @extends LeafletTilesLayer
 */

export default LeafletTilesLayer.extend({
  url: `https://api.mapbox.com/styles/v1/${ENV.mapbox.username}/${ENV.mapbox.tilesId}/tiles/256/{z}/{x}/{y}?access_token=${ENV.mapbox.accessToken}`,
  detectRetina: true,
  reuseTiles: true,
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
});

