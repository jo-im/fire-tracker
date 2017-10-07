import Ember from 'ember';

export function orNotAny([value, customDefault]) {
  return value || (customDefault || 'n/a');
}

export default Ember.Helper.helper(orNotAny);
