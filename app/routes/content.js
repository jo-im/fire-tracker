import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return Ember.RSVP.hash({
      article: this.store.queryRecord('article', {
        selector: {
          slug: {
            $eq: params.slug
          }
        }
      }),
      recentFires: this.get('store').query('sparse-fire', {queries: [{descending: true, limit: 3}]}),
      settings: this.store.findRecord('settings', 'global')
    });
  },
  titleToken: function(model) {
    return model.article.get('title');
  },
  headTags(){
    let model       = this.modelFor(this.routeName);
    let article     = model.article;
    let asset       = article.get('leadAsset') || {
      urls: {
        full: 'https://firetracker.scpr.org/static/meta/firetracker-opengraph.jpg'
      },
      sizes: {
        full: {
          width: '1200',
          height: '630'
        }
      }
    };
    if(!article) return [];
    return [
      {
        type: 'meta',
        tagId: 'description',
        attrs: {
          name: 'description',
          content: article.get('generatedTeaser')
        }
      },
      {
        type: 'meta',
        tagId: 'og:description',
        attrs: {
          property: 'og:description',
          content: article.get('generatedTeaser')
        }
      },
      {
        type: 'meta',
        tagId: 'twitter:description',
        attrs: {
          name: 'twitter:description',
          content: article.get('generatedTeaser')
        }
      },
      {
        type: 'meta',
        tagId: 'keywords',
        attrs: {
          name: 'keywords',
          content: [
            'KPCC', 
            'Southern California Public Radio', 
            '89.3', 
            '89.3 KPCC', 
            'Fires', 
            'Wildfires', 
            'Fire Tracker', 
            'News'
          ].filter(x => x).join(', ')
        }
      },
      {
        type: 'meta',
        tagId: 'og:image',
        attrs: {
          property: 'og:image',
          content: asset.urls.full
        }
      },
      {
        type: 'meta',
        tagId: 'og:image:width',
        attrs: {
          property: 'og:image:width',
          content: asset.sizes.full.width
        }
      },
      {
        type: 'meta',
        tagId: 'og:image:height',
        attrs: {
          property: 'og:image:height',
          content: asset.sizes.full.height
        }
      }
    ].filter(m => m.attrs.content);
  }
});

