#!/usr/bin/env node

'use strict';

const assert = require('assert');
const path = require('path');

const args = process.argv.slice(2); // remove node, and script name

assert.equal(args, 0, 'wrong number of arguments; expected 0');

const fakeShim = require('./fakeShim');
assert.equal(fakeShim.calls.length, 0, 'shims are not yet called');

/** @type {string[]} */
const subPackages = require(process.cwd());
subPackages.forEach((subPackage) => {
	require.cache[require.resolve(path.join(process.cwd(), subPackage, 'shim'))] = require.cache[require.resolve('./fakeShim')];
});

const autoPath = path.join(process.cwd(), './auto');

console.log(`## Requiring root ${autoPath}...`);

require(autoPath);

subPackages.forEach((subPackage) => {
	require(path.join(process.cwd(), subPackage, 'auto'));
});

console.log(`## shims were called ${fakeShim.calls.length} times`);

assert.equal(fakeShim.calls.length, subPackages.length * 2, 'shim was called twice per sub-package');
const expectedCalls = subPackages.map(() => [undefined, []]);
assert.deepEqual(fakeShim.calls, expectedCalls.concat(expectedCalls), 'all shims were invoked with no receiver or arguments');

console.log('## all shims were invoked with no receiver or arguments');
