import Ember from 'ember';

/**
 * Displays a list of featured fires on the homepage.
 * @module featured-incidents
 * @example
 * {{featured-incidents fires=featuredFires}}
 */

/**
 * @class FeaturedIncidents
 * @extends Ember.Component
 * @property {array} fires - A list of fire objects to display.
 */
export default Ember.Component.extend({
  classNames: ["featured-incidents"]
});

