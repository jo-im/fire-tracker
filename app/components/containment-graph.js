import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "svg",
  classNames: ["containment-graph", "fire-header__stats__item-icon"],
  "xmlns:dc": "http://purl.org/dc/elements/1.1/",
  "xmlns:cc": "http://creativecommons.org/ns#",
  "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "xmlns:svg": "http://www.w3.org/2000/svg",
  "xmlns": "http://www.w3.org/2000/svg",
  width: "73px",
  height: "32px",
  viewBox: "0 0 73 32",
  version: "1.1",
  didRender: function(){
    let el = this.get('element');
    if(!el){return;}
    let containment = parseInt(this.get('containment'));
    let i = 0;
    let cells = el.querySelectorAll('.containment-graph__cell');
    while(i<cells.length){
      let cell = cells[(i + 20) % 100];
      if(i >= containment){
        cell.classList.add('containment-graph__cell--muted');
      }
      i++;
    }
  }
});
