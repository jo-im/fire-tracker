import Ember from 'ember';
import SearchIndex from '../lib/search-index';

export default Ember.Controller.extend({
  query: '',
  searchResults: [],
  searchIndex: Ember.computed('model', function(){
    let model = this.get('model').toArray() || [];
    return new SearchIndex(model);
  }),
  onQuery: Ember.observer('searchIndex', 'query', function() {
    // rate-limit the user input
    Ember.run.debounce(this, this.getResults, 300);
  }),
  idx: 0,
  totalResults: 0,
  getResults(){
    let query = this.get('query');
    if(query && query.length){
      let results = this.get('searchIndex').search(query);
      this.set('filteredResults', Ember.A(results));
    } else {
      this.set('filteredResults', Ember.A(this.get('model').toArray() || []));
    }
    this.set('idx', 0);
    this.set('totalResults', this.get('filteredResults.length'));
    this.set('searchResults', []);
    this.send('loadMore');
  },
  _onInit: Ember.observer('model', function(){
    // just to kick off initial results on page load
    this.getResults();
  }),
  hasMoreResults: Ember.computed('totalResults', 'idx', function(){
    return this.get('idx') < this.get('totalResults');    
  }),
  actions: {
    loadMore(){
      if(!this.get('hasMoreResults')) return;
      let filteredResults = this.get('filteredResults');
      let idx = this.get('idx');
      let searchResults   = this.get('searchResults');
      let perScroll       = 30;
      searchResults.pushObjects(filteredResults.slice(idx,idx+perScroll));
      this.set('idx', idx + perScroll)
    }
  }
});

