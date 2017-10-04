import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ["masthead-component"],
  classNameBindings: [
    'hasBorder:masthead-component--bordered'
  ],
  hasBorder: false
});
