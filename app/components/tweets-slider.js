import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tweets-slider', 't-dark'],
  selected: 1,
  didInsertElement(){
    let elements = this.element.querySelector('div.tweets-slider__cards').children;
    let len      = elements.length;
    let cards    = [];
    let i = 0;
    while(i<len){
      cards.push(elements[i]);
      i++;
    }
    this.set('cards', cards);
    this.send('selectTweet', this.get('selected'));
  },
  actions: {
    selectTweet(index){
      let el       = this.element;
      let cards    = this.get('cards');
      let card     = cards[index];

      let left = -card.offsetLeft;
      left    -= card.offsetWidth / 2;
      left    += el.clientWidth   / 2;

      Array.from(cards).forEach(c => c.style.transform = `translateX(${left}px)`);

      this.set('selected', index);
    }
  }
});
