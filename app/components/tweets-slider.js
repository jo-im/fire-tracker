import Ember from 'ember';

/**
 * Displays a list of tweet-cards for a given fire
 * @class TweetsSlider
 * @extends Ember.Component
 * @property {number}  selected     - The index of the selected card.
 * @property {number}  cardCount    - The total cards in the collection.
 * @property {boolean} atBeginning  - Returns true if selected card is the first card.
 * @property {boolean} atEnd        - Returns true if selected card is the last card.
 * @property {boolean} shouldDisplayDots - Returns true if there is more than one card.
 * @example
 * {{tweets-slider tweets=fire.latestTweets fireName=fire.name hashtag=fire.hashtag}}
 */

 /** 
  * @function constructor
  * @param    {array}   tweets       - A list of tweet objects.
  * @param    {string}  fireName     - The name of the fire referenced by the tweets.
  * @param    {string}  hashtag      - The hashtag(including the #) associated with the tweets.
 */

export default Ember.Component.extend({
  classNames: ['tweets-slider', 't-dark'],
  classNameBindings: ['atBeginning:tweets-slider--at-beginning', 'atEnd:tweets-slider--at-end'],
  selected: 1,
  cardCount: 0,
  isSelected: Ember.computed('selected', function(index){
    return this.get('selected') == index;
  }),
  didInsertElement(){
    let elements = this.element.querySelector('div.tweets-slider__cards').children,
        len      = elements.length,
        cards    = [],
         i = 0;
    while(i<len){
      cards.push(elements[i]);
      i++;
    }
    this.set('cards', cards);
    this.set('cardCount', cards.length);
    this.send('selectTweet', this.get('selected'));
  },
  atBeginning: Ember.computed('selected', function(){
    return this.get('selected') === 0;
  }),
  atEnd: Ember.computed('selected', function(){
    return this.get('selected') === (this.get('cardCount') - 1);
  }),
  shouldDisplayDots: Ember.computed('cardCount', function(){
    return (this.get('cardCount') || 0) > 1;
  }),
  actions: {
    /** 
     * @method selectTweet
     * (action) - Selects a tweet card.
     * @param {number} index - The index of the tweet card to be selected.
    */
    selectTweet(index){
      let i,
        cardCount = this.get('cardCount');
      if(index < 0){
        i = 0;
      } else if (index >= cardCount) {
        i = cardCount - 1;
      } else {
        i = index;
      }
      let el       = this.element,
          cards    = this.get('cards'),
          card     = cards[i];
      let left = -card.offsetLeft;
          left -= card.offsetWidth / 2;
          left += el.clientWidth   / 2;
      Array.from(cards).forEach(c => c.style.transform = `translateX(${left}px)`);
      this.set('selected', i);
    },
    /** 
     * @method slideLeft
     * (action) - Slides the cards to the left by one card.
    */
    slideLeft(){
      let selected = this.get('selected');
      this.send('selectTweet', selected - 1);
    },
    /**
     * @method slideRight
     * (action) - Slides the cards to the right by one card.
    */
    slideRight(){
      let selected = this.get('selected');
      this.send('selectTweet', selected + 1);
    }
  }
});
