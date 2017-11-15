module.exports = function(env) {
  return {
    clientAllowedKeys: [
      'FIRE_TRACKER_COUCHDB_ENDPOINT',
      'FIRE_TRACKER_ASSETHOST_ENDPOINT',
      'FIRE_TRACKER_MAPBOX_GEOCODING_ACCESS_TOKEN',
      'FIRE_TRACKER_MAPBOX_TILES_ENDPOINT'
    ]
  };
};

