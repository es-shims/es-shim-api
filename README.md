# es-shim API <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

## API Contract
For any given “es-shim API”-compliant package `foo`, the following invariants must hold:
 - This package will run in an environment supporting the oldest JS version in which the spec’s semantics are achievable - ES3, ES5, and/or ES6. The package should indicate its minimum level of required environment support in its README.
 - The package must attempt to support `node`/`io.js`, all versions of all ES3-compliant browers or later, Web Workers, and `node-webkit`. Other environments are a plus, but not expected.
 - `require('foo')` is a spec-compliant JS function. However, if the function’s behavior depends on a receiver (a “this” value), then the first argument to this function will be used as that receiver. The package should indicate if this is the case in its README.
 - `require('foo').implementation` or `require('foo/implementation')` is a spec-compliant JS function, that will depend on a receiver (a “this” value) as the spec requires.
 - `require('foo').getPolyfill` or `require('foo/polyfill')` is a function that when invoked, will return the most compliant and performant function that it can - if a native version is available, and does not violate the spec, then the native function will be returned - otherwise, either the `implementation`, or a custom, wrapped version of the native function, will be returned.
 - `require('foo').shim` or `require('foo/shim')` is a function that when invoked, will call `getPolyfill`, and if the polyfill doesn’t match the built-in value, will install it into the global environment.
 - The only place the package may modify the environment is within its `shim` method.
 - Naturally, `npm test` must run the package’s tests.
 - In every way possible, the package must attempt to make itself robust against the environment being modified *after* it is `require`d.
  - For example, `require('foo'); delete Function.prototype.call;` must not alter the behavior of `foo`.
  - The most useful technique for this is shown in this example: `var bind = require('function-bind'); var slice = bind.call(Function.call, Array.prototype.slice); slice([1], 1);` — this technique works in ES3 environments, and will ensure that modifying `Array.prototype` will not interfere with the package.

## Recommended dependencies
 - Please use the [es-abstract][es-abstract-url] module to ensure spec-compliant behavior via the spec’s internal abstract operations.
 - Please use the [define-properties][define-properties-url] module to trivially define non-enumerable properties, where supported.
 - Please use the [function-bind][function-bind-url] module to cache references to all builtin methods, to be robust against later modification of the environment.


## How to denote compliance
Prominently in the package’s README, please include the following markdown:
```md
This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](http://www.ecma-international.org/ecma-262/6.0/).
```
Please modify “ES3” as needed to the level of support, and please update the spec link so it points directly to the most relevant section of the spec it complies with.

## Binary
Very simple and shallow tests that a package follows the `es-shim API`.

Pass `--bound` to indicate that the function the package is implementing depends on having a receiver (a “this” value).

## Example

```sh
es-shim-api object-assign
es-shim-api array-includes --bound
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/@es-shims/api
[2]: http://versionbadg.es/es-shims/api.svg
[3]: https://travis-ci.org/es-shims/es-shim-api.svg
[4]: https://travis-ci.org/es-shims/es-shim-api
[5]: https://david-dm.org/es-shims/es-shim-api.svg
[6]: https://david-dm.org/es-shims/es-shim-api
[7]: https://david-dm.org/es-shims/es-shim-api/dev-status.svg
[8]: https://david-dm.org/es-shims/es-shim-api#info=devDependencies
[11]: https://nodei.co/npm/@es-shims/api.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/@es-shims/api.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/@es-shims/api.svg
[downloads-url]: http://npm-stat.com/charts.html?package=@es-shims/api
[es-abstract-url]: https://npmjs.com/package/es-abstract
[define-properties-url]: https://npmjs.com/package/define-properties
[function-bind-url]: https://npmjs.com/package/function-bind
