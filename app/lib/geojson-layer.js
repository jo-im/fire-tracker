/* global L */

L.GeoJSON.Nuevo = L.GeoJSON.extend({

  // @method addData( <GeoJSON> data ): this
  // Adds a GeoJSON object to the layer.
  addData: function (geojson) {
    var features = Array.isArray(geojson) ? geojson : geojson.features,
        i, len, feature;

    if (features) {
      for (i = 0, len = features.length; i < len; i++) {
        // only add this if geometry or geometries are set and not null
        feature = features[i];
        if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
          this.addData(feature);
        } else {
          debugger
        }
      }
      return this;
    }

    var options = this.options;

    if (options.filter && !options.filter(geojson)) { return this; }

    var layer = this.geometryToLayer(geojson, options);
    if (!layer) {
      debugger
      return this;
    }
    layer.feature = this.asFeature(geojson);
    debugger

    layer.defaultOptions = layer.options;
    this.resetStyle(layer);

    if (options.onEachFeature) {
      debugger
      options.onEachFeature(geojson, layer);
    }
    debugger
    return this.addLayer(layer);
  }



  // asFeature(geojson) {
  //   debugger
  //   if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
  //     return geojson;
  //   }

  //   let output = Object.assign({
  //     properties: {},
  //   }, geojson);

  //   output.type = 'Feature';

  //   return output;
  // },

  // geometryToLayer(geojson, options) {

  //   var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
  //       properties = geojson.properties || {},
  //       coords = geometry ? geometry.coordinates : null,
  //       layers = [],
  //       pointToLayer = options && options.pointToLayer,
  //       _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
  //       latlng, latlngs, i, len;

  //   if (!coords && !geometry) {
  //     return null;
  //   }

  //   switch (geometry.type) {
  //   case 'Point':
  //     latlng = _coordsToLatLng(coords);
  //     return pointToLayer ? pointToLayer(geojson, latlng) : new Marker(latlng);

  //   case 'MultiPoint':
  //     for (i = 0, len = coords.length; i < len; i++) {
  //       latlng = _coordsToLatLng(coords[i]);
  //       layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new Marker(latlng));
  //     }
  //     return new FeatureGroup(layers);

  //   case 'LineString':
  //   case 'MultiLineString':
  //     latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
  //     return new Polyline(latlngs, options);

  //   case 'Polygon':
  //   case 'MultiPolygon':
  //     latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
  //     return new Polygon(latlngs, options);

  //   case 'GeometryCollection':
  //     for (i = 0, len = geometry.geometries.length; i < len; i++) {
  //       var layer = geometryToLayer({
  //         geometry: geometry.geometries[i],
  //         type: 'Feature',
  //         properties: geojson.properties
  //       }, options);

  //       if (layer) {
  //         layers.push(layer);
  //       }
  //     }
  //     return new FeatureGroup(layers);

  //   default:
  //     throw new Error('Invalid GeoJSON object.');
  //   }
  // }


});

export default L.GeoJSON.Nuevo;