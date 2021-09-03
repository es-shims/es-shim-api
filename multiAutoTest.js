#!/usr/bin/env node

'use strict';

var assert = require('assert');
var path = require('path');

var args = process.argv.slice(2); // remove node, and script name

assert.equal(args, 0, 'wrong number of arguments; expected 0');

var fakeShim = require('./fakeShim');
assert.equal(fakeShim.calls.length, 0, 'shims are not yet called');

var subPackages = require(process.cwd());
subPackages.forEach(function (subPackage) {
	require.cache[require.resolve(path.join(process.cwd(), subPackage, 'shim'))] = require.cache[require.resolve('./fakeShim')];
});

var autoPath = path.join(process.cwd(), './auto');

console.log('## Requiring root ' + autoPath + '...');

require(autoPath);

subPackages.forEach(function (subPackage) {
	require(path.join(process.cwd(), subPackage, 'auto'));
});

console.log('## shims were called ' + fakeShim.calls.length + ' times');

assert.equal(fakeShim.calls.length, subPackages.length * 2, 'shim was called twice per sub-package');
var expectedCalls = subPackages.map(function () {
	return [undefined, []];
});
assert.deepEqual(fakeShim.calls, expectedCalls.concat(expectedCalls), 'all shims were invoked with no receiver or arguments');

console.log('## all shims were invoked with no receiver or arguments');
