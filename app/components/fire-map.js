import Ember from 'ember';
import LeafletMap from 'ember-leaflet/components/leaflet-map';


export default LeafletMap.extend({
  leafletOptions: [
    // timeseries options
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
    let options = this.get('options');
    // Don't set center and zoom right now.
    // Let base layer bind the events first
    delete options.center;
    delete options.zoom;
    options.timeDimensionControlOptions = {
        position: options.timeDimensionControlPosition || 'bottomleft',
        autoPlay: options.autoplay || false,
        timeSlider: options.timeSlider || true,
        loopButton: options.loopButton || true,
        playerOptions: {
            transitionTime: options.transitionTime,
            loop: options.loop || false,
        }
    };
    let map = this.L.map(this.element, options);
    this.trigger('didInitializeMap', map);
    return map;
  }

});
