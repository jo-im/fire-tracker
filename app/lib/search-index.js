class SearchIndex {
  constructor(items){
    this.items = (items || []).map((item) => {
      let data = item.data;
      let searchable = [];
      Object.keys(data).forEach((k) => {
        let value = data[k];
        if(typeof value === 'string'){
          searchable.push(value);
        }
      });
      return [searchable.join(' '), item];
    });
  }
  search(query){
    let stripped = '(' + query.replace(/\W+/g, '').split(' ').join('|') + ')';
    let matcher  = new RegExp(stripped, 'gi');
    return this.items.filter(item => (item[0] || '').match(matcher)).map(item => item[1]);
  }
}

export default SearchIndex;

