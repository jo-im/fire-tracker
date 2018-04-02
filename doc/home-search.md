# File `home-search.js`
[Functions](#functions)
[Classes](#classes)


home-search
========

Used on the homepage to search for nearby fires.

A user can search by address, placename, or zip code, and the nearest fires are returned along with distances.

**Example:**
```
{{home-search searchData=model heading="Am I near a wildfire?" placeholder="Enter a zipcode, city or fire name"}}
```

## Classes
* [HomeSearch](#class-HomeSearch)

## Class: HomeSearch

***

### Properties

| name | type | description |
|------|------|-------------|
| **searchData** | `array` | A list of fire objects to be searched. |
| **searchIndex** | `object` | A full-text-search index computed off the searchData property. |

***

### Methods
* [getResults](#getResults-x21e8-undefined-)

***

### getResults()  &#x21e8; `undefined`
This gets fired whenever the user makes a query.  It will first attempt to match a fire by name.  If that fails, it then tries to geocode the user's query.  The results are then sorted by distance, finally returning the closest 3 fires.






---


