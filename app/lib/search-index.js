import fuzzySoundex from 'npm:talisman/phonetics/fuzzy-soundex';
import moment from 'npm:moment';

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
    this.items = (items || []).map((item) => {
      let data = item.data;
      let indice = [];
      Object.keys(data).forEach((k) => {
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
          // indice.push(fuzzySoundex(vals[0]));
          // indice.push(fuzzySoundex(vals[1]));
          indice.push(vals[2]);
        }
      });
      return [indice.join(' '), item];
    });
  }
  search(query){
    let matcherString = query.replace(/[^\w\s\d]/g, '')
      .split(' ')
      .map(i => `(?=.*${parseInt(i) ? i : '(' + i + '|' + fuzzySoundex(i) + ')' })`).join('');
    let matcher  = new RegExp(matcherString, 'gi');
    return this.items.filter(item => (item[0] || '').match(matcher)).map(item => item[1]);
  }
}

export default SearchIndex;

