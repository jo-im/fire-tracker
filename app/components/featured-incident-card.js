import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ["featured-incident-card"],
  href: '#',
  attributeBindings: ['href']
});
