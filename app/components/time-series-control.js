import Ember from 'ember';
import MapControl from './map-control';

export default MapControl.extend({
  tagName: 'button',
  click() {
    let parent = this.get('parentView');
    if(parent.get('playing')){
      parent.trigger('stop');
    } else {
      parent.trigger('play');
    }
  }
});

