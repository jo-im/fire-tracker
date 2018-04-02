import LeafletMap from 'ember-leaflet/components/leaflet-map';

/**
 * A Leaflet map with some special functionality.
 * Scroll wheel and touch zoom events are disabled.
 * A "thumbnail mode" option is added so that a map can be completely static with no interactivity.
 * Special class names are added to zoom controls so they can be moved around with media queries.
 * A 'didInitializeMap' event is also triggered once the map object has been instantiated so that child layers can wait for the map to be ready.
 * @module fire-map
 * @example
 * {{#fire-map lat=model.lat lng=model.long zoom=14}}
 *   {{map-tiles}}
 *   {{marker-layer location=model.latLong icon=model.markerIcon}}
 * {{/fire-map}}
 */

/**
 * @class FireMap
 * @extends LeafletMap
 * @property {number|string} lat - Center latitude
 * @property {number|string} lng - Center longitude
 * @property {number|string} zoom - Zoom factor
 * @property {boolean} thumbnailMode - Disables all map interactivity
 * @property {boolean} hasLoaded - Signifies that the Leaflet map object has finished loading.
 */

export default LeafletMap.extend({
  classNames: ['fire-map'],
  leafletOptions: [
    // timeseries options
    'thumbnailMode',
    'timeDimension', 'timeDimensionControl', 'timeSeries', 'timeInterval', 
    'period', 'currentTime', 'validTimeRange', 'currentTime', 'loadingTimeout', 
    'lowerLimitTime', 'upperLimitTime', 'timeDimensionControlPosition',
    'autoplay', 'timeSlider', 'loopButton', 'transitionTime', 'loop',
    // Map state options
    'center', 'zoom', 'minZoom', 'maxZoom', 'maxBounds', 'crs',
    // Interaction options
    'dragging', 'touchZoom', 'scrollWheelZoom', 'doubleClickZoom', 'boxZoom',
    'tap', 'tapTolerance', 'trackResize', 'worldCopyJump', 'closePopupOnClick',
    'bounceAtZoomLimits', 'wheelPxPerZoomLevel', 'zoomDelta', 'zoomSnap',
    // Keyboard navigation options
    'keyboard', 'keyboardPanOffset', 'keyboardZoomOffset',
    // Panning Inertia Options
    'inertia', 'inertiaDeceleration', 'inertiaMaxSpeed', 'inertiaThreshold',
    'easeLinearity', 'worldCopyJump', 'maxBoundsViscosity',
    // Control options
    'zoomControl', 'attributionControl',
    // Animation options
    'fadeAnimation', 'zoomAnimation', 'zoomAnimationThreshold', 'markerZoomAnimation'
  ],

  hasLoaded: false,

  createLayer() {
    // if(!this.get('lat') || !this.get('lng')) return;
    let options = this.get('options');
    // Don't set center and zoom right now.
    // Let base layer bind the events first
    delete options.center;
    delete options.zoom;

    if(!options.hasOwnProperty('zoomControl')){
      options.zoomControl = false;
    }

    let map = this.L.map(this.element, options);
    map.on('load', () => this.set('hasLoaded', true));
    map.scrollWheelZoom.disable()
    map.touchZoom.disable();

    if(options.thumbnailMode){
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
      // debugger
      map.getContainer().style.cursor='default';
    } else {
      let topZoom = new this.L.Control.Zoom();
      map.addControl(topZoom);
      topZoom.setPosition('topleft');
      topZoom._container.classList.add('fire-map__top-zoom');

      let bottomZoom = new this.L.Control.Zoom();
      map.addControl(bottomZoom);
      bottomZoom.setPosition('bottomleft');
      bottomZoom._container.classList.add('fire-map__bottom-zoom');
    }
    this.trigger('didInitializeMap', map);
    return map;
  }

});

