# File `fire-map.js`


fire-map
========

A Leaflet map with some special functionality.
Scroll wheel and touch zoom events are disabled.
A "thumbnail mode" option is added so that a map can be completely static with no interactivity.
Special class names are added to zoom controls so they can be moved around with media queries.
A 'didInitializeMap' event is also triggered once the map object has been instantiated so that child layers can wait for the map to be ready.

**Example:**
```
{{#fire-map lat=model.lat lng=model.long zoom=14}}
  {{map-tiles}}
  {{marker-layer location=model.latLong icon=model.markerIcon}}
{{/fire-map}}
```

## Classes
* [FireMap](#class-FireMap)

## Class: FireMap

***

### Properties

| name | type | description |
|------|------|-------------|
| **lat** | `number ❘ string` | Center latitude |
| **lng** | `number ❘ string` | Center longitude |
| **zoom** | `number ❘ string` | Zoom factor |
| **thumbnailMode** | `boolean` | Disables all map interactivity |
| **hasLoaded** | `boolean` | Signifies that the Leaflet map object has finished loading. |

***


