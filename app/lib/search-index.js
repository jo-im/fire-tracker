import Ember from 'ember';
import fuzzySoundex from 'npm:talisman/phonetics/fuzzy-soundex';

// This is a very simplistic full-text search implementation.
// It is not advanced in any way.  It just creates a regex
// matcher off the query string and uses that to find a 
// corresponding item.  The matcher just uses monograms(i.e. bag of words)
// as well as a phonetic matcher, which helps when a word
// is misspelled but is homophonic.
//
// I wrote this because existing standalone FTS implementations
// were either too large or didn't work.  This should suffice
// for our use case. 

class SearchIndex {
  constructor(items){
    this.items = [];

    // NOT SURE IF THIS REALLY HELPS SO COMMENTED OUT FOR NOW
    // (items || []).forEach(item => {
    //   Ember.run.later(() => {
    //     let data = item.data;
    //     let searchable = [];
    //     Object.keys(data).forEach(k => {
    //       let value = data[k];
    //       if(typeof value === 'string'){
    //         // searchable.push(value);
    //         let val = value.split(' ').map(i => fuzzySoundex(i)).join('');
    //         searchable.push(val);
    //       }
    //     });
    //     this.items.push([searchable.join(' '), item]);
    //   }, 0);
    // });

    this.items = (items || []).map((item) => {
      let data = item.data;
      let searchable = [];
      Object.keys(data).forEach((k) => {
        let value = data[k];
        if(typeof value === 'string'){
          let val = value.split(' ').map(i => fuzzySoundex(i)).join('');
          searchable.push(val);
        }
      });
      return [searchable.join(' '), item];
    });
  }
  search(query){
    let stripped = '' + query.replace(/[^\w\s]/g, '').split(' ').map(i => `(?=.*${fuzzySoundex(i)})`).join('') + '';
    let matcher  = new RegExp(stripped, 'gi');
    return this.items.filter(item => (item[0] || '').match(matcher)).map(item => item[1]);
  }
}

export default SearchIndex;

