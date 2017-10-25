import Ember from 'ember';
import SearchIndex from '../lib/search-index';

export default Ember.Controller.extend({
  query: '',
  searchIndex: Ember.computed('model', function(){
    let model = this.get('model').toArray() || [];
    return new SearchIndex(model);
  }),
  onQuery: Ember.observer('searchIndex', 'query', function() {
    // rate-limit the user input
    Ember.run.debounce(this, this.getResults, 300);
  }),
  getResults(){
    let query = this.get('query');
    if(query && query.length){
      var index = this.get('searchIndex');
      let results = this.get('searchIndex').search(query);
      this.set('filteredResults', results);
    } else {
      this.set('filteredResults', this.get('model') || []);
    }
  }
});
