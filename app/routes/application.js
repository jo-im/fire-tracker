import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
    return tokens.concat(['Fire Tracker | 89.3 KPCC']).join(' | ');
  },
  headTags: [
    {
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: '89.3 KPCC\'s Fire Tracker is a tool for following and researching California wildfires.'
      }
    },
    {
      type: 'meta',
      tagId: 'keywords',
      attrs: {
        name: 'keywords',
        content: 'KPCC, Southern California Public Radio, 89.3, 89.3 KPCC, Southern California, Pasadena, Los Angeles, Fires, Wildfires, Fire Tracker, News'
      }
    },
    {
      type: 'meta',
      tagId: 'author',
      attrs: {
        name: 'author',
        content: '89.3 KPCC'
      }
    }
  ]
});

