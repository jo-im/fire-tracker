import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['footer-component'],
  currentYear: Ember.computed(function(){
    return (new Date()).getFullYear();
  }),
  tagName: 'footer'
});

