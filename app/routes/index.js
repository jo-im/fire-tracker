import Ember from 'ember';
import fetch from 'fetch';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model(){
    return this.store.findRecord('settings', 'global')
      .then(settings => {
        let hash = {
          settings,
          archiveFires: this.store.query('sparse-fire', {queries: [{limit: 11, descending: true}]} )
        };
        let fireSeasonYear = settings.get('seasonStats.year');
        if(fireSeasonYear){
          hash['fireSeason'] = fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/fire-season-${fireSeasonYear}?limit=20&reduce=true`)
            .then(resp => resp.json())
            .catch(err => {
              // someone probably misconfigured the year
              // so do nothing
              return {};
            })
            .then(json => Ember.RSVP.Promise.resolve(((json.rows || []).pop() || {}).value));
        }
        return Ember.RSVP.hash(hash);
      });
  }
});

