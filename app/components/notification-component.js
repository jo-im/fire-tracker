import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['notification-component', 't-dark'],
  classNameBindings: ['active:notification-component--active']
});
