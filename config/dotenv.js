module.exports = function(env) {
  return {
    clientAllowedKeys: [
      'FIRE_TRACKER_COUCHDB_ENDPOINT',
      'FIRE_TRACKER_ASSETHOST_ENDPOINT',
      'FIRE_TRACKER_MAPBOX_ACCESS_TOKEN',
      'FIRE_TRACKER_MAPBOX_TILES_ID',
      'FIRE_TRACKER_MAPBOX_USERNAME'
    ]
  };
};

