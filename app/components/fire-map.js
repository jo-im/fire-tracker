import LeafletMap from 'ember-leaflet/components/leaflet-map';

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
    }else {
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

