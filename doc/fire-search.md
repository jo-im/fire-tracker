# File `fire-search.js`
[Functions](#functions)
[Classes](#classes)


fire-search
========

A shared component for searching fires.

It has no built in logic for searching.  Extend it to include search functionality.

**Example:**
```
// a component extended from fire-search may be used like this
{{custom-fire-search searchData=model heading="Am I near a wildfire?" placeholder="Enter a zipcode, city or fire name"}}
```

## Classes
* [FireSearch](#class-FireSearch)

## Class: FireSearch

***

### Properties

| name | type | description |
|------|------|-------------|
| **heading** | `string` | The heading to be displayed. |
| **placeholder** | `string` | Placeholder text for the search box. |
| **style** | `string` | A computed style tag value to add a random background image and a default gradient. |
| **background** | `string` | A computed random background image path. |

***

### Methods
* [onKeyUp](#onKeyUp-x21e8-undefined-)
* [focus](#focus-x21e8-undefined-)
* [unfocus](#unfocus-x21e8-undefined-)

***

### onKeyUp()  &#x21e8; `undefined`
**Action** Gets called on the keyup event.  Does nothing by default.  Override with your own function.






---

### focus()  &#x21e8; `undefined`
**Action** If the browser is mobile, bring the search box to the top of the viewport.






---

### unfocus()  &#x21e8; `undefined`
**Action** Removes focus from the component.  Does nothing by default.






---


