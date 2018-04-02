import Ember from 'ember';

/**
 * The global footer for the application.
 * @module footer-component
 */

/**
 * @class FooterComponent
 * @extends Ember.Component
 * @property {number} currentYear - The current year computed, displayed under copyright.
 */

export default Ember.Component.extend({
  classNames: ['footer-component'],
  currentYear: Ember.computed(function(){
    return (new Date()).getFullYear();
  }),
  tagName: 'footer'
});

