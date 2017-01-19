# Sonar.js

![](https://cloud.githubusercontent.com/assets/4727/22095892/1b8ffeb8-ddcd-11e6-9f50-1116ff201553.png)

A tiny library for detecting when a browser is scrolled to the bottom of a web page.

For example, you might use this on a blog to show a popover when a reader has finished a post, letting them know they can receive new posts by email if they submit their email address.

## Installation

`yarn add sonar-js`

The package comes in two types of modules: UMD and ES6.

* Universal Module Definition — ES5 wrapped in a UMD module; suitable for simpler build systems or even just dropping it directly onto a page. No transpiling necessary. Your build system can find it via the `main` key in `package.json` or in `dist/sonar.js`.
* ES6 Module — ES5 wrapped in an ES6 module; suitable for build systems that know how to handle ES6 modules. The code itself has already been transpiled to ES5 for convenience, but a build system will still have to transpile the module declaration as no browsers currently support ES6 modules. Your build system can find it via the `module` or `jsnext:main` keys in `package.json` or in `dist/sonar.es.js`.

The package is built on-the-fly before publishing to NPM so the `dist` folder is not in the repo. If you’d like the built files install it via `yarn` or `npm` and pluck the file you need out of `node_modules/sonar-js/dist/`.

## Usage

Create an instance of `Sonar` passing in the `window` and then call `ping` passing in the range to the bottom of the page, a function to call when within range of the bottom and an optional function to call when not within range of the bottom.

When `ping` is called one of the callbacks will fire, depending on whether or not the scroll is currently within range of the page bottom. The behavior after that depends on which callbacks are provided.

### One callback

```javascript
var sonar = new Sonar(window)

var withinRangeOfPageBottom = function() {
  document.querySelector('.popover').classList.remove('hidden')
}

sonar.ping(600, withinRangeOfPageBottom)
```

Without a second callback to fire when losing the bottom of the page this is essentially a one-time use. The callback will fire once when finding the bottom of the page and then never fire again, even if you scroll up and back down again.

This is useful for making a permanent, persistent change when someone scrolls to the bottom of the page.

### Two callbacks

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

With a second callback to fire when losing the bottom of the page this becomes a toggle. The callbacks will only fire once when finding the bottom or losing the bottom. That is, the callbacks will only fire or re-fire when the state changes.

This is useful for making a permanent, temporary change when someone scrolls to the bottom of the page and then reversing it when they scroll away from the bottom of the page.

## Tests

`yarn test`

## Credit

The icon is [Depth Sounder by Toni Bordoy](https://thenounproject.com/term/depth-sounder/172726).

## Contributing

1. Fork it ( https://github.com/brandonweiss/sonar-js/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am "Add some feature"`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
