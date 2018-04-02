import MapControl from './map-control';

/**
 * Toggles the time-series animation layer in the map.
 * @class TimeSeriesControl
 * @extends MapControl
 * @property {boolean} hasInteracted - Indicates if the user has interacted with the control so we can give the component an initial state.
 */

const TimeSeriesControl =  MapControl.extend({
  classNames: ['time-series-control'],
  classNameBindings: [
    'parentView.playing:time-series-control--playing', 
    'hasInteracted:time-series-control--interacted',
    'parentView.parentView.hasLoaded:time-series-control--visible'
  ],
  hasInteracted: false,
  click() {
    let parent = this.get('parentView');
    this.set('hasInteracted', true);
    if(parent.get('playing')){
      parent.trigger('stop');
    } else {
      // parent.adjustMap();
      parent.trigger('play');
    }
  }
});

export default TimeSeriesControl;