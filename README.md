# PostCSS Include Selector [![Build Status][ci-img]][ci]

[PostCSS] plugin Less-like class mixins for PostCSS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sebastiandedeyne/postcss-assign.svg
[ci]:      https://travis-ci.org/sebastiandedeyne/postcss-assign

```css
.color-white {
    color: white;
}

.background-red {
    background-color: red;
}

.alert--danger {
    @assign .background-red, .color-white;
}
```

```css
.color-white {
    color: white;
}

.background-red {
}

.alert--danger {
    color: white;
    background-color: red;
}
```

## Usage

```js
postcss([ require('postcss-assign') ])
```

See [PostCSS] docs for examples for your environment.
