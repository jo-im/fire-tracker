Styles
======

The style sheets in this application follow a specific convention to reduce coupling and to promote reusability.  Although most components in this application are not intended to be reused a lot, I find these practices to be good for organizing style & layout behavior so that changes in the future can be made quickly without the developer having to waste a lot of time sifting.

Here's an outline of the basic principles of the style workflow:

- Layout styles for each route(i.e. every page) belong under `app/styles/layouts`.
- Design, scaling, and internal layout styles for every component go under `app/styles/components`.
- Shared "themes" for components belong in `app/styles/themes`, and get included inside layouts.
- Component styles have their own mixins, following a naming convention, that are included in layouts in order to account for responsiveness & scaling under media queries.

The overall naming convention for class names & ID selectors is very similar to [BEM](http://getbem.com/naming/).  You can think of the naming construction like this:

`component__sub-element--modifier`

Layouts are `l` prefixed:

`l-page-name__component--modifier`

Themes are `t` prefixed:

`t-theme-name`

It doesn't matter too much if there are occasions where these rules get broken – the important thing is to **stay consistent**.


## Components

Components have the fewest rules around how they are written.  Each component gets its own stylesheet, and these styles deal with the design of the individual component and how elements within the component are laid out at different sizes.  This is generally where information about colors, icons, background images, and internal layout belongs.

There are a few rules around component style sheets:

- Component styles should not have knowledge around the external layout or the page that they are on.  
- A component should handle responsiveness by having mixins that provide information to the layout about how it should look at different sizes.  These mixins follow the same naming convention that we use for our selectors.
- Font sizes should use `px` and not `rem`.  Only use `em` under some limited conditions.

Be sure to add the class name to the component in `app/components` so it can be properly selected.  If you had a component called "page-header", this is how you would do it:

```javascript
// app/components/page-header.js

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['page-header']
});
```

### Mixins

Component mixins provide information to layouts on how to display a component at a given size.  Each mixin follows this naming convention:

`component-name--size-modifier`

So if we had a component called `.info-cards`, you will likely want to create these mixins:

`info-cards--xl`
`info-cards--lg`
`info-cards--med`
`info-cards--sm`
`info-cards--xs`

Defining `info-cards--med` might look like this:

```sass
# app/styles/components/info-cards.sass

@mixin info-cards--med
  font-size: 16px
  .info-cards__card
    flex-direction: column
  .info-cards__card__pipe
    display: none
```

At arbitrary media breakpoints, the current layout can include that mixin so that the display of the component changes at the right screen width.

If you find the mixins you have made just aren't working well for a given window size in your layout, simply add another mixin for your purpose.  For example, if you need another mixin between `lg` size and `xl`, you could go with something like `info-cards--jumbo`.  But generally try to stick to the same size-modifier convention for the most part.


## Layout

Every page in the app has its own stylesheet.  Layout styles are the most restrictive: they should almost always only deal with how components on the page are laid out and scaled.  If you're dealing with fonts, colors, or icons directly in layout stylesheets, you are **probably doing it wrong**.

We do this for two reasons:

- Each page necessarily has its own way of displaying a component, and each component has its own form of styling, so it reduces the amount of developer confoundment by keeping these concepts separate.  For example, a developer doesn't have to dig through as much code to figure out why an icon isn't displaying properly if they know they can just look at the component style, rather than having to account for some overriding style elsewhere in the application.
- The separation of responsibilities allows for truly reusable components because the layout does not depend on knowledge of the internal workings of a component, nor does a component need to have any idea what page or container it resides in.
- Size and layout of components should follow our grid system - generally avoiding reliance on percentages.

### Grid

Layouts follow a grid of 12 columns(72px) and 11 gutters(42px).  The size of components should generally "snap" to these columns & gutters so that size and alignment remains consistent.  All our designs at KPCC follow this grid system.

What you will want to do most of the time is set a hard width, based on those units, to components on a page; at screen widths just above where the window would be too small for the component to fit, the layout stylesheet should set a media query breakpoint a little above that screen width, and `@include` the mixins for components at the sizes where they would fit at smaller screen widths.

For example:

```sass
$large-breakpoint: 1024px
$medium-breakpoint: 820px
$small-breakpoint: 320px

#l-page__component
  @media(max-width: $large-breakpoint)
    @include component--lg
  @media(max-width: $medium-breakpoint)
    @include component--med
  @media(max-width: $small-breakpoint)
    @include component--sm
```


## Themes

Themes are merely design overrides for components or layout containers.  They should only contain information on stuff like colors, icons, & fonts; themes should not have any influence on layout, or contain any stylistic choices that would break layout.


## Edge Cases

### Component Naming

**What if I've got a component or element that's more of a container without much of a specific purpose?**

Say you've got a part of your page that needs to contain a map and a description under that map.  You could call such a component `map-with-description`.

### What if I don't need to make a full "component"?

If an element on a page isn't going to live anywhere else besides that page, and has little to no logic of its own, it probably doesn't make sense to run `ember g component` for that specific element.

However, you should still generally treat this element as a component by giving it its own style sheet to keep its design separate from the page layout stylesheet.






