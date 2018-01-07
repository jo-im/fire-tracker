import Ember from 'ember';
import ENV from '../config/environment';
import shoebox from '../mixins/shoebox';

export default Ember.Route.extend(shoebox, {
  progress: Ember.inject.service(),
  model(){
    let progress = this.get('progress');
    progress.start();
    return this.store.findRecord('settings', 'global')
      .then(settings => {
        progress.inc(1/4);
        let hash = {
          settings,
          archiveFires: this.store.query('sparse-fire', {queries: [{limit: 11, descending: true}]} ).then(fires => {
            progress.inc(1/4);
            return fires;
          }),
          searchData: this.get('store').query('sparse-fire', {queries: [{limit: 20, descending: true}]}).then(results => {
            progress.inc(1/4);
            return results.toArray().filter(f => !f.get('wasExtinguished'));
          })
        };
        let fireSeasonYear = settings.get('seasonStats.year');
        if(fireSeasonYear){
          hash['fireSeason'] = this.fetch(`${ENV.couchdb.endpoint}/fires/_design/display/_view/fire-season-${fireSeasonYear}?limit=20&reduce=true`)
            .then(resp => resp.json())
            .catch(() => {
              // someone probably misconfigured the year
              // so do nothing
              return {};
            })
            .then(json => {
              progress.inc(1/4);
              return Ember.RSVP.Promise.resolve(((json.rows || []).pop() || {}).value)
            });
        } else {
          progress.inc(1/4);
        }
        return Ember.RSVP.hash(hash);
      });
  },
  afterModel(){
    this.get('progress').done();
  }
});

