/* global window */

import Ember from 'ember';

/**
 * Provides a simple "toast" notification that pops up when the data for a fire has been modified.
 * @module notification-component
 * @example 
 * {{notification-component active=model.fire.isOutdated}}
 */

/**
 * @class NotificationComponent
 * @extends Ember.Component
 * @property {boolean} active - If true, show the notification.
 */

export default Ember.Component.extend({
  classNames: ['notification-component', 't-dark'],
  classNameBindings: ['active:notification-component--active'],
  actions: {
    reload(){
      window.location.reload(true);
    }
  }
});
