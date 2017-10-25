import FireSearch from './fire-search';
import fetch from 'fetch';
import sortBy from 'npm:lodash.sortby';
import searchico from 'npm:searchico';
import template from '../templates/components/fire-search';

export default FireSearch.extend({
  classNames: ['archive-search'],
  layout: Ember.computed(function() {
    return template;
  })
});
