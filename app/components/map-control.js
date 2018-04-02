import Ember from 'ember';

/**
 * A base component that can be used to add a custom control to a Leaflet map.
 * This is a normal Ember component and not a Leaflet object.  Extend it
 * to make your own custom control inside a map made with ember-leaflet.
 * @class MapControl
 * @extends Ember.Component
 */

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

