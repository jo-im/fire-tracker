import Ember from 'ember';

/**
 * The global masthead for the application.
 * @module masthead-component
 * @example
 * {{masthead-component id="some-page"}}
 */

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ["masthead-component"],
  classNameBindings: [
    'hasBorder:masthead-component--bordered'
  ],
  hasBorder: false
});
