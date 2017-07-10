# PostCSS Echo [![Build Status][ci-img]][ci]

[PostCSS] plugin Less-like class mixins for PostCSS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sebastiandedeyne/postcss-include-selector.svg
[ci]:      https://travis-ci.org/sebastiandedeyne/postcss-include-selector

```css
.red {
    color: red;
}

.alert--danger {
    @include .red;
}
```

```css
.red {
    color: red;
}

.alert--danger {
    color: red;
}
```

## Usage

```js
postcss([ require('postcss-include-selector') ])
```

See [PostCSS] docs for examples for your environment.
