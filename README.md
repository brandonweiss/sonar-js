# Sonar.js

A tiny library for detecting when a browser is scrolled to the bottom of a web page.

For example, you might use this on a blog to show a popover when a reader has finished a post, letting them know they can receive new posts by email if they submit their email address.

## Installation

`yarn add sonar-js`

The package comes in two types of modules: UMD and ES6.

* Universal Module Definition — ES5 wrapped in a UMD module; suitable for simpler build systems or even just dropping it directly onto a page. No transpiling necessary. Your build system can find it via the `main` key in `package.json` or in `dist/sonar.js`.
* ES6 Module — ES5 wrapped in an ES6 module; suitable for build systems that know how to handle ES6 modules. The code itself has already been transpiled to ES5 for convenience, but a build system will still have to transpile the module declaration as no browsers currently support ES6 modules. Your build system can find it via the `module` or `jsnext:main` keys in `package.json` or in `dist/sonar.es.js`.

The package is built on-the-fly before publishing to NPM so the `dist` folder is not in the repo. If you’d like the built files install it via `yarn` or `npm` and pluck the file you need out of `node_modules/sonar-js/dist/`.

## Usage

Create an instance of `Sonar` passing in the `window` and then call `ping` passing in the range to the bottom of the page, a function to call when within range of the bottom and a function to call when not within range of the bottom.

```javascript
var sonar = new Sonar(window)

var withinRangeOfPageBottom = function() {
  document.querySelector('.popover').classList.remove('hidden')
}

var notWithinRangeOfPageBottom = function() {
  document.querySelector('.popover').classList.add('hidden')
}

sonar.ping(600, withinRangeOfPageBottom, notWithinRangeOfPageBottom)
```

`Sonar#ping` is throttled to not call the callbacks more than once every 50ms.
