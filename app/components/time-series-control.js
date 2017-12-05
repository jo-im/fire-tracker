import MapControl from './map-control';

export default MapControl.extend({
  classNames: ['time-series-control'],
  classNameBindings: ['parentView.playing:time-series-control--playing', 'hasInteracted:time-series-control--interacted'],
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

