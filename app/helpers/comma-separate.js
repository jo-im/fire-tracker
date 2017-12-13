import Ember from 'ember';

export function commaSeparate([number]) {
  if(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export default Ember.Helper.helper(commaSeparate);
