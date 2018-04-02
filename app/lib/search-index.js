import fuzzySoundex from 'npm:talisman/phonetics/fuzzy-soundex';
import damerauLevenshtein from 'npm:talisman/metrics/distance/damerau-levenshtein';
import moment from 'npm:moment';

/**
 * @module search-index
 * @overview
 * This is a very simplistic full-text search implementation.
 * It is not advanced in any way.  It creates a regex matcher off
 * a query string and uses that to find a corresponding item.
 * The matcher just uses monograms(i.e. bag of words) as well
 * as a phonetic matcher, which helps when a word is misspelled
 * but is homophonic.
 * 
 * I wrote this because existing standalone FTS implementations
 * for the browser were either too large or didn't work well.
 * This should suffice for our use case.
 */

class SearchIndex {
  /**
   * @function constructor
   * @param {array} items - The items to be searched through.  Items can be any kind of object.
   */
  constructor(items){
    this.items = (items || []).map(item => {
      let data = item.data;
      let indice = [];
      Object.keys(data).forEach(k => {
        let value   = data[k];
        if(typeof value === 'string'){
          value.split(' ').forEach(v => {
            indice.push(v);
            indice.push(fuzzySoundex(v));
          });
        }
        if(typeof value === 'number'){
          let vals = moment(value).format('MMMM MMM YYYY').split(' ');
          indice.push(vals[0]);
          indice.push(vals[1]);
          indice.push(vals[2]);
        }
      });
      return [indice.filter(x => x).join(' '), item];
    });
  }
  /**
   * @method   search
   * @param   {string} query - The query string used to search for an item.
   * @returns {array}        - The items that match the query. 
   */
  search(query){
    let matcherString = query.replace(/[^\w\s\d]/g, '')
      .split(' ')
      .map(i => `(?=.*${parseInt(i) ? i : '(' + i + '|' + fuzzySoundex(i) + ')' })`).join('');
    let matcher  = new RegExp(matcherString, 'gi');
    let items = this.items.filter(item => (item[0] || '').match(matcher));
    if(!query.match(/\d/)){
      items = items.sort((a, b) => {
        return damerauLevenshtein(query, a[1].get('name')) - damerauLevenshtein(query, b[1].get('name'));
      });
    }
    return items.map(item => item[1]);
  }
}

export default SearchIndex;

