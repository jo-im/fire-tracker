import Ember from 'ember';

export function commaSeparate([number]) {
  if(number){
    return parseInt(number).toLocaleString();
  }
}

export default Ember.Helper.helper(commaSeparate);
