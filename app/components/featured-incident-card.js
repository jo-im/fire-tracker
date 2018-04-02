import Ember from 'ember';

/**
 * Represents a "featured" incident on the homepage.
 * @module featured-incident-card
 * @deprecated
 */

/**
 * @class FeaturedIncidentCard
 * @extends Ember.Component
 */

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ["featured-incident-card"],
  href: '#',
  attributeBindings: ['href']
});
