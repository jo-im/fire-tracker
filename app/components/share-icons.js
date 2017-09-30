import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['share-icons'],
  classNameBindings: ['getClassNames'],
  getClassNames: Ember.computed('extra-classes', function(){
    return (this.get('extra-classes') || '').replace(',', ' ');
  })
});
