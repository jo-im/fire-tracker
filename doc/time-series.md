# File `time-series.js`
[Functions](#functions)
[Classes](#classes)


Global
========


## Classes
* [TimeSeries](#class-TimeSeries)

## Class: TimeSeries

Plays a fire perimeter animation with given GeoJSON data.
Must be used within a Leaflet map.
The incoming GeoJSON features have timestamps which we group
in the `series` object.  As soon as the layer is created,
we start a `runLoop` that performs for the lifespan of the
time series layer.  When the layer is set to play, each time
the loop performs, it adds a layer to the map pane... then it
advances the frame number so that the next loop performance will
add the succeeding layer.  The loop always runs but only renders
new layers if `playing` is set to true.  This is easier than
starting and stopping the run loop, and is less likely to lead
to weird timing conditions.

***

### Properties

| name | type | description |
|------|------|-------------|
| **shouldReplay** | `boolean` | Indicates if the replay button should be displayed(user has reached the end of the animation). |
| **weight** | `number` | The weight of the svg path.  Defaults to 0. |
| **fillOpacity** | `number` | The opacity of the svg layers.  Defaults to 1. |
| **progress** | `string` | The percentage progress of the animation. |
| **stopped** | `boolean` | Indicates if the animation is paused(not playing). |

***

### Methods
* [constructor](#constructor-geoJSON-transitionDuration-x21e8-undefined-)
* [play
Causes the animation to start playing.](#play
Causes the animation to start playing.-x21e8-undefined-)
* [stop
Stops the animation.](#stop
Stops the animation.-x21e8-undefined-)

***

### constructor(geoJSON, transitionDuration)  &#x21e8; `undefined`



**Parameters**

| name | type | description |
|------|------|-------------|
| **geoJSON** | `object` | An object representing geoJSON. |
| **transitionDuration** | `nubmer` | The number of milliseconds between each time a boundary is rendered. |


---

### play
Causes the animation to start playing.()  &#x21e8; `undefined`






---

### stop
Stops the animation.()  &#x21e8; `undefined`






---


