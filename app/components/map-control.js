import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['leaflet-right','leaflet-control', 'leaflet-control-custom'],
  setMap(){},
  willRender(){
    this.get('parentView').on('didSetMap', Ember.run.bind(this, 'setMap'));
  },
  willDestroy(){
    this.get('parentView').off('didSetMap');
  }
});

