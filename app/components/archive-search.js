import Ember from 'ember';
import FireSearch from './fire-search';
import template from '../templates/components/fire-search';

export default FireSearch.extend({
  tagName: 'form',
  classNames: ['archive-search'],
  layout: Ember.computed(function() {
    return template;
  }),
  submit(e){
    e.preventDefault();
    e.target.querySelector('input').blur();
  }
});

