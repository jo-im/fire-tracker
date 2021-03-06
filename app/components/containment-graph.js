import Ember from 'ember';

/**
 * Displays a little progress graph, filling in individual cells
 * based on the percentage containment.
 * @module containment-graph
 */

/**
 * @class ContainmentGraph
 * @extends Ember.Component
 * @property {string|number} containment - The percentage to be displayed by the graph.
 */

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
    if(!el) return;
    let containment = parseInt(this.get('containment') || 0);
    let i = 0;
    let cells = el.querySelectorAll('.containment-graph__cell');
    while(i<cells.length){
      let cell = cells[i];
      cell.classList.add('containment-graph__cell--muted');
      i++;
    }
    i = 0;
    while(i<cells.length){
      let idx = ((i + (i * 19)) + Math.floor((i + (i * 19)) / 100)) % 100;
      let cell = cells[idx];
      if(i <= containment){
        cell.classList.remove('containment-graph__cell--muted');
      }
      i++;
    }
  }
});
