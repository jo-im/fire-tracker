import Ember from 'ember';
import { NotFoundError } from '../lib/fetch-errors';

export default Ember.Route.extend({
  headData: Ember.inject.service(),
  title: function(tokens) {
    let title = tokens.concat(['Fire Tracker | 89.3 KPCC']).join(' | ');
    return title;
  },
  actions: {
    error(error) {
      if (error instanceof NotFoundError) {
        this.transitionTo('archive');
      } else {
        // otherwise let the error bubble
        return true;
      }
    }
  },
  headTags: function(){
    let description = '89.3 KPCC\'s Fire Tracker is a tool for following and researching California wildfires.';
    return [
        {
          type: 'meta',
          tagId: 'description',
          attrs: {
            name: 'description',
            content: description
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
        },
        {
          type: 'meta',
          tagId: 'og:site_name',
          attrs: {
            property: 'og:site_name',
            content: '89.3 KPCC'
          }
        },
        {
          type: 'meta',
          tagId: 'og:type',
          attrs: {
            property: 'og:type',
            content: 'website'
          }
        },
        {
          type: 'meta',
          tagId: 'og:image',
          attrs: {
            property: 'og:image',
            content: 'https://firetracker.scpr.org/static/meta/firetracker-opengraph.jpg'
          }
        },
        {
          type: 'meta',
          tagId: 'og:image:width',
          attrs: {
            property: 'og:image:width',
            content: '1200'
          }
        },
        {
          type: 'meta',
          tagId: 'og:image:height',
          attrs: {
            property: 'og:image:height',
            content: '630'
          }
        },
        {
          type: 'meta',
          tagId: 'og:url',
          attrs: {
            property: 'og:url',
            content: 'https://firetracker.scpr.org'
          }
        },
        {
          type: 'meta',
          tagId: 'og:description',
          attrs: {
            property: 'og:description',
            content: description
          }
        },
        {
          type: 'meta',
          tagId: 'og:description',
          attrs: {
            property: 'og:description',
            content: description
          }
        },
        {
          type: 'meta',
          tagId: 'twitter:card',
          attrs: {
            name: 'twitter:card',
            content: 'summary'
          }
        },
        {
          type: 'meta',
          tagId: 'twitter:url',
          attrs: {
            name: 'twitter:url',
            content: 'https://firetracker.scpr.org'
          }
        },
        {
          type: 'meta',
          tagId: 'twitter:domain',
          attrs: {
            name: 'twitter:domain',
            content: 'https://firetracker.scpr.org'
          }
        },
        {
          type: 'meta',
          tagId: 'twitter:site',
          attrs: {
            name: 'twitter:site',
            content: 'KPCC'
          }
        },
        {
          type: 'meta',
          tagId: 'twitter:description',
          attrs: {
            name: 'twitter:description',
            content: description
          }
        },
        {
          type: 'meta',
          tagId: 'twitter:image:src',
          attrs: {
            name: 'twitter:image:src',
            content: 'https://firetracker.scpr.org/static/meta/firetracker-opengraph.jpg'
          }
        },
      ];
  }
});




