# File `tweets-slider.js`
[Functions](#functions)
[Classes](#classes)


Global
========


## Classes
* [TweetsSlider](#class-TweetsSlider)

## Class: TweetsSlider

Displays a list of tweet-cards for a given fire

***

### Properties

| name | type | description |
|------|------|-------------|
| **selected** | `number` | The index of the selected card. |
| **cardCount** | `number` | The total cards in the collection. |
| **atBeginning** | `boolean` | Returns true if selected card is the first card. |
| **atEnd** | `boolean` | Returns true if selected card is the last card. |
| **shouldDisplayDots** | `boolean` | Returns true if there is more than one card. |

***

### Methods
* [constructor](#constructor-tweets-fireName-hashtag-x21e8-undefined-)
* [selectTweet
(action) - Selects a tweet card.](#selectTweet
(action) - Selects a tweet card.-index-x21e8-undefined-)
* [slideLeft
(action) - Slides the cards to the left by one card.](#slideLeft
(action) - Slides the cards to the left by one card.-x21e8-undefined-)
* [slideRight
(action) - Slides the cards to the right by one card.](#slideRight
(action) - Slides the cards to the right by one card.-x21e8-undefined-)

***

### constructor(tweets, fireName, hashtag)  &#x21e8; `undefined`



**Parameters**

| name | type | description |
|------|------|-------------|
| **tweets** | `array` | A list of tweet objects. |
| **fireName** | `string` | The name of the fire referenced by the tweets. |
| **hashtag** | `string` | The hashtag(including the #) associated with the tweets. |


---

### selectTweet
(action) - Selects a tweet card.(index)  &#x21e8; `undefined`



**Parameters**

| name | type | description |
|------|------|-------------|
| **index** | `number` | The index of the tweet card to be selected. |


---

### slideLeft
(action) - Slides the cards to the left by one card.()  &#x21e8; `undefined`






---

### slideRight
(action) - Slides the cards to the right by one card.()  &#x21e8; `undefined`






---


