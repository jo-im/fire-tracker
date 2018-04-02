# File `search-index.js`
[Functions](#functions)
[Classes](#classes)

**Overview:** This is a very simplistic full-text search implementation. It is not advanced in any way.  It creates a regex matcher off
a query string and uses that to find a corresponding item.
The matcher just uses monograms(i.e. bag of words) as well
as a phonetic matcher, which helps when a word is misspelled
but is homophonic.

I wrote this because existing standalone FTS implementations
for the browser were either too large or didn't work well.
This should suffice for our use case.

Global
========


## Classes
* [SearchIndex](#class-SearchIndex)
* [SearchIndex](#class-SearchIndex)

## Class: SearchIndex

**Deprecated:** true

***


### Methods
* [constructor](#constructor-items-x21e8-undefined-)

***

### constructor(items)  &#x21e8; `undefined`



**Parameters**

| name | type | description |
|------|------|-------------|
| **items** | `array` | The items to be searched through.  Items can be any kind of object. |


---


## Class: SearchIndex

**Deprecated:** true

***


### Methods
* [search](#search-query-x21e8-array-)

***

### search(query)  &#x21e8; `array`



**Returns:** - The items that match the query..

**Parameters**

| name | type | description |
|------|------|-------------|
| **query** | `string` | The query string used to search for an item. |


---


