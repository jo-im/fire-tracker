import Ember from 'ember';

export function exists([value]) {
  // used when a zero value should be
  // considered valid in logic
  if(value === null) return false;
  return value !== void(0);
}

export default Ember.Helper.helper(exists);
