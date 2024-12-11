# es-shim API <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

## API Contract
For any given “es-shim API v3”-compliant package `foo`, the following invariants must hold:
 - This package will run in an environment supporting the oldest JS version in which the spec’s semantics are achievable - ES3, ES5, and/or ES6. The package should indicate its minimum level of required environment support in its README.
 - The package must attempt to support `node`/`io.js`, all versions of all ES3-compliant browsers or later, Web Workers, and `node-webkit`. Other environments are a plus, but not expected.
 - `require('foo')` is a spec-compliant JS or native function. However, if the function’s behavior depends on a receiver (a “this” value), then the first argument to this function will be used as that receiver. The package should indicate if this is the case in its README.
  - In the case of static methods like `Promise.all` that depend on their receiver without a fallback, the index must ensure that receiverless invocation acts as if the static method was called on its original object, but must also allow `.call`/`.bind`/`.apply` to alter the receiver when relevant.
 - `require('foo/implementation')` is a spec-compliant JS function, that will depend on a receiver (a “this” value) as the spec requires.
 - `require('foo/polyfill')` is a function that when invoked, will return the most compliant and performant function that it can - if a native version is available, and does not violate the spec, then the native function will be returned - otherwise, either the `implementation`, or a custom, wrapped version of the native function, will be returned. This is also the result that will be used as the default export.
 - `require('foo/shim')` is a function that when invoked, will call `getPolyfill`, and if the polyfill doesn’t match the built-in value, will install it into the global environment.
 - `require('foo/auto')` will automatically invoke the `shim` method.
 - The only place the package may modify the environment is within its `shim` method.
 - Naturally, `npm test` must run the package’s tests.
 - In every way possible, the package must attempt to make itself robust against the environment being modified *after* it is `require`d.
  - For example, `require('foo'); delete Function.prototype.call;` must not alter the behavior of `foo`.
  - The most useful technique for this is shown in this example: `var callBound = require('call-bound'); var slice = callBound('Array.prototype.slice'); slice([1], 1);` — this technique works in ES3 environments, and will ensure that modifying `Array.prototype` or `Function.prototype` will not interfere with the package.

## Multi-shim Packages
If your package contains multiple shims, you can pass `--multi` to apply these invariants:
 - The package's main export must be an array of directory names, with no additional properties.
 - The entry points and respective invariants listed above apply to the subdirectories listed in the main export
 - The root must contain `shim` and `auto` entrypoints that match the same invariants described above. The `shim` entry point must invoke the `shim` entry point in each of the subdirectories listed in the main export
 - The root must NOT contain an `implementation` entry point.

## Recommended dependencies
 - Please use the [es-abstract][es-abstract-url] package to ensure spec-compliant behavior via the spec’s internal abstract operations.
 - Please use the [define-properties][define-properties-url] package to trivially define non-enumerable properties, where supported.
 - Please use the [call-bind][call-bind-url] package to cache references to all builtin methods, to be robust against later modification of the environment.


## How to denote compliance
Prominently in the package’s README, please include the following markdown:
```md
This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](https://www.ecma-international.org/ecma-262/6.0/).
```
Please modify “ES3” as needed to the level of support, and please update the spec link so it points directly to the most relevant section of the spec it complies with.

## Binary
Very simple and shallow tests that a package follows the `es-shim API`.

Pass `--bound` to indicate that the function the package is implementing depends on having a receiver (a “this” value). In particular, this applies to something that is a prototype method, or a static method that depends on its receiver.

## Example

```sh
es-shim-api object-assign
es-shim-api array-includes --bound
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/@es-shims/api
[npm-version-svg]: https://versionbadg.es/es-shims/es-shim-api.svg
[deps-svg]: https://david-dm.org/es-shims/es-shim-api.svg
[deps-url]: https://david-dm.org/es-shims/es-shim-api
[dev-deps-svg]: https://david-dm.org/es-shims/es-shim-api/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/es-shim-api#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/@es-shims/api.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/@es-shims/api.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@es-shims/api.svg
[downloads-url]: https://npm-stat.com/charts.html?package=@es-shims/api
[codecov-image]: https://codecov.io/gh/es-shims/es-shim-api/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/es-shim-api/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/es-shim-api
[actions-url]: https://github.com/es-shims/es-shim-api/actions
[es-abstract-url]: https://npmjs.com/package/es-abstract
[define-properties-url]: https://npmjs.com/package/define-properties
[call-bind-url]: https://npmjs.com/package/call-bind
